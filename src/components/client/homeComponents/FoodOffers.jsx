import React, { useEffect, useState } from "react";
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
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full mt-5 px-4 sm:px-6 lg:px-8">
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
    <div className="w-full mt-7 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Offers for You</h2>
    
      </div>
      {vendors.length > 0 ? (
        <Card className="border-none">
          <CardContent className="p-2 border-none relative">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {vendors.map((vendor, index) => (
                  <CarouselItem key={vendor.id || index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <VendorCard vendor={vendor}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute top-1/2 -left-4 -translate-y-1/2">
                <CarouselPrevious className="relative left-0" />
              </div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                <CarouselNext className="relative right-0" />
              </div>
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

