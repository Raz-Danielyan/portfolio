import notFoundImage from "@/assets/images/404.png";
import { CodeBlock } from "@/molecules/code-block";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    <>
      <div className="board"></div>
      <div className="h-full w-full px-5 flex items-center md:justify-center justify-start">
        <div className="flex lg:flex-row flex-col md:items-center items-start ">
          <img
            src={notFoundImage}
            alt="404"
            className="lg:mr-30 ml:mb-0 mb-5 mt-5"
          />
          <div
            className="flex items-stretch cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="pr-7" ref={leftRef}>
              <h3 className="w-6 text-end text-sm text-foreground">
                {new Array(100).fill(1).map((_, index) => (
                  <React.Fragment key={index}>
                    {index + 1} <br />
                  </React.Fragment>
                ))}
              </h3>
            </div>
            <div>
              <h2 ref={rightRef}>
                <div className="md:block hidden">
                  <CodeBlock
                    language="js"
                    className="bg-transparent! text-sm! py-0! mt-0!"
                    code={`const page = findPage('you-were-looking-for');

if (!page) {
  console.log("Oops! Looks like you took a wrong turn in the codebase.");
  console.log("But hey, since you're here...");
  console.log("🔍 Go back to the homepage and explore more cool stuff!");
  throw new Error("404: PageNotFoundError 😢");
}


/* Suggestions:
 * - Check the URL for typos
 * - Use the site navigation
 * - Or hit CMD+Z in real life 😅
 */

redirect('home');`}
                  />
                </div>
                <div>
                  <CodeBlock
                    language="js"
                    className="bg-transparent! text-sm! py-0! mt-0!"
                    code={`throw new Error(
"404: PageNotFoundError 😢"
);

goBack() || goHome();`}
                  />
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
