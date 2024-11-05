'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Phone, Globe, Calendar } from 'lucide-react'
import toast from 'react-hot-toast'
import { VendorAPI } from '@/api/vendorAPI'


export default function VendorSettings() {
  const [formData, setFormData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
 

  useEffect(() => {
    VendorAPI.getVendorProfile().then((resp)=>{
        setFormData(resp.data)
      setIsLoading(false)
    }).catch((err) => {
   
        toast.error(err.message)
    }).finally(() => {
        setIsLoading(false)
    })
    
  },[] )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name) => (value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    VendorAPI.updateVendorProfile(formData).then((resp)=>{
        toast.success("Profile updated successfully.")
        setIsLoading(false)
        
    }).catch((error)=>{
        toast.error(error.message)
        console.log(error);
        
    }).finally(()=>{
        setIsLoading(false)
    })
    
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Update Vendor Profile</CardTitle>
          <CardDescription>Make changes to your vendor profile here.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username (Non-editable)</Label>
                      <Input id="username" value={formData.username} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email (Non-editable)</Label>
                      <Input id="email" value={formData.email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_number">Contact Number (Non-editable)</Label>
                      <Input id="contact_number" value={formData.contact_number} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alternate_contact_number">Alternate Contact Number</Label>
                      <Input id="alternate_contact_number" name="alternate_contact_number" value={formData.alternate_contact_number} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Vendor Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor_name">Vendor Name</Label>
                      <Input id="vendor_name" name="vendor_name" value={formData.vendor_name} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="food_type">Food Type</Label>
                      <Select onValueChange={handleSelectChange('food_type')} value={formData.food_type}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select food type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veg">Veg</SelectItem>
                          <SelectItem value="nonveg">Non-Veg</SelectItem>
                          <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location_type">Location Type</Label>
                      <Select onValueChange={handleSelectChange('location_type')} value={formData.location_type}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="movable">Movable Thela</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sitting_available">Sitting Available</Label>
                      <Select onValueChange={handleSelectChange('sitting_available')} value={formData.sitting_available}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sitting availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not available">Not available</SelectItem>
                          <SelectItem value="indoor">Indoor</SelectItem>
                          <SelectItem value="outdoor">Outdoor</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Size</Label>
                      <Select onValueChange={handleSelectChange('size')} value={formData.size}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Location Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" name="state" value={formData.state} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipcode">Zipcode</Label>
                      <Input id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="latitude">Latitude</Label>
                        <Input id="latitude" name="latitude" type="number" value={formData.latitude} onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="longitude">Longitude</Label>
                        <Input id="longitude" name="longitude" type="number" value={formData.longitude} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="open_at">Open At</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input id="open_at" name="open_at" type="time" value={formData.open_at} onChange={handleChange} className="pl-10" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="close_at">Close At</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input id="close_at" name="close_at" type="time" value={formData.close_at} onChange={handleChange} className="pl-10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="establishment_year">Establishment Year</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="establishment_year" name="establishment_year" type="number" value={formData.establishment_year} onChange={handleChange} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website_url">Website URL</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input id="website_url" name="website_url" type="url" value={formData.website_url} onChange={handleChange} className="pl-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}