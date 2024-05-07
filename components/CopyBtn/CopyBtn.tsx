"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <button className="copy" disabled={isCopied} onClick={copy}>
      {isCopied ? <CopyCheck size={16} /> : <Copy size={16} />}
    </button>
  );
};
