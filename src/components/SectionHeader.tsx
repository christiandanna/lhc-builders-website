import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  /** Supporting copy, placed in the right column on wide screens. */
  lede?: ReactNode;
  /** Buttons or links shown beneath the supporting copy. */
  action?: ReactNode;
  /** The heading element id, for aria-labelledby on the parent section. */
  id?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
  id,
}: SectionHeaderProps) {
  const split = Boolean(lede || action);

  return (
    <Reveal className={styles.header} data-split={split}>
      <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
      <h2 id={id} className={`display ${styles.title}`}>
        {title}
      </h2>
      {split && (
        <div className={styles.aside}>
          {lede && <p className="lede">{lede}</p>}
          {action}
        </div>
      )}
    </Reveal>
  );
}
