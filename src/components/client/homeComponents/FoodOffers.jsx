import React from "react";
import StallCard from "../../common/StallCard";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function FoodOffers() {
  // Sample data
  const topRatedStalls = [
    {
      name: "Stall A",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Stall B",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        name: "Stall A",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    {
      name: "Stall A",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Stall B",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
        name: "Stall A",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      },
    {
      name: "Stall A",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Stall B",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },


  ];

  return (
    <div className="  w-full  ">
    <h2 className="text-[20px] font-semibold mb-4">Offers for You</h2>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full  "
    >
      <CarouselContent className="w-full">
        {topRatedStalls.map((stall, index) => (
          <CarouselItem key={index} className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                  <StallCard stall={stall} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
  );
}

export default FoodOffers;
