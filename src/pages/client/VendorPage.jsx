
import {  ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VendorHero from '@/components/vendorPage/VendorHero'
import VendorMenu from '@/components/vendorPage/VendorMenu'
import VendorReview from '@/components/vendorPage/VendorReview'
import Navbar from '@/components/common/NavbarClient'

export default function VendorPage() {
  return (
    <div className="container mx-auto w-[80vw]">
    <Navbar/>
    <VendorHero/>
    <VendorMenu/>
    
      <section className="my-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
        <ul className="list-disc list-inside">
          <li>Buy 1 Get 1 Free on all burgers (Mon-Wed)</li>
          <li>20% off on family meals</li>
          <li>Free drink with every meal combo</li>
        </ul>
      </section>
    <VendorReview/>
      {/* Create an Order Section */}
      <section className="my-12">
        <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to Order?</h2>
              <p>Enjoy our delicious meals delivered to your doorstep!</p>
            </div>
            <Button size="lg" variant="secondary" className="text-blue-600">
              Create an Order
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}