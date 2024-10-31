import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function SuccessMsg() {
  const [isOpen, setIsOpen] = useState(true) 
  const navigate = useNavigate()

  const handleClose = () => {
    setIsOpen(false)
    navigate("/") // Redirect to homepage
  }

  useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vendor Account Created Successfully</DialogTitle>
          <DialogDescription>
            Your vendor account has been created successfully. We will send you a message on your registered contact number once your account has been verified.
          </DialogDescription>
        </DialogHeader>
        <Button variant="secondary" className="mt-4" onClick={handleClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
