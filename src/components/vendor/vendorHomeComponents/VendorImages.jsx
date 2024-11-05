
import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Upload,DeleteIcon } from "lucide-react"
import { VendorAPI } from '@/api/vendorAPI'
import toast from 'react-hot-toast'

export default function VendorImages() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    VendorAPI.getVendorImages().then((resp)=>{
        setImages(resp.data)
        setIsLoading(false)

    }).catch((error)=>{
        console.error(error)
        setIsLoading(false)
        toast.error("error in getting images")
    })

  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('image', file)
    
    VendorAPI.addVendorImage(formData).then((resp)=>{
        toast.success("Image uploaded successfully.")
        setIsLoading(false)
        fetchImages()
    }).catch((error)=>{
        console.error(error)
        setIsLoading(false)
        toast.error("error in uploading image")
    }).finally(()=>{
        setIsUploading(false)
  
    })
    
  }
  const handleDeleteImage = async(id) => {
          VendorAPI.deleteVendorImage(id).then((resp)=>{
            toast.success("Image deleted successfully.")
            fetchImages()
          }).catch((error)=>{
            console.error(error)
            toast.error("error in deleting image")
            
          })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Images</h1>
      
      <div className="mb-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <Button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden relative">
              <CardContent className="p-0">
                <img src={image.image} alt="Vendor" className="w-full h-48 object-cover" />
                <DeleteIcon className="absolute top-0 right-0 cursor-pointer" onClick={()=>{
                    handleDeleteImage(image.id)}}/>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
