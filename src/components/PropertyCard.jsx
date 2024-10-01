/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
const PropertyCard = ({ query_result }) => {
  return (
    // @TODO :- Carousel Previous and Next Button 
    <Link to={`/${query_result?._id}`} className="w-[400px] h-[400px] cursor-pointer ">
      <div className="w-full flex flex-col h-full  ">
        <Carousel plugins={[Autoplay({delay:1500})]} className="w-full h-full max-w-xs">
          <CarouselContent>
            {query_result?.images.map((image) => (
              <CarouselItem key={image?._id}>
                <div className="w-full h-[300px] ">
                  {" "}
                  {/* Fixed dimensions */}
                  <img
                    src={image?.url}
                    alt="carousel"
                    className="w-full rounded-md h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex flex-col text-neutral-400  mt-2">
          <span className=" text-neutral-700">{query_result?.title}</span>
          <span>{query_result?.features.join(', ')}</span>

          <span >${query_result?.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
