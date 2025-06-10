import React, { useEffect, useRef } from "react";

export default function CollageMarkdown() {
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
          * I have 3 years of experience in web <br />
          * development, out of which <br />
          * 2 years I worked as a frontend developer at Digilate <br />
          * where I completed a 3-month internship, <br />
          * followed by 2 years as a frontend developer. <br />
          * I can honestly say <br />
          * that I'm good at customizing things <br />
          * and building stuff that’s hard to find online. <br />
          * <br />
          * I’ve worked on various websites <br />
          * and added my own touch to each of them. <br />
          * I'm always learning new ways <br />
          * to improve structure and harmony. <br />
          */
        </h2>
      </div>
    </div>
  );
}
