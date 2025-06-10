import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CodeBlock } from "@/molecules/code-block";
import ScrollableContent from "@/molecules/scrollable-content";
import { CaretRightOutlined, MailFilled, PhoneFilled } from "@ant-design/icons";
import emailjs from "@emailjs/browser";
import { Loader2Icon, Scaling } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  email: string;
  message: string;
};

const today = new Date();

export default function ContactMe() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormData>({ mode: "onChange" });
  const formRef = useRef<HTMLFormElement | null>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSend, setHasSend] = useState<boolean>(false);

  const { email, message, username } = watch();

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY || "");

    function syncHeight() {
      if (rightRef.current && leftRef.current) {
        const rightHeight = rightRef.current.offsetHeight;
        leftRef.current.style.height = rightHeight + 5 + "px";
        leftRef.current.style.overflow = "hidden";
      }
    }

    syncHeight();

    window.addEventListener("resize", syncHeight);
    return () => window.removeEventListener("resize", syncHeight);
  }, []);

  const onSubmit = async () => {
    setLoading(true); // Show loading state

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || "",
        formRef.current || ""
      );

      setHasSend(true);
      reset();
    } catch (error) {
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <div className="h-full flex md:flex-row flex-col w-full">
      <Accordion type="multiple" defaultValue={["find-me-also-in", "contacts"]}>
        <AccordionItem value="contacts">
          <AccordionTrigger className=" [&[data-state=open]>.arrow-icon]:text-slate-50! [&[data-state=open]>h3]:text-slate-50 [&[data-state=open]>.arrow-icon]:rotate-90 items-center justify-start py-4 px-6 border-y border-stroke border-t-0 rounded-none h-14">
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
        <AccordionItem value="find-me-also-in">
          <AccordionTrigger className=" [&[data-state=open]>.arrow-icon]:text-slate-50! [&[data-state=open]>h3]:text-slate-50 [&[data-state=open]>.arrow-icon]:rotate-90 items-center justify-start py-4 px-6 border-y border-stroke rounded-none">
            <CaretRightOutlined
              className="arrow-icon text-slate-500! 
             pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 mr-3"
            />
            <h3 className="text-base text-foreground">find-me-also-in</h3>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 py-4 px-6">
            <a
              className="group flex items-center"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/razmik-danielyan/"
            >
              <Scaling className="text-foreground! text-sm mr-2 group-hover:text-slate-50!" />
              <h3 className="text-foreground text-base group-hover:text-slate-50!">
                Linkedin
              </h3>
            </a>
            <a
              className="group flex items-center"
              href="https://github.com/Raz-Danielyan"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Scaling className="text-foreground! text-sm mr-2 group-hover:text-slate-50!" />
              <h3 className="text-foreground text-base group-hover:text-slate-50!">
                Github
              </h3>
            </a>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="border-l md:border-t-0 border-t md:pt-0 border-stroke w-full flex-1 flex flex-col">
        <div className="border-b border-stroke h-14 w-full md:block hidden" />
        <div className="w-full flex flex-auto">
          <ScrollableContent className="lg:w-[50%] w-full h-full">
            <div className="flex items-center justify-center h-full w-full">
              {hasSend ? (
                <div className="flex flex-col items-center">
                  <h4 className="mx-auto text-heading-foreground mb-2 text-3xl">
                    Thank you! 🤘
                  </h4>
                  <p className="text-foreground text-lg mb-8 text-nowrap">
                    Your message has been accepted. <br />
                    You will receive answer soon!
                  </p>
                  <Button type="submit" onClick={() => setHasSend(false)}>
                    send-new-message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }}
                  className="space-y-6 "
                  ref={formRef}
                >
                  <div>
                    <Label
                      htmlFor="username"
                      className="text-foreground font-base mb-2"
                    >
                      _name:
                    </Label>
                    <Input
                      id="username"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-foreground font-base mb-2"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-foreground font-base mb-2"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message", {
                        required: "Message is required",
                      })}
                      placeholder="Write your message here..."
                      rows={5}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" disabled={!isValid || loading}>
                    {loading && <Loader2Icon className="animate-spin" />}
                    submit-message
                  </Button>
                </form>
              )}
            </div>
          </ScrollableContent>
          <ScrollableContent className="lg:flex hidden">
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
                <h2 ref={rightRef}>
                  <CodeBlock
                    language="js"
                    className="bg-transparent! text-lg! py-0! mt-0!"
                    code={`
                      const button = document.querySelector('#sendBtn');

const message = { 
	name: "${username}",
	email: "${email}",
	message: "${message}",
	date: "${today.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })}"
}

button.addEventListener('click', () => {
	form.send(message);
})`}
                  />
                </h2>
              </div>
            </div>
          </ScrollableContent>
        </div>
      </div>
    </div>
  );
}
