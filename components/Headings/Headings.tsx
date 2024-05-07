import { ReactNode } from "react";
import { Hash, HashIcon } from "lucide-react";
import Link from "next/link";

interface HeadingProps {
  id?: string | undefined;
  children?: any;
}

export function H1({ id, children }: HeadingProps) {
  return (
    <h1 id={id} style={{ position: "relative" }} className="heading">
      {children}
      {children && (
        <div className="hash-link">
          <a href={`#${id}`} aria-label={children} title={children}>
            <Hash size={18} />
          </a>
        </div>
      )}
    </h1>
  );
}

export function H2({ id, children }: HeadingProps) {
  return (
    <h2 id={id} style={{ position: "relative" }} className="heading">
      {children}
      {children && (
        <a
          href={`#${id}`}
          className="hash-link"
          aria-label={children}
          title={children}
        >
          <Hash size={18} />
        </a>
      )}
    </h2>
  );
}

export function H3({ id, children }: HeadingProps) {
  return (
    <h3 id={id} style={{ position: "relative" }} className="heading">
      {children}
      {children && (
        <a
          href={`#${id}`}
          className="hash-link"
          aria-label={children}
          title={children}
        >
          <Hash size={18} />
        </a>
      )}
    </h3>
  );
}

export function H4({ id, children }: HeadingProps) {
  return (
    <h4 id={id} style={{ position: "relative" }} className="heading">
      {children}
      {children && (
        <a
          href={`#${id}`}
          className="hash-link"
          aria-label={children}
          title={children}
        >
          <Hash size={18} />
        </a>
      )}
    </h4>
  );
}
