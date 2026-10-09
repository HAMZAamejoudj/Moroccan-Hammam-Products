"use client";

import { useActionState } from "react";
import { submitContact, ContactFormState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { PlaceholderText } from "@/components/ui/PlaceholderText";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/config";
import { getContactUi } from "@/lib/i18n/messages";

const initial: ContactFormState = { ok: false, message: "" };

export function QuoteForm({
  locale,
  whatsappHref,
}: {
  locale: Locale;
  whatsappHref: string;
}) {
  const ui = getContactUi(locale);
  const [state, action, pending] = useActionState(submitContact, initial);

  const productOptions = [
    { value: "black soap", label: ui.productBlackSoap },
    { value: "ghassoul clay", label: ui.productGhassoul },
    { value: "kessa gloves", label: ui.productKessa },
    { value: "argan oil", label: ui.productArgan },
    { value: "prickly pear oil", label: ui.productPricklyPear },
    { value: "rose water", label: ui.productRoseWater },
    { value: "kits", label: ui.productKits },
    { value: "other", label: ui.productOther },
  ];

  if (state.ok) {
    return (
      <div className="rounded-lg border border-primary/30 bg-surface/80 p-8 text-center">
        <p className="text-lg text-ink">
          <PlaceholderText text={state.message} />
        </p>
        <div className="mt-6">
          <Button href={whatsappHref} external>
            {ui.whatsAppUs}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="space-y-5 rounded-lg border border-gold/15 bg-white p-6 shadow-sm ring-1 ring-ink/5 md:p-8"
    >
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={ui.name} name="name" required error={state.fieldErrors?.name} />
        <Field label={ui.company} name="company" />
        <Field
          label={ui.country}
          name="country"
          required
          error={state.fieldErrors?.country}
        />
        <Field
          label={ui.emailField}
          name="email"
          type="email"
          required
          error={state.fieldErrors?.email}
        />
        <Field label={ui.whatsAppField} name="whatsapp" className="md:col-span-2" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="buyerType" className="text-sm font-medium text-ink">
            {ui.iAmA}
          </label>
          <select
            id="buyerType"
            name="buyerType"
            required
            className="mt-1 w-full rounded-md border border-gold/30 bg-white px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              {ui.selectPlaceholder}
            </option>
            <option value="Spa or hammam">{ui.buyerSpa}</option>
            <option value="Retailer">{ui.buyerRetailer}</option>
            <option value="Beauty brand">{ui.buyerBrand}</option>
            <option value="Distributor">{ui.buyerDistributor}</option>
            <option value="Other">{ui.buyerOther}</option>
          </select>
        </div>
        <div>
          <label htmlFor="needType" className="text-sm font-medium text-ink">
            {ui.iNeed}
          </label>
          <select
            id="needType"
            name="needType"
            required
            className="mt-1 w-full rounded-md border border-gold/30 bg-white px-3 py-2 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              {ui.selectPlaceholder}
            </option>
            <option value="Bulk">{ui.needBulk}</option>
            <option value="Private label">{ui.needPrivateLabel}</option>
            <option value="Samples">{ui.needSamples}</option>
          </select>
        </div>
      </div>
      <fieldset>
        <legend className="text-sm font-medium text-ink">{ui.products}</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          {productOptions.map((p) => (
            <label key={p.value} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="products"
                value={p.value}
                className="rounded border-gold/40"
              />
              {p.label}
            </label>
          ))}
        </div>
        {state.fieldErrors?.products ? (
          <p className="mt-1 text-sm text-accent">{state.fieldErrors.products[0]}</p>
        ) : null}
      </fieldset>
      <Field label={ui.quantity} name="quantity" />
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          {ui.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-md border border-gold/30 bg-white px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "w-full rounded-md bg-primary px-5 py-3 text-sm font-medium text-cream",
          pending && "opacity-70",
        )}
      >
        {pending ? ui.submitting : ui.submit}
      </button>
      <p className="text-xs text-ink/70">{ui.privacyNote}</p>
      {!state.ok && state.message ? (
        <p className="text-sm text-accent" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-md border border-gold/30 bg-white px-3 py-2 text-sm"
      />
      {error ? <p className="mt-1 text-sm text-accent">{error[0]}</p> : null}
    </div>
  );
}
