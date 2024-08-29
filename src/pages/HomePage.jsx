import SiteLayout from "@/Layout/SiteLayout.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";

const HomePage = () => {
  const query_result = useSelector((state) => state.filter_queries.query_data);

  return (
    <SiteLayout>
      <div className="grid grid-cols-4 space-x-2 ">
        <div className="w-[300px]  ">
          <div className="w-full flex flex-col items-start h-full">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {query_result[0]?.images.map((image) => (
                  <CarouselItem key={image?._id}>
                    <div className="w-[300px] h-[200px] ">
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
            <div className="text-center mt-2">Abhishek</div>
          </div>
        </div>

        <div className="w-[300px]  ">
          <div className="w-full flex flex-col  h-full">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {query_result[0]?.images.map((image) => (
                  <CarouselItem key={image?._id}>
                    <div className="w-[300px] h-[200px] ">
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
            <div className="flex flex-col gap-2  mt-2">
              <span>{query_result[0]?.title}</span>
              <span>{query_result[0]?.description}</span>
            </div>
          </div>
        </div>
        <div className="w-[300px]  ">
          <div className="w-full flex flex-col items-start h-full">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {query_result[0]?.images.map((image) => (
                  <CarouselItem key={image?._id}>
                    <div className="w-[300px] h-[200px] ">
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
            <div className="text-center mt-2">Abhishek</div>
          </div>
        </div>
        <div className="w-[300px]  ">
          <div className="w-full flex flex-col items-start h-full">
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {query_result[0]?.images.map((image) => (
                  <CarouselItem key={image?._id}>
                    <div className="w-[300px] h-[200px] ">
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
            <div className="text-center mt-2">Abhishek</div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};

export default HomePage;
