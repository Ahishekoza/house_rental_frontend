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

const FeatureCarousel = ({ setFeatures }) => {
  return (
    <div className="w-full flex items-center justify-evenly">
      {features.map((feature, index) => (
        <div
          onClick={() =>
            setFeatures(feature?.title)
          }
          key={index}
          className="p-1 mx-2 flex flex-col items-center cursor-pointer"
        >
          <div className=" p-1 h-[3rem] w-[3rem]">
            <img className="h-full w-full object-cover " src={feature?.icon} />
          </div>
          <span className="text-xs font-bold text-neutral-600">
            {feature?.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FeatureCarousel;
