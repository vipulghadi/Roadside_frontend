
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star } from 'lucide-react'
import { clientAPI } from '@/api/clientAPI'
import { isError } from 'react-query'
import { Button } from '@/components/ui/button'

function VendorMenu({vendorSlug}) {
  const [menuItems, setMenuItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => {

        setIsLoading(true)
        clientAPI.getVendorFoodItems(vendorSlug)
        .then((response) => {
          setMenuItems(response.data)
          setIsLoading(false)
        })
        .catch((error)=>{
            console.error(error)
            
            setError('Failed to load menu items. Please try again later.')
      
        })
        .finally(()=>{
            setIsLoading(false)
            
        })

    


  }, [])

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))
  }

if (error){
    return <div className="text-center  gap-1 w-full h-[100px] mt-5  rounded-md  flex justify-center items-center font-semibold">
    <p>{error}</p>

    
    </div>
  
}

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {isLoading
            ? Array(4).fill(0).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <Skeleton className="h-4 w-3/4" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-32 w-full mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : menuItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded-md" />
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-lg font-bold">{item.offer_price}</p>
                          {item.is_offer && (
                            <span className="text-green-600 text-sm font-semibold">
                              {item.offer_discount_percent}% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mb-4">
                          {renderStars(item.rating)}
                          <span className="ml-2 text-sm text-gray-600">({item.rating}/5)</span>
                        </div>
                    
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default VendorMenu