'use client'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Search, Zap, Clock, Utensils } from 'lucide-react'

export default function HomeBanner() {
  const [location, setLocation] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate('/search')
  }

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation)
    setIsDialogOpen(false)
  }

  const getLocationFromBrowser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`)
          setIsDialogOpen(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please enter it manually.")
        }
      )
    } else {
      alert("Geolocation is not supported by your browser")
    }
  }

  return (
    <div className=" bg-sky-900 text-white p-8 rounded-lg shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-white opacity-10 "></div>
      <h1 className="text-4xl font-bold mb-8 text-center relative z-10 animate-fadeIn">
        Discover Amazing Food Near You
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
        {[
          { icon: Zap, title: 'Fast Delivery', description: 'Get your food delivered quickly and efficiently.' },
          { icon: Clock, title: '24/7 Service', description: 'Order anytime, day or night. We\'re always open.' },
          { icon: Utensils, title: 'Wide Selection', description: 'Choose from a variety of cuisines and restaurants.' }
        ].map((feature, index) => (
          <Card key={index} className="bg-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-105">
            <CardContent className="p-6">
              <feature.icon className="w-8 h-8 mb-4 text-sky-200" />
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-sky-100">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto relative z-10">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="bg-white text-sky-600 hover:bg-sky-100 transition-colors duration-300 p-6">
              <MapPin className="mr-2 h-5 w-5" /> {location || "Add Location"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-sky-800">
            <DialogHeader>
              <DialogTitle>Enter Your Location</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Enter your address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border-sky-300 focus:border-sky-500"
              />
              <Button onClick={() => handleLocationSelect(location)} className="bg-sky-500 hover:bg-sky-600 text-white">
                Confirm Location
              </Button>
              <Button variant="outline" onClick={getLocationFromBrowser} className="border-sky-500 text-sky-500 hover:bg-sky-50">
                Get Location from Browser
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="flex-grow flex items-center bg-white rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
          <Input
            type="text"
            placeholder="Search for restaurants or cuisines"
            className="flex-grow border-none focus:ring-0 p-6 text-sky-800 placeholder-sky-400"
            onChange={handleSearch}
          />
          <Button 
            onClick={handleSearch}
            className="bg-sky-500 hover:bg-sky-600 text-white p-6 rounded-none transition-colors duration-300"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </div>
  )
}