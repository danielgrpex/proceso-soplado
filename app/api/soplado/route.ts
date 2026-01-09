import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SPREADSHEET_ID = process.env.SHEET_PROGRAMACION_SOPLADO_ID;
const SHEET_NAME = "Soplado";

/* ================= utils ================= */

function mustEnv(v: string | undefined, name: string) {
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

function norm(v: any) {
  return String(v ?? "").trim();
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

async function readSheet(sheets: any) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:ZZ`,
  });

  const values: any[][] = res.data.values || [];
  if (!values.length) return [];

  const headers = values[0].map((h) => norm(h));
  const rows = values.slice(1);

  return rows.map((r) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      obj[h] = r[i] ?? "";
    });
    return obj;
  });
}

/* ================= API ================= */

export async function GET() {
  try {
    mustEnv(SPREADSHEET_ID, "SHEET_PROGRAMACION_SOPLADO_ID");

    const sheets = await getSheets();
    const rows = await readSheet(sheets);

    return NextResponse.json({
      success: true,
      count: rows.length,
      items: rows,
    });
  } catch (err: any) {
    console.error("[soplado]", err);
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Error leyendo programación de soplado",
      },
      { status: 500 }
    );
  }
}
