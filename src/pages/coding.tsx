import Experience from "@/molecules/experience";
import HeroExperience from "@/molecules/hero_models/HeroExperience";

export default function Coding() {
  return (
    <div
      className="flex xl:h-[calc(100vh_-_255px)]  md:h-[calc(100vh_-_150px)] h-[calc(100vh_-_205px)] overflow-y-auto"
      id="scroll-container"
    >
      <div className="w-full h-full z-1">
        <Experience />
      </div>
      <div>
        <figure>
          <div className="hero-3d-layout ">
            <HeroExperience />
          </div>
        </figure>
      </div>
    </div>
  );
}
