import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const skills = [
  { id: "html", label: "HTML", row: 1, col: 1 },
  { id: "css", label: "CSS", row: 1, col: 2 },
  { id: "scss", label: "SCSS", row: 1, col: 3 },
  { id: "tailwind", label: "Tailwind", row: 1, col: 4 },
  { id: "js", label: "JavaScript", row: 2, col: 2.5 },
  { id: "typescript", label: "TypeScript", row: 3, col: 2.5 },
  { id: "reactjs", label: "ReactJS", row: 4, col: 2.5 },
  { id: "materialui", label: "Material UI", row: 5, col: 1 },
  { id: "antd", label: "AntD", row: 5, col: 2.5 },
  { id: "showerhead", label: "shadcn", row: 5, col: 4 },
  { id: "nextjs", label: "Next.js", row: 5, col: 5.5 },
  { id: "nodejs", label: "Node.js", row: 6, col: 2.5 },
  { id: "passportjs", label: "Passport.js", row: 7, col: 1 },
  { id: "mongodb", label: "MongoDB", row: 7, col: 2.5 },
  { id: "postgresql", label: "PostgreSQL", row: 7, col: 4 },
  { id: "git", label: "Git", row: 8, col: 2 },
  { id: "github", label: "GitHub", row: 8, col: 3 },
  { id: "jira", label: "Jira", row: 9, col: 1 },
  { id: "bitbucket", label: "Bitbucket", row: 9, col: 2.5 },
  { id: "lazygit", label: "LazyGit", row: 9, col: 4 },
];

const connections = [
  ["html", "js"],
  ["css", "js"],
  ["scss", "js"],
  ["tailwind", "js"],
  ["js", "typescript"],
  ["typescript", "reactjs"],
  ["reactjs", "materialui"],
  ["reactjs", "antd"],
  ["reactjs", "showerhead"],
  ["reactjs", "nextjs"],
  ["nextjs", "nodejs"],
  ["nodejs", "passportjs"],
  ["nodejs", "mongodb"],
  ["nodejs", "postgresql"],
  ["git", "github"],
  ["github", "bitbucket"],
  ["github", "jira"],
  ["git", "lazygit"],
];

const colors = [
  "#00f5d4",
  "#0ff",
  "#0f0",
  "#39f",
  "#f0f",
  "#ff0",
  "#f55",
  "#5f5",
];
const getRandomColor = (() => {
  let i = 0;
  return () => colors[i++ % colors.length];
})();

export default function SkillTreeChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{
    [id: string]: { top: number; left: number };
  }>({});
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const rowCount = Math.max(...skills.map((s) => s.row)) + 1;
    const colCount = Math.max(...skills.map((s) => s.col)) + 1;

    const rowHeight = Math.max(containerHeight / rowCount, 100);
    const colWidth = Math.max(containerWidth / colCount, 120);

    const newPositions: typeof positions = {};
    let maxLeft = 0;
    let maxTop = 0;

    skills.forEach((skill) => {
      const top = skill.row * rowHeight;
      const left = skill.col * colWidth;
      newPositions[skill.id] = { top, left };
      if (left > maxLeft) maxLeft = left;
      if (top > maxTop) maxTop = top;
    });

    setPositions(newPositions);

    // Add extra margins for skill nodes sizes to avoid cutting edges
    setContentSize({
      width: maxLeft + colWidth,
      height: maxTop + rowHeight,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(
        (handleResize as (() => void) & { t?: ReturnType<typeof setTimeout> }).t
      );
      (handleResize as (() => void) & { t?: ReturnType<typeof setTimeout> }).t =
        setTimeout(() => updatePositions(), 100);
    };
    updatePositions();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePositions]);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !containerRef.current) return;

    const getCenter = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const parent = containerRef.current!.getBoundingClientRect();
      return {
        x: rect.left - parent.left + rect.width / 2,
        y: rect.top - parent.top + rect.height / 2,
      };
    };

    const lines: {
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }[] = [];
    connections.forEach(([fromId, toId]) => {
      const from = getCenter(fromId);
      const to = getCenter(toId);
      const color = getRandomColor();
      lines.push({
        id: `${fromId}-${toId}`,
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
        color,
      });

      const fromEl = document.getElementById(fromId) as HTMLElement;
      const toEl = document.getElementById(toId) as HTMLElement;
      if (fromEl && toEl) {
        fromEl.style.border = `2px solid ${color}`;
        toEl.style.border = `2px solid ${color}`;
        fromEl.style.boxShadow = `0 0 10px ${color}`;
        toEl.style.boxShadow = `0 0 10px ${color}`;
      }
    });

    svg.innerHTML = "";

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    lines.forEach(({ color }, idx) => {
      const gradId = `pulse-grad-${idx}`;
      const gradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      gradient.setAttribute("id", gradId);
      gradient.setAttribute("x1", "0%");
      gradient.setAttribute("y1", "0%");
      gradient.setAttribute("x2", "100%");
      gradient.setAttribute("y2", "0%");

      const stops = [
        { offset: "0%", color: "transparent" },
        { offset: "40%", color },
        { offset: "60%", color },
        { offset: "100%", color: "transparent" },
      ];

      stops.forEach(({ offset, color }) => {
        const stop = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop.setAttribute("offset", offset);
        stop.setAttribute("stop-color", color);
        gradient.appendChild(stop);
      });

      defs.appendChild(gradient);
    });
    svg.appendChild(defs);

    lines.forEach(({ x1, y1, x2, y2, color }, idx) => {
      const length = Math.hypot(x2 - x1, y2 - y1);

      const base = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      base.setAttribute("x1", `${x1}`);
      base.setAttribute("y1", `${y1}`);
      base.setAttribute("x2", `${x2}`);
      base.setAttribute("y2", `${y2}`);
      base.setAttribute("stroke", color);
      base.setAttribute("stroke-width", "6");
      base.setAttribute("stroke-linecap", "round");
      base.setAttribute("opacity", "0.2");
      svg.appendChild(base);

      const pulse = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      pulse.setAttribute("x1", `${x1}`);
      pulse.setAttribute("y1", `${y1}`);
      pulse.setAttribute("x2", `${x2}`);
      pulse.setAttribute("y2", `${y2}`);
      pulse.setAttribute("stroke", `url(#pulse-grad-${idx})`);
      pulse.setAttribute("stroke-width", "6");
      pulse.setAttribute("stroke-linecap", "round");
      pulse.setAttribute("stroke-dasharray", `${length}`);
      pulse.setAttribute("stroke-dashoffset", `${length}`);
      pulse.style.animation = "pulseFlow 2s linear infinite";
      svg.appendChild(pulse);
    });
  }, [positions]);

  return (
    <>
      <style>{`
        @keyframes pulseFlow {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <div
        ref={containerRef}
        className="relative w-full min-h-screen overflow-auto hides_scroll"
        style={{ height: "100vh" }}
      >
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 pointer-events-none z-0"
          width={contentSize.width}
          height={contentSize.height}
        />
        <div
          className="relative z-10"
          style={{
            height: contentSize.height,
          }}
        >
          {skills.map((skill) => (
            <div
              key={skill.id}
              id={skill.id}
              className="absolute p-3 text-white font-bold bg-main-backdrop text-center text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap"
              style={{
                top: positions[skill.id]?.top || 0,
                left: positions[skill.id]?.left || 0,
                transform: "translate(-50%, -50%)",
              }}
            >
              {skill.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
