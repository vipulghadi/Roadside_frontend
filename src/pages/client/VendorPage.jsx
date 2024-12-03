
import {  ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VendorHero from '@/components/client/vendorPage/VendorHero'
import VendorMenu from '@/components/client/vendorPage/VendorMenu'
import VendorReview from '@/components/client/vendorPage/VendorReview'
import Navbar from '@/components/common/NavbarClient'
import VendorRatings from '@/components/client/vendorPage/VendorRatings'
import { useParams } from 'react-router-dom'
export default function VendorPage() {
    const { vendorSlug } = useParams()
  return (
    <div className="container mx-auto w-[80vw]">
    <VendorHero vendorSlug={vendorSlug}/>
    <VendorMenu vendorSlug={vendorSlug}/>
    <VendorRatings vendorSlug={vendorSlug}/>
    <VendorReview vendorSlug={vendorSlug}/>

    </div>
  )
}