'use client'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X } from 'lucide-react'
import LocationButton from './LocationButton'

export default function NavbarClient() {
  const { isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const NavItems = ({ isMobile = false }) => (
    <>
      <Link 
        to="/discover-local" 
        className={`text-sm font-medium transition-colors hover:text-primary ${isMobile ? 'block py-2' : ''}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        Discover Local
      </Link>
      <Link 
        to="/help" 
        className={`text-sm font-medium transition-colors hover:text-primary ${isMobile ? 'block py-2' : ''}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        Help
      </Link>
      {isAuthenticated ? (
        <Button variant="default" asChild className={isMobile ? 'w-full justify-start' : ''}>
          <Link to="/auth/logout" onClick={() => isMobile && setIsOpen(false)}>Logout</Link>
        </Button>
      ) : (
        <Button variant="default" asChild className={isMobile ? 'w-full justify-start' : ''}>
          <Link to="/auth/user-login" onClick={() => isMobile && setIsOpen(false)}>Login</Link>
        </Button>
      )}
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full  bg-white   md:px-[130px] p-2">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center">
            <span className="text-[30px] font-bold text-indigo-500">Roadside</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavItems />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-4">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="self-end">
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
              <nav className="flex flex-col space-y-4">
                <NavItems isMobile />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}