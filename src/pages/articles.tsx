import JavascriptIcon from "@/assets/javascript.svg";
import ReactIcon from "@/assets/react.svg";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import type { ReferralKey } from "@/molecules/referral";
import ScrollableContent from "@/molecules/scrollable-content";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Cable, X } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";
import {
  lazy,
  useEffect,
  useMemo,
  useState,
  type LazyExoticComponent,
} from "react";
import { useForm } from "react-hook-form";

const items = [
  {
    id: "reactjs",
    icon: ReactIcon,
    label: "reactjs",
  },
  {
    id: "javascript",
    icon: JavascriptIcon,
    label: "Javascript",
  },
  {
    id: "editor",
    icon: Cable,
    label: "Editor",
  },
] as const;

export type projects = "referral" | "editor-setup" | "react-reconciliation";

export type ReferralProps = {
  items: ReferralKey[];
  setActivePath: Dispatch<SetStateAction<projects>>;
  setActiveTabs: Dispatch<SetStateAction<projects[]>>;
};

const components: Record<
  projects,
  LazyExoticComponent<FC<ReferralProps>> | LazyExoticComponent<FC>
> = {
  referral: lazy(() => import("@/molecules/referral")) as LazyExoticComponent<
    FC<ReferralProps>
  >,
  "editor-setup": lazy(() => import("@/molecules/editor-setup")),
  "react-reconciliation": lazy(
    () => import("@/molecules/react-reconciliation")
  ),
};

export default function Articles() {
  const form = useForm({
    defaultValues: {
      items: ["editor"],
    },
  });
  const [activeTabs, setActiveTabs] = useState<projects[]>([]);
  const [activePath, setActivePath] = useState<projects>("referral");

  const { watch } = form;

  const allValues = watch();

  const ActiveComponent = useMemo(
    () => (activePath ? components[activePath] : null),
    [activePath]
  );

  useEffect(() => {
    const selectedItems = allValues.items || [];
    const newTabs = [...activeTabs];

    const hasReferral = newTabs[0] === "referral";

    if (selectedItems.length) {
      if (!hasReferral) {
        newTabs.unshift("referral");
      }
    } else {
      if (hasReferral) {
        newTabs.shift();
      }
    }
    setActivePath(newTabs[0]);
    setActiveTabs(newTabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValues.items]);

  return (
    <div className="md:grid block grid-cols-[20%_80%] md:flex-row flex-col h-auto">
      <Accordion type="multiple" defaultValue={["projects"]}>
        <AccordionItem value="projects" className="w-full">
          <AccordionTrigger className=" [&[data-state=open]>.arrow-icon]:text-slate-50! [&[data-state=open]>h3]:text-slate-50 [&[data-state=open]>.arrow-icon]:rotate-90 items-center justify-start py-4 px-6 border-b border-stroke rounded-none h-14 w-full flex">
            <CaretRightOutlined
              className="arrow-icon text-slate-500! 
         pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 mr-3"
            />
            <h3 className="text-base text-foreground">projects</h3>
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4">
            <div>
              <Form {...form}>
                <form className="space-y-8">
                  <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                      <FormItem>
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="items"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-center gap-3"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    <div>
                                      <item.icon className="w-6 h-6 text-foreground" />
                                    </div>
                                    <span className="text-foreground">
                                      {item.label}
                                    </span>
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="md:border-l md:border-t-0 border-l-0 border-t  border-stroke flex flex-col">
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3 border-b border-stroke h-14 w-full">
          {activeTabs.map((el) => (
            <div
              className="flex items-center h-full border-r border-stroke px-6 py-3 justify-between"
              onClick={() => setActivePath(el)}
              key={el}
            >
              <h3 className="text-foreground text-base text-nowrap text-ellipsis overflow-hidden">
                {el === "referral" ? allValues.items.join(" ; ") : el}
              </h3>
              <X
                className="text-foreground"
                width={14}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTabs((prev) => prev.filter((item) => item !== el));
                  setActivePath(activePath === el ? activeTabs[0] : activePath);
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <ScrollableContent className="hidden md:flex w-[-webkit-fill-available]">
            {ActiveComponent ? (
              <ActiveComponent
                items={allValues.items as ReferralKey[]}
                setActivePath={setActivePath}
                setActiveTabs={setActiveTabs}
              />
            ) : (
              <></>
            )}
          </ScrollableContent>
          <div className="md:hidden block p-3">
            {ActiveComponent ? (
              <ActiveComponent
                items={allValues.items as ReferralKey[]}
                setActivePath={setActivePath}
                setActiveTabs={setActiveTabs}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
