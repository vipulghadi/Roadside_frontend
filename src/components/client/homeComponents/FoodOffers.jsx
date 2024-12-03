import React, { useEffect, useState } from "react";
import StallCard from "../../common/StallCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { clientAPI } from "@/api/clientAPI";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VendorCard from "@/components/common/VendorCard";

function FoodOffers() {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const resp = await clientAPI.getVendorsWithOffer();
        setVendors(resp.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch vendors with offers. Please try again later.");
        
      }
    };

    fetchVendors();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full mt-5">
        <Skeleton className="h-8 w-48 mb-4" />
        <Card>
          <CardContent className="p-2">
            <div className="flex space-x-4 overflow-hidden">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="w-[200px] h-[300px]" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }



  return (
    <div className="w-full  mt-7">
    <div className="flex justify-start gap-3 items-center  p-2 mb-5">
    <h2 className="text-2xl font-semibold">Offers for You</h2>
    <Button className="text-[13px] font-semibold">Explore More</Button>
    </div>
      {vendors.length > 0 ? (
        <Card className=" border-none">
          <CardContent className="p-2  border-none">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full "
            >
              <CarouselContent className="w-full ">
                {vendors.map((vendor, index) => (
                  <CarouselItem key={vendor.id || index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <VendorCard vendor={vendor}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      ) : (
        <p className="text-gray-500">No offers available at the moment.</p>
      )}
    </div>
  );
}

export default FoodOffers;