import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { SearchX } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { clientAPI } from "@/api/clientAPI";
import VendorCard from "@/components/common/VendorCard";
import Pagination from "@/components/common/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { VENDOR_LOCATION_CHOICES, FOOD_TYPE_CHOICES, SITTING_CHOICES, SIZE_CHOICES } from "@/constants/filterChoices";

export default function DiscoverLocal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dataFound, setDataFound] = useState(true);

  const [filters, setFilters] = useState({
    page: "1",
    search: "",
    is_offer: false,
    food_type: "",
    location_type: "",
    size: "",
    sitting_available: "",
  });
  const [vendors, setVendors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVendors = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const resp = await clientAPI.discoverLocalVendors(params);
      const data = resp.data;
      if (data.count === 0) {
        setDataFound(false);
      } else {
        setTotalPages(data.total_pages);
        setVendors(data.results);
        setDataFound(true);
      }
    } catch (error) {
      console.error(error);
      setDataFound(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = {
      page: params.get("page") || "1",
      search: params.get("search") || "",
      is_offer: params.get("is_offer") === "true",
      food_type: params.get("food_type") || "",
      location_type: params.get("location_type") || "",
      size: params.get("size") || "",
      sitting_available: params.get("sitting_available") || "",
    };

    setFilters(newFilters);
    fetchVendors(newFilters);
  }, [location.search, fetchVendors]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    const queryString = Object.entries(filters)
      .filter(([_, value]) => value !== "" && value !== false)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    navigate(`/discover-local?${queryString}`);
  };

  const clearFilters = () => {
    navigate('/discover-local');
  };

  const VendorSkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-1/4 mb-2" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="sm:w-[80vw] w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Discover Local</h1>

      <div className="filters mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            type="text"
            id="search"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search vendors..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_offer"
            checked={filters.is_offer}
            onCheckedChange={(checked) => handleFilterChange("is_offer", checked)}
          />
          <Label htmlFor="is_offer">Has Offer</Label>
        </div>

        <div>
          <Label htmlFor="food_type">Food Type</Label>
          <Select
            value={filters.food_type}
            onValueChange={(value) => handleFilterChange("food_type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select food type" />
            </SelectTrigger>
            <SelectContent>
              {FOOD_TYPE_CHOICES.map((choice) => (
                <SelectItem key={choice.value} value={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location_type">Location Type</Label>
          <Select
            value={filters.location_type}
            onValueChange={(value) => handleFilterChange("location_type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location type" />
            </SelectTrigger>
            <SelectContent>
              {VENDOR_LOCATION_CHOICES.map((choice) => (
                <SelectItem key={choice.value} value={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="size">Size</Label>
          <Select
            value={filters.size}
            onValueChange={(value) => handleFilterChange("size", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {SIZE_CHOICES.map((choice) => (
                <SelectItem key={choice.value} value={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="sitting_available">Sitting Available</Label>
          <Select
            value={filters.sitting_available}
            onValueChange={(value) => handleFilterChange("sitting_available", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sitting option" />
            </SelectTrigger>
            <SelectContent>
              {SITTING_CHOICES.map((choice) => (
                <SelectItem key={choice.value} value={choice.value}>
                  {choice.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-full flex justify-between">
          <Button onClick={applyFilters} className="w-full sm:w-auto">Apply Filters</Button>
          <Button onClick={clearFilters} variant="outline" className="w-full sm:w-auto mt-2 sm:mt-0">Clear Filters</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="vendor-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(8).fill().map((_, index) => <VendorSkeleton key={index} />)}
        </div>
      ) : dataFound ? (
        <>
          <div className="vendor-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
          </div>
          <div className="mt-6">
            <Pagination
              totalPages={totalPages}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </>
      ) : (
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
                onClick={clearFilters}
                className="inline-flex items-center"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

