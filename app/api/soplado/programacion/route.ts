import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function mustEnv(v: string | undefined, name: string) {
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

async function getSheets() {
  const email = mustEnv(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, "GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const key = mustEnv(process.env.GOOGLE_PRIVATE_KEY, "GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client as any });
}

function rowsToObjects(values: any[][]) {
  if (!values?.length) return [];
  const headers = (values[0] ?? []).map((h) => String(h ?? "").trim());
  return values.slice(1).map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => (obj[h] = row?.[i] ?? ""));
    return obj;
  });
}

export async function GET() {
  try {
    const spreadsheetId = mustEnv(process.env.SHEET_ID, "SHEET_ID");
    const sheets = await getSheets();

    // ✅ AJUSTA AQUÍ el nombre de tu hoja y rango
    const range = "Soplado!A:Z";

    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    const values: any[][] = res.data.values || [];

    const data = rowsToObjects(values);

    const response = NextResponse.json({ success: true, count: data.length, items: data });

    // ✅ Anti-cache fuerte
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
  } catch (e: any) {
    console.error("[GET soplado programacion]", e);
    const response = NextResponse.json(
      { success: false, message: e?.message || "Error leyendo programación" },
      { status: 500 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
}
