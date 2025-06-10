import codingGuyOne from "@/assets/images/coding-1.jpg";
import codingGuySecond from "@/assets/images/coding-2.jpg";
import collagePhoto from "@/assets/images/eipq.jpg";
import institutePhoto from "@/assets/images/nuaca.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function StructureVisual() {
  return (
    <div className="pb-3">
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <Avatar className="mr-3 size-10">
            <AvatarImage src={codingGuyOne} alt="coding-guy" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-base text-indigo-500 mb-1">
              @lolimid
            </h3>
            <h4 className="text-base text-foreground">Created 5 years ago</h4>
          </div>
        </div>
        <div className="wi-full h-50 border border-stroke rounded-2xl mb-2">
          <img
            src={collagePhoto}
            alt="collage-photo"
            className="rounded-2xl h-full w-full object-cover"
          />
        </div>
        <p className="text-foreground">I have grinded here 4 years</p>
      </div>
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <Avatar className="mr-3 size-10">
            <AvatarImage src={codingGuySecond} alt="coding-guy" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-base text-indigo-500 mb-1">
              @lolimid
            </h3>
            <h4 className="text-base text-foreground">Created 5 years ago</h4>
          </div>
        </div>
        <div className="wi-full h-50 border border-stroke rounded-2xl mb-2">
          <img
            src={institutePhoto}
            alt="collage-photo"
            className="rounded-2xl h-full w-full object-cover"
          />
        </div>
        <p className="text-foreground">
          And I have grinded here 2 years and there are 3 left.
        </p>
      </div>
    </div>
  );
}
