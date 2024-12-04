import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import VendorCard from '@/components/common/VendorCard'
import Pagination from '@/components/common/Pagination'
import { clientAPI } from '@/api/clientAPI'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import ZeroVendorFound from '@/components/common/ZeroVendorFound'

function PopularFoodItemVendors() {
  const [vendors, setVendors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({ page: "1" })
  const { itemId } = useParams()
  const [redirectURL, setRedirectURL] = useState(`/popular-item/${itemId}`)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const page = searchParams.get('page') || "1"
    setFilters(prevFilters => ({ ...prevFilters, page }))
     setIsLoading(true)
    clientAPI.getPopularFoodItemVendorsList(itemId, page)
      .then((resp) => {
        console.log(resp.data)
        setVendors(resp.data.results)
        setTotalPages(resp.data.total_pages)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError("Failed to fetch popular food item vendors. Please try again later.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [location.search, itemId])

  if (isLoading) {
    return (
      <div className="w-full sm:w-[80%] mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <ZeroVendorFound />
  }

  return (
    <div className="w-full sm:w-[80%] mx-auto mt-5 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Popular Food Item Vendors</h2>
      {vendors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              totalPages={totalPages}
              filters={filters}
              setFilters={setFilters}
              redirectURL={redirectURL}
            />
          </div>
        </>
      ) : (
        <p className="text-gray-500">No popular food item vendors found.</p>
      )}
    </div>
  )
}

export default PopularFoodItemVendors

