
import { Star, Clock, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
function VendorHero() {
  return (
    <div className="grid md:grid-cols-3 gap-6">

    <div className="md:col-span-2">
      <h1 className="text-3xl font-bold mb-4">Tasty Bites Stall</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <Badge variant="secondary" className="text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          123 Food Street, Culinary City
        </Badge>
        <Badge variant="secondary" className="text-sm">
          <Clock className="w-4 h-4 mr-1" />
          9:00 AM - 9:00 PM
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((img) => (
          <img
            key={img}
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/TopPicks/CknPotRic"
            alt={`Stall Image ${img}`}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="ml-2 text-lg font-semibold">4.8</span>
        <span className="ml-2 text-gray-600">(120 reviews)</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button className="flex items-center justify-center">
          <Phone className="w-4 h-4 mr-2" />
          Call Now
        </Button>
        <Button variant="outline" className="flex items-center justify-center">
          <Mail className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>
    </div>

    {/* Owner Info Card */}
    <Card>
      <CardHeader>
        <CardTitle>Owner Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2"><strong>Name:</strong> John Doe</p>
        <p className="mb-2"><strong>Contact:</strong> +1 234 567 8900</p>
        <p><strong>Email:</strong> john@tastybites.com</p>
      </CardContent>
    </Card>
  </div>

  )
}

export default VendorHero