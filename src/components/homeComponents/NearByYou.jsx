import React from "react";
import StallCard from "../common/StallCard";

function NearbyYou() {
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
    
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-[20px] font-semibold mb-4">Near By Yoy</h2>
      <div className="space-y-4">
        <div className="flex">
          {topRatedStalls.map((stall, index) => (
            <StallCard stall={stall} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NearbyYou;
