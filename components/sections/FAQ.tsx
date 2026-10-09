"use client";

import { useId, useState } from "react";
import { FaqItem, unwrapBracketPlaceholders } from "@/lib/parse";
import { cn } from "@/lib/cn";

export function FAQ({ items, title = "Frequently asked questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="bg-white py-10 md:py-12" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-0">
        <h2 id="faq-heading" className="font-serif text-3xl text-ink md:text-4xl">
          {title}
        </h2>
        <dl className="mt-10 divide-y divide-gold/15">
          {items.map((item) => (
            <FaqRow key={item.question} item={item} />
          ))}
        </dl>
      </div>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const answer = unwrapBracketPlaceholders(item.answer);

  return (
    <div className="py-5">
      <dt>
        <button
          type="button"
          className="flex w-full items-start justify-between gap-4 text-left text-base font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="pr-2">{item.question}</span>
          <span
            className={cn(
              "mt-0.5 shrink-0 text-gold transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </dt>
      <dd
        id={panelId}
        hidden={!open}
        className="mt-3 pr-8 text-sm leading-relaxed text-ink/85 md:text-base"
      >
        {answer}
      </dd>
    </div>
  );
}
