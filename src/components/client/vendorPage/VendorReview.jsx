import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation, useNavigate } from 'react-router-dom'

function VendorReview({vendorSlug}) {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [totalPages, setTotalPages] = useState(1)

  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const page = parseInt(searchParams.get('page') || '1', 10)

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/reviews?page=${page}&limit=5`)
        if (!response.ok) throw new Error('Failed to fetch reviews')
        const data = await response.json()
        setReviews(data.reviews)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError('Failed to load reviews. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [page])

  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`)
  }

  const handleRatingClick = (rating) => {
    setUserRating(rating)
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    // Implement your review submission logic here
    console.log('Submitting review:', { rating: userRating, comment: userComment })
    // Reset form after submission
    setUserRating(0)
    setUserComment('')
  }

  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star 
        key={star} 
        className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  const ReviewSkeleton = () => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center mb-2">
          <Skeleton className="w-24 h-4 mr-2" />
          <Skeleton className="w-20 h-4" />
        </div>
        <Skeleton className="w-full h-4 mt-2" />
        <Skeleton className="w-3/4 h-4 mt-2" />
      </CardContent>
    </Card>
  )

  return (
    <>
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {isLoading ? (
            Array(5).fill().map((_, index) => <ReviewSkeleton key={index} />)
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(review.rating)}
                    </div>
                    <span className="font-semibold">{review.name}</span>
                  </div>
                  <p>{review.comment}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {!isLoading && !error && (
          <div className="flex justify-center mt-6 space-x-2">
            <Button 
              onClick={() => handlePageChange(page - 1)} 
              disabled={page === 1}
            >
              Previous
            </Button>
            <span className="self-center">{`Page ${page} of ${totalPages}`}</span>
            <Button 
              onClick={() => handlePageChange(page + 1)} 
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </section>

      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => handleRatingClick(star)}
                      className={`text-gray-300 hover:text-yellow-400 ${star <= userRating ? 'text-yellow-400' : ''}`}
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <Textarea 
                  id="comment" 
                  placeholder="Share your experience..." 
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                />
              </div>
              <Button type="submit">Submit Review</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

export default VendorReview