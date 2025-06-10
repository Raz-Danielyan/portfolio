import MarkDownSvg from "@/assets/markdown.svg";
import type { pages } from "@/pages/about";

interface MenuItemProps {
  setActivePath: React.Dispatch<React.SetStateAction<pages | null>>;
  setActiveTabs: React.Dispatch<React.SetStateAction<Array<pages | null>>>;
  activePath: pages | null;
  title: pages;
}

export default function MenuItem({
  setActivePath,
  setActiveTabs,
  activePath,
  title,
}: MenuItemProps) {
  return (
    <div
      className={`flex items-center`}
      onClick={() => {
        setActivePath(title);
        setActiveTabs((prev) =>
          prev.includes(title) ? prev : prev.concat(title)
        );
      }}
    >
      <div
        className={activePath === title ? "text-slate-50" : "text-foreground"}
      >
        <MarkDownSvg />
      </div>
      <h1
        className={`ml-1 text-base ${
          activePath === title ? "text-slate-50" : "text-foreground"
        }`}
      >
        {title}
      </h1>
    </div>
  );
}
