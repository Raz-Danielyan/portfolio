import MenuItem from "@/atoms/menu-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollableContent from "@/molecules/scrollable-content";
import {
  CaretRightOutlined,
  FolderFilled,
  MailFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { ChevronRight, X } from "lucide-react";
import {
  lazy,
  useMemo,
  useState,
  type JSX,
  type LazyExoticComponent,
} from "react";

export type pages = "structure" | "story";

type componentProps = {
  visual: Record<pages, LazyExoticComponent<() => JSX.Element>>;
  markdown: Record<pages, LazyExoticComponent<() => JSX.Element>>;
};

const components: componentProps = {
  visual: {
    structure: lazy(() => import("@/molecules/structure-visual")),
    story: lazy(() => import("@/molecules/story-visual")),
  },
  markdown: {
    structure: lazy(() => import("@/molecules/structure-markdown")),
    story: lazy(() => import("@/molecules/story-markdown")),
  },
};

export default function Harmony() {
  const [activeTabs, setActiveTabs] = useState<Array<pages | null>>(["story"]);
  const [activePath, setActivePath] = useState<pages | null>("story");

  const ActiveMarkdown = useMemo(
    () => (activePath ? components.markdown[activePath] : null),
    [activePath]
  );

  const ActiveVisual = useMemo(
    () => (activePath ? components.visual[activePath] : null),
    [activePath]
  );
  return (
    <div className="flex sm:flex-row flex-col w-full">
      <Accordion type="multiple" defaultValue={["personal-info", "contacts"]}>
        <AccordionItem value="personal-info">
          <AccordionTrigger className=" [&[data-state=open]>.arrow-icon]:text-slate-50! [&[data-state=open]>h3]:text-slate-50 [&[data-state=open]>.arrow-icon]:rotate-90 items-center justify-start py-4 px-6 border-b border-stroke rounded-none h-14">
            <CaretRightOutlined
              className="arrow-icon text-slate-500! 
             pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 mr-3"
            />
            <h3 className="text-base text-foreground">personal-info</h3>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <Accordion type="single" collapsible defaultValue="bio">
              <AccordionItem value="bio">
                <AccordionTrigger className=" [&[data-state=open]>.arrow-icon]:text-slate-50! [&[data-state=open]>.arrow-icon]:rotate-90 items-center justify-start pt-0">
                  <ChevronRight
                    className="arrow-icon text-slate-500! 
             pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 mr-2"
                  />
                  <FolderFilled className="text-rose-400! text-base mr-1" />
                  <h3 className="text-base text-foreground">bio</h3>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <MenuItem
                    {...{
                      setActivePath,
                      setActiveTabs,
                      activePath,
                    }}
                    title="story"
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="education">
                <AccordionTrigger className=" [&[data-state=open]>.arrow-icon]:text-slate-50! [&[data-state=open]>.arrow-icon]:rotate-90 items-center justify-start pb-0">
                  <ChevronRight className="arrow-icon text-slate-500!  pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 mr-2" />
                  <FolderFilled className="text-indigo-500! text-base mr-1" />
                  <h3 className="text-base text-foreground">education</h3>
                </AccordionTrigger>
                <AccordionContent className="odd:px-2 [&>div:nth-child(odd)]:py-2">
                  <MenuItem
                    {...{
                      setActivePath,
                      setActiveTabs,
                      activePath,
                    }}
                    title="structure"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="contacts">
          <AccordionTrigger className=" [&[data-state=open]>.arrow-icon]:text-slate-50! [&[data-state=open]>h3]:text-slate-50 [&[data-state=open]>.arrow-icon]:rotate-90 items-center justify-start py-4 px-6 border-y border-stroke rounded-none">
            <CaretRightOutlined
              className="arrow-icon text-slate-500! 
             pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 mr-3"
            />
            <h3 className="text-base text-foreground">contacts</h3>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 py-4 px-6">
            <a
              className="flex items-center"
              href="mailto:razmikdanielyan179@gmail.com"
            >
              <MailFilled className="text-foreground! text-base mr-2" />
              <h3 className="text-foreground text-base">razmikdanielyan179</h3>
            </a>
            <a className="flex items-center" href="tel:+37495040430">
              <PhoneFilled className="text-foreground! text-base mr-2" />
              <h3 className="text-foreground text-base">+37495040430</h3>
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="border-l sm:border-t-0 border-t-1 border-stroke w-full flex-1 flex flex-col">
        <div className="sm:grid hidden xl:grid-cols-4 lg:grid-cols-3  grid-cols-2 border-b border-stroke h-14 w-full">
          {activeTabs.map((el) => (
            <div
              className="flex items-center h-full border-r border-stroke px-6 py-3 justify-between"
              onClick={() => setActivePath(el)}
              key={el}
            >
              <h3 className="text-foreground text-base text-nowrap">{el}</h3>
              <X
                className="text-foreground"
                width={14}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTabs((prev) => prev.filter((item) => item !== el));
                }}
              />
            </div>
          ))}
        </div>
        <div className="w-full flex flex-auto">
          <ScrollableContent className="xl:w-[50%] w-full">
            {ActiveMarkdown ? <ActiveMarkdown /> : null}
          </ScrollableContent>
          <ScrollableContent className="xl:flex hidden">
            <h3 className="mb-2 text-lg text-foreground">
              // Code snippet showcase:
            </h3>
            {ActiveVisual ? <ActiveVisual /> : null}
          </ScrollableContent>
        </div>
      </div>
    </div>
  );
}
