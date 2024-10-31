'use client'

import { useState } from 'react'
import { Search, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Navbar from '@/components/common/NavbarClient'

// Placeholder data for food vendors
const foodVendors = [
  { id: 1, name: "Tasty Bites", rating: 4.5, price: 15, isNew: true, isTrending: true, popularity: 95 },
  { id: 2, name: "Spice Haven", rating: 4.2, price: 20, isNew: false, isTrending: true, popularity: 88 },
  { id: 3, name: "Green Delights", rating: 4.0, price: 12, isNew: true, isTrending: false, popularity: 75 },
  { id: 4, name: "Burger Palace", rating: 4.7, price: 18, isNew: false, isTrending: true, popularity: 92 },
  { id: 5, name: "Sushi Master", rating: 4.8, price: 25, isNew: false, isTrending: false, popularity: 89 },
  { id: 6, name: "Pizza Paradise", rating: 4.3, price: 16, isNew: true, isTrending: true, popularity: 85 },
  { id: 1, name: "Tasty Bites", rating: 4.5, price: 15, isNew: true, isTrending: true, popularity: 95 },
  { id: 2, name: "Spice Haven", rating: 4.2, price: 20, isNew: false, isTrending: true, popularity: 88 },
  { id: 3, name: "Green Delights", rating: 4.0, price: 12, isNew: true, isTrending: false, popularity: 75 },
  { id: 4, name: "Burger Palace", rating: 4.7, price: 18, isNew: false, isTrending: true, popularity: 92 },
  { id: 5, name: "Sushi Master", rating: 4.8, price: 25, isNew: false, isTrending: false, popularity: 89 },
  { id: 6, name: "Pizza Paradise", rating: 4.3, price: 16, isNew: true, isTrending: true, popularity: 85 },
]

export default function SearchPage() {

  return (
    <div className="container mx-auto w-[80vw] mt-5">
    <Navbar/>
      <h1 className="text-3xl font-bold mb-8">Find Your Favorite Food</h1>
      
      {/* Search Box */}
      <div className="flex mb-6">
        <Input
          type="text"
          placeholder="Search for food or vendors..."
          className="flex-grow "
        />
        <Button className="ml-2">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Filters */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Price Range</h3>
              <Slider
                min={0}
                max={50}
                step={1}
            
              />
              <div className="flex justify-between mt-2">
                <span>0</span>
                <span>10</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    
                
                    className="mr-2"
                  />
                  New
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    
                    className="mr-2"
                  />
                  Trending
                </label>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sort By</h3>
              <Select >
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div>
          <div className="grid sm:grid-cols-4 gap-6 mb-6">
            {foodVendors.map(vendor => (
              <Card key={vendor.id}>
                <CardHeader>
                  <CardTitle>{vendor.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{vendor.rating.toFixed(1)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${vendor.price}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {vendor.isNew && <Badge variant="secondary">New</Badge>}
                    {vendor.isTrending && <Badge variant="secondary">Trending</Badge>}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Menu</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

        
        </div>
      </div>
    </div>
  )
}