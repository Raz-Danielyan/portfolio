import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function ScrollableContent({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const updateThumb = () => {
    const container = containerRef.current;
    const thumb = thumbRef.current;
    if (!container || !thumb) return;

    const containerHeight = container.clientHeight;
    const contentHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;

    if (contentHeight <= containerHeight) {
      thumb.style.height = "6px";
      thumb.style.top = "12px";
    } else {
      const thumbHeight = (containerHeight / contentHeight) * containerHeight;
      let thumbTop = (scrollTop / contentHeight) * containerHeight - 12;
      if (thumbTop < 12) {
        thumbTop = 12;
      }
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${thumbTop}px`;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);
    updateThumb();

    return () => {
      container.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
    };
  }, []);

  return (
    <div className={cn("editor", className)} ref={containerRef}>
      <div className="xl:px-10 px-5 py-3 w-[-webkit-fill-available]">
        {children}
      </div>
      {!isMobile && (
        <div className="scrollbar-track">
          <div className="scrollbar-container">
            <div className="scrollbar-thumb" ref={thumbRef}></div>
          </div>
        </div>
      )}
    </div>
  );
}
