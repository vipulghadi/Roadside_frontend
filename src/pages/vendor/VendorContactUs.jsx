import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Send } from "lucide-react"
import { VendorAPI } from '@/api/vendorAPI'
import toast from 'react-hot-toast'



export default function VendorContactUs() {
  const [query, setQuery] = useState('')
  const [generalIssues, setGeneralIssues] = useState([])
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    VendorAPI.getGeneralIssues()
      .then((resp) => {
        setGeneralIssues(resp.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const handleSelectedIssues = (tag) => {
    selectedIssue[tag]
  }

  const handleSubmit = async (e) => {
    console.log("in function");
    
    e.preventDefault()
    if (!query.trim() ) {
      return Promise.reject()
    }
    setIsSubmitting(true)
    VendorAPI.raiseTicket({
        "issue_type":selectedIssue ?selectedIssue.id:null,
        "description": query,
    }).then((resp)=>{
        setIsSubmitting(false)
        toast.success("Ticket raised successfully")
        setQuery("")
      }).catch((err) => {
        setIsSubmitting(false)
        toast.error(err.message)
    }).finally(()=>{
        setIsSubmitting(false)
        setQuery("")
    })
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
                  {generalIssues.map((tag) => (
                    <span
                      key={tag.id}
                      className="cursor-pointer border rounded-md px-2 text-[13px] py-1"
                      onClick={() => handleSelectedIssues(tag)}
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={(e)=>{
handleSubmit(e)
          }} disabled={isSubmitting} className="w-full">
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