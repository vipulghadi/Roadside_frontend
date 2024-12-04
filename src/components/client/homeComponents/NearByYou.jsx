import React, { useEffect, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { clientAPI } from "@/api/clientAPI"
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
        setIsLoading(false)
      }
    }

    fetchNearbyVendors()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full mt-5 px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-[300px]" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mt-5 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <h2 className="text-2xl font-semibold mb-2 sm:mb-0">Nearby You</h2>
        <Button className="text-sm font-semibold">Explore More</Button>
      </div>
     
      {nearbyYouVendors.length > 0 ? (
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {nearbyYouVendors.map((vendor) => (
                <CarouselItem key={vendor.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <VendorCard vendor={vendor} />
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
        </div>
      ) : (
        <p className="text-gray-500">No nearby vendors found.</p>
      )}
    </div>
  )
}

