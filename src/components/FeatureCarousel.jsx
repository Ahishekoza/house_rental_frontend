/* eslint-disable react/prop-types */
import NationalParkIcon from "../assets/FeaturesIcon/national-park.png";
import AmazingPoolsIcon from "../assets/FeaturesIcon/swimming-pool.png";
import AmazingViewsIcon from "../assets/FeaturesIcon/window.png";
import WindMillsIcon from "../assets/FeaturesIcon/windmill.png";
import FarmsIcon from "../assets/FeaturesIcon/farm.png";
import BeachIcon from "../assets/FeaturesIcon/beach.png";
import LakeIcon from "../assets/FeaturesIcon/lake.png";
import TinyHomesIcon from "../assets/FeaturesIcon/tiny-house.png";
import IslandIcon from "../assets/FeaturesIcon/sunset.png";
import TopCitiesIcon from "../assets/FeaturesIcon/skyscrapper.png";
import RoomsIcon from "../assets/FeaturesIcon/hotel.png";
import TreeHouseIcon from "../assets/FeaturesIcon/treehouse.png";
import CountrySideIcon from "../assets/FeaturesIcon/barn.png";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const features = [
  {
    icon: NationalParkIcon,
    title: "National Parks",
  },
  {
    icon: AmazingPoolsIcon,
    title: "Amazing Pools",
  },
  {
    icon: AmazingViewsIcon,
    title: "Amazing Views",
  },
  {
    icon: WindMillsIcon,
    title: "Windmills",
  },
  {
    icon: FarmsIcon,
    title: "Farms",
  },
  {
    icon: BeachIcon,
    title: "Beachfront",
  },
  {
    icon: LakeIcon,
    title: "Lakefront",
  },
  {
    icon: TinyHomesIcon,
    title: "Tiny homes",
  },
  {
    icon: IslandIcon,
    title: "Islands",
  },
  {
    icon: TopCitiesIcon,
    title: "Top cities",
  },
  {
    icon: RoomsIcon,
    title: "rooms",
  },
  {
    icon: TreeHouseIcon,
    title: "Treehouses",
  },
  {
    icon: CountrySideIcon,
    title: "Countryside",
  },
];

const FeatureCarousel = ({ setFeatures ,feature_selected }) => {
  return (
    <Carousel opts={{ align: "start" }} className={feature_selected?"w-[80%]":"w-full"}>
      <CarouselContent>
        {features.map((feature, index) => (
          <CarouselItem key={index} className="md:basis-1/12 sm:basis-1/4 relative">
            <div
              onClick={() => setFeatures(feature?.title)}
              key={index}
              className={"p-1 mx-2 flex flex-col items-center cursor-pointer"}
            >
              <div className={" p-1 h-[3rem] w-[3rem]"}>
                <img
                  className="h-full w-full object-cover "
                  src={feature?.icon}
                />
              </div>
              <span className="text-xs text-center font-bold text-neutral-600">
                {feature?.title}
              </span>
              {feature_selected===feature?.title && <span className=" absolute bottom-0 border-2 border-neutral-950 w-full"></span>}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FeatureCarousel;
