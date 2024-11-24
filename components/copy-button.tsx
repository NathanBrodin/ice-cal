"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { CopyIcon } from "./ui/copy";
import { AnimatedState } from "./ui/animate-state";

export default function CopyButton({ content }: { content?: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopied() {
    if (content) {
      navigator.clipboard.writeText(content);
    }
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  return (
    <Button type="button" className="bg-[#b3b1de]" onClick={handleCopied}>
      <AnimatedState>
        {copied ? (
          "Copied!"
        ) : (
          <>
            <span className="hidden sm:flex">Copy</span> <CopyIcon />
          </>
        )}
      </AnimatedState>
    </Button>
  );
}
