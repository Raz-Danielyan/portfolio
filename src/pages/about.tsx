import { CodeOutlined, HarmonyOSOutlined } from "@ant-design/icons";
import {
  lazy,
  Suspense,
  useMemo,
  useState,
  type JSX,
  type LazyExoticComponent,
} from "react";

type tabs = "harmony" | "coding";

const components: Record<tabs, LazyExoticComponent<() => JSX.Element>> = {
  harmony: lazy(() => import("@/pages/harmony")),
  coding: lazy(() => import("@/pages/coding")),
};

export default function About() {
  const [activeTab, setActiveTab] = useState<tabs>("coding");

  const ActiveVisual = useMemo(
    () => (activeTab ? components[activeTab] : null),
    [activeTab]
  );

  return (
    <div className="flex h-max flex-auto flex-col md:flex-row">
      <div className="md:h-full h-fit md:block md:w-fit w-full border-r border-stroke px-6 py-4 md:border-b-0 border-b">
        <div className="md:grid gap-8 flex">
          <CodeOutlined
            className={`text-2xl h-fit relative z-10 ${
              activeTab === "coding" ? "text-slate-50!" : "text-slate-500!"
            }`}
            onClick={() => setActiveTab("coding")}
          />
          <HarmonyOSOutlined
            className={`text-2xl h-fit relative z-10 ${
              activeTab === "harmony" ? "text-slate-50!" : "text-slate-500!"
            }`}
            onClick={() => setActiveTab("harmony")}
          />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="hole">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        }
      >
        {ActiveVisual ? <ActiveVisual /> : null}
      </Suspense>
    </div>
  );
}
