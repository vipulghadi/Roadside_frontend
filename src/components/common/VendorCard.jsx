'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Utensils, Percent, Navigation } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function VendorCard({ vendor }) {
  const [strippedName, setStrippedName] = useState('')

  useEffect(() => {
    const words = vendor.vendor_name.split(' ')
    setStrippedName(words.length > 2 ? words.slice(0, 2).join(' ') + '...' : vendor.vendor_name)
  }, [vendor.vendor_name])

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative h-48">
        <img 
          src={vendor.vendor_image} 
          alt={vendor.vendor_name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
          <h3 className="text-xl font-bold text-white truncate">{strippedName}</h3>
          {vendor.is_offer && 
            <Badge variant="destructive" className="text-xs">
            {vendor.maximum_discount}<Percent className="w-3 h-3 mr-1" />off
          </Badge>
          }
    
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 bg-primary/10 text-primary px-2 py-1 rounded-full">
            <Star className="w-4 h-4" />
            <span className="text-sm font-semibold">{vendor.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {vendor.food_type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {vendor.sitting_available}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground flex items-center">
            <Utensils className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{vendor.food_type}</span>
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{vendor.sitting_available}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs "
          onClick={() => {
            const url = `https://www.google.com/maps/search/?api=1&query=${vendor.latitude},${vendor.longitude}`
            window.open(url, '_blank', 'noopener,noreferrer')
          }}
        >
          <Navigation className="w-3 h-3 mr-1" />
          Navigate
        </Button>
        <Link to={`/vendor-profile/${vendor.slug}`}>
          <Button size="sm" className="text-xs bg-blue-900">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}