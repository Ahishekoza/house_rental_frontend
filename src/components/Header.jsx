import { FaReact } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchByPlace_Guest from "./SearchByPlace_Guest";



const Header = () => {


  return (
    <div className="border-b-2 border-neutral-300 sticky top-0 bg-white shadow-md">
      <div className="flex flex-row  justify-between py-5 container ">
        <div className="flex  gap-0.5 text-red-500  text-2xl">
          <FaReact className="text-4xl" />
          <span className="font-medium">airbnb</span>
        </div>

        <div >
          <Tabs
            defaultValue="Stays"
            className="flex flex-col w-full items-center gap-6"
          >
            <div>
              <TabsList className="flex  gap-10 bg-transparent text-neutral-600">
                <TabsTrigger value="Stays">Stays</TabsTrigger>
                <TabsTrigger value="Experiences">Experiences</TabsTrigger>
              </TabsList>
            </div>
            <div>
              <TabsContent value="Stays">
                <SearchByPlace_Guest/>
              </TabsContent>
              <TabsContent value="Experiences">
                <h1>Experiences</h1>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div>Airbnb your home</div>
      </div>
    </div>
  );
};

export default Header;
