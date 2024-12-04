import React, { useState, useEffect } from 'react'
import { Search, Star, MapPin, Utensils, Percent } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Navbar from '@/components/common/NavbarClient'
import { clientAPI } from '@/api/clientAPI'
import VendorCard from '@/components/common/VendorCard'

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 0) {
        try {
          const resp = await clientAPI.getTop10FoodItemSuggestions(searchTerm)
          setSuggestions(resp.data)
        } catch (error) {
          console.error(error)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
        setSearchTerm("")
      }
    }

    fetchSuggestions()
  }, [searchTerm])

  const handleItemClick = async (item) => {
    setSelectedItem(item)
    setSearchTerm(item.name)
    setSuggestions([])
    setIsLoading(true)
    setError('')

    try {
      const resp = await clientAPI.searchFoodByItem(item.id)
      if (resp.success && resp.data && resp.data.results) {
        setSearchResults(resp.data.results)
      } else {
        setSearchResults([])
        setError('No results found. Please try another search term.')
      }
    } catch (error) {
      console.error('Error fetching item details:', error)
      setError('Failed to fetch item details. Please try again.')
      setSearchResults([])
    } finally {
      setIsLoading(false)
      setSuggestions([])
    }
  }

  return (
    <div className="sm:w-[80vw] w-full mx-auto mt-5 bg-gray-400 sm:p-0 p-4">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-lg py-6 px-4 rounded-lg outline-none bg-gray-100"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          
          {suggestions.length > 0 && (
            <Card className="absolute w-full mt-1 z-10">
              <CardContent className="p-2">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="w-full justify-start p-2 flex items-center rounded-md hover:bg-gray-100 mb-1 text-black text-base cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <img src={item.image} alt={item.name} className="w-10 h-10 mr-4 rounded-full object-cover" />
                    {item.name}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {error && (
        <Card className="mb-8 bg-red-100">
          <CardContent className="p-4 text-red-700">{error}</CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}

      {searchResults.length === 0 && !isLoading && selectedItem && (
        <Card>
          <CardContent className="p-4 text-center">
            <p>No results found for "{selectedItem.name}". Try another search term.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
