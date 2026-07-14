import { createServerFn } from "@tanstack/react-start";

const SPREADSHEET_ID = "1_ItpM2S3KBhbRX8TXILnS13ZbhfPgvUpokdXhff19ms";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets";

export type QuoteInput = {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate: string;
  quantity: string;
  fulfillment: string;
  details: string;
  inspiration?: string;
};

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((data: QuoteInput): QuoteInput => {
    if (!data || typeof data !== "object") throw new Error("Invalid input");
    const req = ["name", "email", "eventType", "eventDate", "quantity", "fulfillment", "details"] as const;
    for (const k of req) {
      if (!data[k] || typeof data[k] !== "string") throw new Error(`Missing field: ${k}`);
    }
    if (data.name.length > 100 || data.details.length > 2000) throw new Error("Field too long");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error("Invalid email");
    return data;
  })
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !connKey) throw new Error("Sheets connection is not configured");

    const row = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.phone ?? "",
      data.eventType,
      data.eventDate,
      data.quantity,
      data.fulfillment,
      data.details,
      data.inspiration ?? "",
    ];

    const url = `${GATEWAY_URL}/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:J1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Sheets append failed [${res.status}]: ${body}`);
      throw new Error(`Failed to save quote [${res.status}]`);
    }
    return { ok: true };
  });
