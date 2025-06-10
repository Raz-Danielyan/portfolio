import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

export default function Footer() {
  return (
    <div className="w-full h-14 flex sm:justify-between border-t border-stroke flex-shrink-0">
      <div className="h-full flex">
        <h1 className="text-foreground text-lg flex items-center h-full px-6">
          find me in:
        </h1>
        <div className="border-x border-stroke ">
          <a
            href="https://www.linkedin.com/in/razmik-danielyan/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-full px-6 flex items-center justify-center"
          >
            <LinkedinOutlined className="text-2xl text-slate-500!" />
          </a>
        </div>
      </div>
      <a
        href="https://github.com/Raz-Danielyan"
        target="_blank"
        rel="noopener noreferrer"
        className="h-full flex sm:border-l border-stroke sm:border-r-0 border-r px-8 items-center justify-center"
      >
        <h1 className="text-foreground text-lg mr-2 sm:block hidden">
          @Raz-Danielyan
        </h1>
        <GithubOutlined className="text-2xl text-slate-500!" />
      </a>
    </div>
  );
}
