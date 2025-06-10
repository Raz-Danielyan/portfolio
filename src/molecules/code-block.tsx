import { cn } from "@/lib/utils";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import { useEffect } from "react";

// Optional: Add more languages if needed
// import "prismjs/components/prism-python";

type CodeBlockProps = {
  code: string;
  language?: "tsx" | "jsx" | "js" | "ts" | string;
  className?: string;
};

export function CodeBlock({
  code,
  language = "tsx",
  className,
}: CodeBlockProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre
      className={cn(
        "rounded-lg bg-[#2d2d2d] p-4 overflow-x-auto text-sm text-white",
        className
      )}
    >
      <code className={`language-${language}`}>{code.trim()}</code>
    </pre>
  );
}
