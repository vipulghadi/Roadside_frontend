
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function VendorMenu() {
  return (
    <section className="my-12">
    <h2 className="text-2xl font-bold mb-6">Our Menu</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {['Burger Deluxe', 'Veggie Supreme', 'Chicken Wrap'].map((item) => (
        <Card key={item}>
          <CardHeader>
            <CardTitle>{item}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold mb-2">$9.99</p>
            <p className="text-gray-600 mb-4">Delicious and freshly made</p>
            <Button>Add to Order</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
  )
}

export default VendorMenu