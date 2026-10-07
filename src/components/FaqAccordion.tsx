"use client";

import { useId, useState } from "react";
import { Plus } from "@/components/Icons";
import type { FaqItem } from "@/data/content";
import styles from "./FaqAccordion.module.css";

/** Splits "answer text [CONFIRM SOMETHING]" into prose plus any pending note. */
function splitAnswer(answer: string) {
  const match = answer.match(/\[([^\]]+)\]\s*$/);
  if (!match) return { text: answer, pending: undefined };
  return {
    text: answer.slice(0, match.index).trim(),
    pending: `[${match[1]}]`,
  };
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  // The first question starts open so the pattern is obvious at a glance.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const { text, pending } = splitAnswer(item.answer);

        return (
          <div key={item.question} className={styles.item}>
            <h3>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.question}
                <span className={styles.icon} aria-hidden="true">
                  <Plus />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              data-open={isOpen}
            >
              <div className={styles.panelInner}>
                <div className={styles.answer}>
                  <p>{text}</p>
                  {pending && (
                    <span className={`placeholder-tag ${styles.pending}`}>
                      {pending}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
