
import { Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"

function VendorReview() {
  return (<>
    <section className="my-12">
    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
    <div className="space-y-6">
      {[
        { name: 'Alice', rating: 5, comment: 'Amazing food and great service!' },
        { name: 'Bob', rating: 4, comment: 'Delicious burgers, but a bit pricey.' },
      ].map((review, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-semibold">{review.name}</span>
            </div>
            <p>{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>

  {/* Write a Review Section */}
  <section className="my-12">
    <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" className="text-gray-300 hover:text-yellow-400">
                  <Star className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
            <Textarea id="comment" placeholder="Share your experience..." />
          </div>
          <Button type="submit">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  </section></>
  )
}

export default VendorReview