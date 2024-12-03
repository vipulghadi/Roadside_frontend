import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Star, ThumbsUp } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { clientAPI } from '@/api/clientAPI'


const RatingSkeleton = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-16" />
        <div className="text-right">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
      <div className="flex items-center justify-center mt-6">
        <Skeleton className="h-6 w-48" />
      </div>
    </div>
  )
  

const VendorRating = ({ vendorSlug }) => {
  const [ratingData, setRatingData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userRating, setUserRating] = useState({
    behavior: 0,
    service: 0,
    quality: 0,
    cleanliness: 0,
    value_for_money: 0,

  })

  useEffect(() => {
clientAPI.getVendorRatings(vendorSlug)
.then((resp)=>{
    resp.data && resp.data.rating_data && setRatingData(resp.data.ratingData)
    setIsLoading(false)
})
.catch((error)=>{
    console.error(error)
})

    
  }, [])

  const renderStars = (rating, interactive = false, category = '') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= (interactive ? userRating[category.toLowerCase()] : Math.round(rating))
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${interactive ? 'cursor-pointer' : ''}`}
            onClick={interactive ? () => handleStarClick(category.toLowerCase(), star) : undefined}
          />
        ))}
      </div>
    )
  }

  const handleStarClick = (category, rating) => {
    setUserRating(prev => ({ ...prev, [category]: rating }))
  }

  const handleCommentChange = (event) => {
    setUserRating(prev => ({ ...prev, comment: event.target.value }))
  }

  const handleSubmitRating = async () => {
    try {
      await clientAPI.submitVendorRating(vendorSlug, userRating)
      // Refresh ratings after submission
      const resp = await clientAPI.getVendorRatings(vendorSlug)
      setRatingData({
        totalRating: resp.data.total_rating,
        categories: [
          { name: 'Behavior', rating: resp.data.behavior_ratings },
          { name: 'Service', rating: resp.data.service_ratings },
          { name: 'Quality', rating: resp.data.quality_ratings },
          { name: 'Cleanliness', rating: resp.data.cleanliness_ratings },
          { name: 'Value for Money', rating: resp.data.value_for_money_ratings }
        ],
        likes: resp.data.likes
      })
      // Reset form and close dialog
      setUserRating({
        behavior: 0,
        service: 0,
        quality: 0,
        cleanliness: 0,
        value_for_money: 0,
        comment: ''
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Vendor Rating</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <RatingSkeleton />
        ) : (
          ratingData && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="text-4xl font-bold">{ratingData.totalRating.toFixed(1)}</div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Overall Rating</div>
                  {renderStars(ratingData.totalRating)}
                </div>
              </div>
              {ratingData.categories.map((category, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-medium">{category.rating.toFixed(1)}</span>
                  </div>
                  <Progress value={category.rating * 20} className="h-2" />
                </div>
              ))}
              <div className="flex items-center justify-center mt-6">
                <ThumbsUp className="w-5 h-5 mr-2 text-blue-500" />
                <span className="text-lg font-semibold">{ratingData.likes} people like this vendor</span>
              </div>
              <div className="mt-6 text-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Rate This Vendor</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Rate This Vendor</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {ratingData.categories.map((category, index) => (
                        <div key={index} className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor={category.name} className="text-right">
                            {category.name}
                          </Label>
                          <div className="col-span-3">
                            {renderStars(0, true, category.name)}
                          </div>
                        </div>
                      ))}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="comment" className="text-right">
                          Comment
                        </Label>
                        <Textarea
                          id="comment"
                          value={userRating.comment}
                          onChange={handleCommentChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={handleSubmitRating}>Submit Rating</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )
        )}
      </CardContent>
    </Card>
  )
}

export default VendorRating
  