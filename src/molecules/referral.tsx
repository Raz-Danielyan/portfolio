import editor from "@/assets/images/editor.png";
import reactReferral from "@/assets/images/react-referral.png";
import reactIcon from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import type { projects, ReferralProps } from "@/pages/articles";
import { Cable } from "lucide-react";

export type ReferralKey = "editor" | "reactjs";

type referralType = Record<
  ReferralKey,
  {
    label: string;
    descr: string;
    img: string;
    icon: React.ComponentType<{ className?: string }> | string;
    color: string;
    path: projects;
  }
>;

const referrals: referralType = {
  editor: {
    label: "my editor Setup",
    descr:
      "My editor is set up with all the necessary plugins,and how avoid the pitfalls of complex configuration.",
    img: editor,
    icon: Cable,
    color: "bg-teal-300",
    path: "editor-setup",
  },
  reactjs: {
    label: "React Reconciliation",
    descr:
      "in dept understanding React Reconciliation. how components update efficiently.",
    img: reactReferral,
    icon: reactIcon,
    color: "bg-indigo-300",
    path: "react-reconciliation",
  },
  // javascript: {},
};

export default function Referral({
  items,
  setActivePath,
  setActiveTabs,
}: ReferralProps) {
  return (
    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-10 gap-5 w-full items-stretch">
      {items
        .map((el) => referrals?.[el])
        .filter((el) => el !== undefined)
        .map((el, index) => (
          <div key={index} className="w-full">
            <div className="flex">
              <h3 className="font-base text-indigo-500 mb-4">
                Project {index + 1} //{" "}
                <span className="text-foreground">{el.label}</span>
              </h3>
            </div>
            <div className="w-full rounded-lg bg-slate-950 border border-slate-800 relative">
              <div
                className={`${el.color} absolute top-2.5 right-2.5 p-1 rounded-lg flex items-center justify-center`}
              >
                <el.icon className={`h-fit w-4 text-slate-900`} />
              </div>
              <img
                src={el.img}
                alt={"referral image"}
                className="w-full object-cover h-36 rounded-t-lg"
              />
              <div className="p-8">
                <p className="text-foreground text-lg mb-5">{el.descr}</p>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setActivePath(el.path);
                    setActiveTabs((prev) =>
                      prev.includes(el.path) ? prev : [...prev, el.path]
                    );
                  }}
                >
                  view-project
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
