import { useNavigate } from "react-router-dom";
import { Star, ChefHat } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StallCard({ stall }) {
    const navigate=useNavigate()
    const handleCardClick = (vendorSlug) => {
        navigate(`/vendor-profile/${vendorSlug}/`);
    };

  return (
    <Card className="w-[200px] max-w-sm mx-auto overflow-hidden relative">
      <img
        src={stall.vendor_image}
        alt="Stall Image"
        className="object-cover h-[130px] w-full"
      />
      <span className="bg-black text-white absolute top-1 right-1 px-2 py-1 rounded-md">
      {stall.vendor_profile 
        ? (stall.vendor_profile.maximum_discount 
            ? `${stall.vendor_profile.maximum_discount}% Off` 
            : null)
        : null}
    </span>
      <CardContent className="p-2">
        <div className=" items-center justify-between mb-4">
          <div className="stall-name  font-semibold">{stall.vendor_profile && stall.vendor_profile.vendor_name.slice(0,15)+".."}</div>
        
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold flex items-center mb-2">
            <ChefHat className="w-4 h-4 mr-1" />
            Popular Items
            <div className="flex items-center ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{stall.vendor_profile && stall.vendor_profile.rating  | 4.5}</span>
          </div>
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>{stall.food_items && stall.food_items[0].name}</li>
            <li>{stall.food_items && stall.food_items[1].name}</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full  text-white"
        onClick={() =>{
            handleCardClick(stall.vendor_profile.slug);
  
        }}
        >
          Get Detail
        </Button>
      </CardFooter>
    </Card>
  );
}
