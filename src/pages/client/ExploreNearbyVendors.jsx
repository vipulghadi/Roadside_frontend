'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import VendorCard from '@/components/common/VendorCard' // Assuming VendorCard component is in the same directory
import { clientAPI } from '@/api/clientAPI'

const ExploreNearbyVendors = () => {
  const [vendors, setVendors] = useState([])
  const [filteredVendors, setFilteredVendors] = useState([])
  const [filters, setFilters] = useState({
    sitting: '',
    food_type: '',
    location_type: '',
    size: [0, 100]  // Assuming size is a range from 0 to 100
  })
  const [sortBy, setSortBy] = useState('popularity')

  useEffect(() => {

    clientAPI.exploreNearbyVendors()
    .then((resp)=>{
        setVendors(resp.data)
        setFilteredVendors(resp.data)
    })
    .catch((error)=>{
        console.error(error)
        setVendors([])
        setFilteredVendors([])
    })


  }, [])

  useEffect(() => {
    
    let result = vendors.filter(vendor => 
      (filters.sitting === '' || vendor.sitting_available === filters.sitting) &&
      (filters.food_type === '' || vendor.food_type === filters.food_type) &&
      (filters.location_type === '' || vendor.location_type === filters.location_type) &&
      (vendor.size >= filters.size[0] && vendor.size <= filters.size[1])
    )


    result.sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity_score - a.popularity_score
      if (sortBy === 'price') return a.starting_price - b.starting_price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

    setFilteredVendors(result)
  }, [vendors, filters, sortBy])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Explore Nearby Vendors</h1>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="sitting">Sitting Available</Label>
              <Select onValueChange={(value) => handleFilterChange('sitting', value)}>
                <SelectTrigger id="sitting">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="food_type">Food Type</Label>
              <Select onValueChange={(value) => handleFilterChange('food_type', value)}>
                <SelectTrigger id="food_type">
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location_type">Location Type</Label>
              <Select onValueChange={(value) => handleFilterChange('location_type', value)}>
                <SelectTrigger id="location_type">
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Size Range</Label>
              <Slider
                min={0}
                max={100}
                step={1}
                value={filters.size}
                onValueChange={(value) => handleFilterChange('size', value)}
                className="mt-2"
              />
              <div className="flex justify-between mt-1">
                <span>{filters.size[0]}</span>
                <span>{filters.size[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="sort">Sort By</Label>
            <Select onValueChange={setSortBy}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Select sorting option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price">Starting Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map(vendor => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  )
}

export default ExploreNearbyVendors