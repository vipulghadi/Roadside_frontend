

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send } from "lucide-react"

const problemTags = [
  "Product Issue", "Shipping", "Payment", "Account", "Technical Support", "Other"
]

export default function VendorContactUs() {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = async () => {
    e.preventDefault()
    if (!query.trim() || selectedTags.length === 0) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in your query and select at least one problem tag.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/vendor-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, tags: selectedTags })
      })

      if (!response.ok) throw new Error('Failed to submit query')

      toast({
        title: "Query Submitted",
        description: "We've received your query and will get back to you soon.",
      })
      setQuery('')
      setSelectedTags([])
    } catch (error) {
      console.error('Error submitting query:', error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your query. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>Have a problem? Let us know and we'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="query">Your Query</Label>
                <Textarea
                  id="query"
                  placeholder="Describe your problem or query here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mt-1"
                  rows={5}
                />
              </div>
              <div>
                <Label>Problem Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {problemTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Query
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}