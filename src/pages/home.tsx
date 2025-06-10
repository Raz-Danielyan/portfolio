import backgroundBlur from "@/assets/images/background-blurs.png";
import codeSnippet from "@/assets/images/code-snippet.png";

export default function Home() {
  return (
    <div className="w-full flex items-center justify-center overflow-hidden flex-1 p-5 relative">
      <div className="xl:mr-36 mr-15 xl:w-full lg:w-[60%] md:w-full md:flex md:justify-center z-1">
        <div>
          <h3 className="text-lg text-foreground mb-1">Hi all. I am</h3>
          <h1 className="text-heading-foreground xl:text-6xl mb-2 text-4xl">
            Razmik Danielyan
          </h1>
          <h2 className="xl:text-3xl text-indigo-500 xl:mb-16 text-2xl mb-8">
            {">"} Front-end developer
          </h2>
          <p className="text-foreground mb-2 xl:text-md text-sm">
            // complete the game to continue
          </p>
          <p className="text-foreground mb-2 xl:text-md text-sm">
            // find my profile on Github:{" "}
          </p>
          <a
            href="https://github.com/Raz-Danielyan"
            target="_blank"
            rel="noopener noreferrer"
            className="xl:text-md text-sm"
          >
            <span className="text-indigo-500">const</span>{" "}
            <span className="text-teal-400">githubLink</span>{" "}
            <span className="text-heading-foreground"> = </span>{" "}
            <span className="text-link-foreground underline">
              “https://github.com/Raz-Danielyan”
            </span>
          </a>
        </div>
      </div>
      <div
        className="game-container xl:w-full lg:w-[40%] z-0 sm:opacity-40  md:opacity-100
      md:block md:relative
      absolute inset-0 flex items-center justify-center"
      >
        <div className="sm:grid gap-4 hidden">
          <img src={codeSnippet} alt="code-snippet" className="opacity-10" />
          <img src={codeSnippet} alt="code-snippet" className="opacity-40" />
          <img src={codeSnippet} alt="code-snippet" />
          <img src={codeSnippet} alt="code-snippet" className="opacity-40" />
          <img src={codeSnippet} alt="code-snippet" className="opacity-10" />
        </div>
        <img
          src={backgroundBlur}
          alt="background-blur"
          className="sm:hidden block"
        />
      </div>
    </div>
  );
}
