"use server";

import { z } from "zod";
import { Resend } from "resend";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import { getContactUi } from "@/lib/i18n/messages";

export type ContactFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

function contactSchema(locale: Locale) {
  const ui = getContactUi(locale);
  return z.object({
    name: z.string().min(1, ui.errorNameRequired),
    company: z.string().optional(),
    country: z.string().min(1, ui.errorCountryRequired),
    email: z.string().email(ui.errorEmailRequired),
    whatsapp: z.string().optional(),
    buyerType: z.string().min(1),
    needType: z.string().min(1),
    products: z.array(z.string()).min(1, ui.errorProductsRequired),
    quantity: z.string().optional(),
    message: z.string().optional(),
  });
}

function localeFromForm(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "");
  return isLocale(raw) ? raw : defaultLocale;
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const locale = localeFromForm(formData);
  const ui = getContactUi(locale);
  const schema = contactSchema(locale);

  const products = formData.getAll("products").map(String);
  const parsed = schema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    country: formData.get("country"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
    buyerType: formData.get("buyerType"),
    needType: formData.get("needType"),
    products,
    quantity: formData.get("quantity"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: ui.fixErrors,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  const body = [
    `Name: ${data.name}`,
    `Company: ${data.company || "—"}`,
    `Country: ${data.country}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp || "—"}`,
    `Buyer type: ${data.buyerType}`,
    `Need: ${data.needType}`,
    `Products: ${data.products.join(", ")}`,
    `Quantity: ${data.quantity || "—"}`,
    `Locale: ${locale}`,
    "",
    data.message || "",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Moroccan Hammam Products <onboarding@resend.dev>",
      to: [to],
      replyTo: data.email,
      subject: `Quote request from ${data.name} (${data.country})`,
      text: body,
    });
  } else {
    console.info("[contact form — RESEND not configured]", body);
  }

  return {
    ok: true,
    message: ui.successMessage,
  };
}
