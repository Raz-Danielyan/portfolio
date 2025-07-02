import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { useRef } from "react";
import { NavLink } from "react-router";

type HeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const menuRef = useRef(null);
  const closeRef = useRef(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const menuAnimation = (open: boolean) => {
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" },
    });

    if (open) {
      tl.to(
        menuRef.current,
        { rotation: 45, scale: 0.7, opacity: 0 },
        0
      ).fromTo(
        closeRef.current,
        { rotation: -45, scale: 0.7, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1 },
        0.15
      );
    } else {
      tl.to(
        closeRef.current,
        { rotation: -45, scale: 0.7, opacity: 0 },
        0
      ).fromTo(
        menuRef.current,
        { rotation: 45, scale: 0.7, opacity: 0 },
        { rotation: 0, scale: 1, opacity: 1 },
        0.15
      );
    }
    if (open) {
      gsap.to(menuItemsRef.current, {
        height: "calc(100% - 7.1rem)",
        duration: 0.5,
        ease: "power2.inOut",
        onStart: () => {
          menuItemsRef.current!.style.display = "block";
        },
      });

      if (itemsRef.current)
        gsap.fromTo(
          itemsRef.current.children,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.out",
          }
        );
    } else {
      gsap.to(menuItemsRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          menuItemsRef.current!.style.display = "none";
        },
      });
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    menuAnimation(!isMenuOpen);
  };

  return (
    <>
      <header className="h-14 w-full border-b border-stroke flex justify-between flex-shrink-0">
        <div className="flex items-center grid-cols-5 w-full">
          <h1 className="text-lg font-medium text-foreground h-full lg:px-8 px-4 flex items-center lg:w-100 text-nowrap">
            razmik-danielyan
          </h1>
          <nav className="navbar">
            <NavLink to="/" end>
              _hello
            </NavLink>
            <NavLink to="/about" className="relative z-10">
              _about-me
            </NavLink>
            <NavLink to="/articles" className="relative z-10">
              _articles
            </NavLink>
            <NavLink
              to="/contact-me"
              className="relative z-10 ml-auto border-l-1"
            >
              _contact-me
            </NavLink>
          </nav>
          <div className="ml-auto mr-4 md:hidden block">
            <button
              onClick={handleMenuClick}
              className="w-10 h-10 flex items-center justify-center relative z-10"
              aria-label="Toggle menu"
            >
              <Menu
                ref={menuRef}
                size={28}
                className="absolute text-foreground"
              />

              <X
                ref={closeRef}
                size={28}
                className="absolute text-foreground opacity-0"
              />
            </button>
          </div>
        </div>
      </header>
      <div
        ref={menuItemsRef}
        className="overflow-hidden h-0 bg-main-backdrop  absolute top-14 z-50 w-full "
        style={{ display: "none" }}
      >
        <h3 className="p-6 pb-4 text-foreground text-base"># navigate:</h3>
        <div ref={itemsRef} className="flex flex-col">
          <NavLink
            to="/"
            end
            className="border-t border-stroke px-6 py-4 text-base text-heading-foreground"
            onClick={handleMenuClick}
          >
            _hello
          </NavLink>
          <NavLink
            to="/about"
            className="border-t border-stroke px-6 py-4 text-base text-heading-foreground"
            onClick={handleMenuClick}
          >
            _about-me
          </NavLink>
          <NavLink
            to="/articles"
            className="border-t border-stroke px-6 py-4 text-base text-heading-foreground"
            onClick={handleMenuClick}
          >
            _articles
          </NavLink>
          <NavLink
            to="/contact-me"
            className="border-y border-stroke px-6 py-4 text-base text-heading-foreground"
            onClick={handleMenuClick}
          >
            _contact-me
          </NavLink>
        </div>
      </div>
    </>
  );
}
