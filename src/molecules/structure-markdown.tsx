import React, { useEffect, useRef } from "react";

export default function StructureMarkdown() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function syncHeight() {
      if (rightRef.current && leftRef.current) {
        const rightHeight = rightRef.current.offsetHeight;
        leftRef.current.style.height = rightHeight + "px";
        leftRef.current.style.overflow = "hidden";
      }
    }

    syncHeight();

    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);
  return (
    <div className="flex items-stretch">
      <div className="pr-10" ref={leftRef}>
        <h3 className="w-6 text-end text-lg text-foreground">
          {new Array(100).fill(1).map((_, index) => (
            <React.Fragment key={index}>
              {index + 1} <br />
            </React.Fragment>
          ))}
        </h3>
      </div>
      <div>
        <h2 className="text-lg text-foreground" ref={rightRef}>
          /** <br />
          * About me <br />
          * I completed 4 years of college education <br />
          * at Yerevan State College of Informatics, <br />
          * where I built a solid foundation <br />
          * in computer science and software development. <br />
          * <br />
          * Currently, I'm continuing my academic journey <br />
          * at the National University of Architecture and Construction of
          Armenia, <br />
          * where I’m studying management in programming-related fields. <br />
          * I’m in my 3rd year of a 5-year program. <br />
          * <br />
          * These years of learning have helped me understand <br />
          * not just how to code, but how to manage projects, <br />
          * structure teams, and think strategically in tech. <br />
          * <br />
          * My goal is to combine technical knowledge <br />
          * with leadership and planning skills, <br />
          * so I can contribute to creating systems <br />
          * that are both functional and sustainable. <br />
          * <br />
          * I’m passionate about bridging the gap <br />
          * between development and management, <br />
          * and I’m always seeking opportunities <br />
          * to apply both technical and organizational thinking <br />
          * to real-world problems. <br />
          */
        </h2>
      </div>
    </div>
  );
}
