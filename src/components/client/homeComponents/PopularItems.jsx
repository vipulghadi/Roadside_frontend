'use client'

import React, { useEffect, useState } from 'react'
import { clientAPI } from '@/api/clientAPI'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"



export default function PopularItems() {
  const [popularFoodItems, setPopularFoodItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        const resp = await clientAPI.getPopularFoodItems()
        setPopularFoodItems(resp.data)
        setIsLoading(false)
      } catch (error) {
        setError('Failed to fetch popular food items. Please try again later.')
        console.error('Error fetching popular food items:', error)
      }
    }

    fetchPopularItems()
  }, [])

  if (isLoading) {
    return (
      <Card className="mt-5 ">
        <CardContent>
         
          <div className="flex space-x-4 overflow-x-auto">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <Skeleton className="w-24 h-24 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-5">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="mt-7 p-2">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-3">What's on your mind?</h2>
        <div className="flex space-x-4 overflow-x-auto ">
          {popularFoodItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center space-y-2 min-w-[100px] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <span className="text-sm text-center font-semibold">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}