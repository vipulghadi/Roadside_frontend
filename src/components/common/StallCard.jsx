
import { Star, ChefHat } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StallCard({ stall }) {
  return (
    <Card className="w-[200px] max-w-sm mx-auto overflow-hidden">
      <img
        src={stall.image}
        alt="Stall Image"
        className="object-cover h-[130px] w-full"
      />

      <CardContent className="p-2">
        <div className=" items-center justify-between mb-4">
          <div className="stall-name  font-semibold">{stall.name}</div>
        
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold flex items-center mb-2">
            <ChefHat className="w-4 h-4 mr-1" />
            Popular Items
            <div className="flex items-center ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{stall.rating}</span>
          </div>
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>1. Crispy Fried Chicken</li>
            <li>2. Crispy Fried Chicken</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full  text-white"
          onClick={() => console.log("Get details clicked")}
        >
          Get Detail
        </Button>
      </CardFooter>
    </Card>
  );
}
