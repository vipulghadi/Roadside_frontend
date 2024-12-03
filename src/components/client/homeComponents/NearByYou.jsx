
import React, { useEffect, useState } from "react"
import StallCard from "../../common/StallCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { clientAPI } from "@/api/clientAPI"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import VendorCard from "@/components/common/VendorCard"



export default function NearbyYou() {
  const [nearbyYouVendors, setNearbyYouVendors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNearbyVendors = async () => {
      try {
        const resp = await clientAPI.getNearbyYou()
        setNearbyYouVendors(resp.data)
        setIsLoading(false)
        
      } catch (error) {
        console.error(error)
        setError("Failed to fetch nearby vendors. Please try again later.")
        
      }
    }

    fetchNearbyVendors()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full mt-5">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-[200px] h-[300px]" />
          ))}
        </div>
      </div>
    )
  }

 
  return (
    <div className="w-full mt-5  ">
    <div className="flex justify-start gap-3 items-center  p-2 mb-5">
    <h2 className="text-2xl font-semibold">Nearby You</h2>
    <Button className="text-[13px] font-semibold">Explore More</Button>
    </div>
     
      {nearbyYouVendors.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="w-full">
            {nearbyYouVendors.map((vendor) => (
              <CarouselItem   id= {vendor.id }className="md:basis-1/4 lg:basis-1/4">
                <VendorCard vendor={vendor} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="text-gray-500">No nearby vendors found.</p>
      )}
    </div>
  )
}