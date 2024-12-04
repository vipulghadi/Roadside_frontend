import React from 'react'
import { Button } from '../ui/button'
import { SearchX } from 'lucide-react'
function ZeroVendorFound({clearFilters}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <SearchX className="mx-auto h-24 w-24 text-gray-400" />
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">Oops! No Vendors Found</h2>
      <p className="mt-2 text-lg text-gray-500">
        We couldn't find any vendors matching your search criteria.
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your filters or search terms to find more options.
      </p>
      <div className="mt-6">
        <Button
          onClick={clearFilters()}
          className="inline-flex items-center"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  </div>
  )
}

export default ZeroVendorFound