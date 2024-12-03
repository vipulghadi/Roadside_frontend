'use client'

import React, { useEffect, useState } from 'react'
import { Star, Clock, Phone, Mail, MapPin, Globe, Calendar, Instagram, Facebook, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from 'react-router-dom'
import { clientAPI } from '@/api/clientAPI'




function VendorHero({vendorSlug}) {
 
  const [vendorData, setVendorData] = useState(null)
  const [vendorImages, setVendorImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVendorData = async () => {
      if (!vendorSlug) {
        setError('Vendor slug is missing')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const response = await clientAPI.getVendorProfile(vendorSlug)
        if (response.data && response.data.vendor_profile) {
          setVendorData(response.data.vendor_profile)
          setVendorImages(response.data.vendor_images || [])
        } else {
          throw new Error('Invalid response format')
        }
        setError(null)
      } catch (err) {
        setError('Failed to load vendor data. Please try again later.')
        setVendorData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVendorData()
  }, [vendorSlug])

  if (isLoading) {
    return <VendorHeroSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!vendorData) {
    return null
  }

  const defaultImage = '/placeholder.svg?height=300&width=500'

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-4">{vendorData.vendor_name || 'Unnamed Vendor'}</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <Badge variant="secondary" className="text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {vendorData.address ? `${vendorData.address}, ${vendorData.city || ''}, ${vendorData.state || ''} ${vendorData.zipcode || ''}` : 'Address not available'}
          </Badge>
          <Badge variant="secondary" className="text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {vendorData.open_at && vendorData.close_at ? `${vendorData.open_at} - ${vendorData.close_at}` : 'Hours not available'}
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {vendorImages && vendorImages.length > 0 ? vendorImages.map((img) => (
            <img
              key={img.id}
              src={img.image_link || defaultImage}
              alt={`Stall Image ${img.name || ''}`}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          )) : (
            <img
              src={defaultImage}
              alt="Default Vendor Image"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="flex items-center mb-6">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-5 h-5 ${star <= Math.floor(vendorData.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
            ))}
          </div>
          <span className="ml-2 text-lg font-semibold">{vendorData.rating?.toFixed(1) || 'N/A'}</span>
          <span className="ml-2 text-gray-600">({vendorData.reviews_count || 0} reviews)</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button className="flex items-center justify-center">
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button variant="outline" className="flex items-center justify-center">
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
        <p className="text-gray-700 mb-4">{vendorData.description || 'No description available'}</p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Food Type</h3>
            <Badge>{vendorData.food_type || 'Not specified'}</Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Location Type</h3>
            <Badge>{vendorData.location_type || 'Not specified'}</Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Seating</h3>
            <Badge>{vendorData.sitting_available || 'Not specified'}</Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <Badge>{vendorData.size || 'Not specified'}</Badge>
          </div>
        </div>
        {vendorData.is_offer && vendorData.maximum_discount && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Special Offer!</h3>
            <p>Get up to {vendorData.maximum_discount}% off on select items</p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Phone:</strong> {vendorData.contact_number || 'Not available'}</p>
            {vendorData.alternate_contact_number && (
              <p className="mb-2"><strong>Alternate Phone:</strong> {vendorData.alternate_contact_number}</p>
            )}
            <p className="mb-2">
              <strong>Website:</strong>{' '}
              {vendorData.website_url ? (
                <a href={vendorData.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {vendorData.website_url}
                </a>
              ) : (
                'Not available'
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Established:</strong> {vendorData.establishment_year || 'Not specified'}</p>
            <p><strong>Hours:</strong> {vendorData.open_at && vendorData.close_at ? `${vendorData.open_at} - ${vendorData.close_at}` : 'Not specified'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function VendorHeroSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex flex-wrap gap-4 mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((img) => (
            <Skeleton key={img} className="w-full h-48 rounded-lg" />
          ))}
        </div>
        <div className="flex items-center mb-6">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-20 w-full mb-4" />
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex space-x-4 mt-4">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
      <p className="text-gray-700">{message}</p>
    </div>
  )
}

export default VendorHero