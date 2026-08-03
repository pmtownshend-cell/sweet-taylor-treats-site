const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfPbAdl9X09aKemTa438KGnG8Z2tkrf3oE1CTZ1zXqBnzk-EQ/formResponse";

const ENTRY_IDS = {
  name: "entry.2104090018",
  email: "entry.1759544863",
  phone: "entry.1353105598",
  eventType: "entry.1382226890",
  eventDate: "entry.204675777",
  quantity: "entry.1277051271",
  fulfillment: "entry.368809433",
  details: "entry.473005184",
  inspiration: "entry.1741758196",
} as const;

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

/**
 * Submits the quote request straight to Google Forms from the browser.
 * Uses mode: "no-cors" — the response is opaque, so success is optimistic.
 */
export async function submitQuote(input: QuoteInput): Promise<void> {
  const body = new URLSearchParams();
  for (const [key, entryId] of Object.entries(ENTRY_IDS)) {
    body.append(entryId, (input[key as keyof QuoteInput] ?? "").toString());
  }

  await fetch(FORM_ACTION, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
}
