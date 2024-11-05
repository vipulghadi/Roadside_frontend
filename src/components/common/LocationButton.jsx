import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

// This is a placeholder function. Replace it with your actual API call.
const getLocationFromCoordinates = async (lat, lon) => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
};

const LocationButton = () => {
  const [location, setLocation] = useState("My Location");
  const [isOpen, setIsOpen] = useState(false);
  const [manualLocation, setManualLocation] = useState("");

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const locationString = await getLocationFromCoordinates(latitude, longitude);
        setLocation(locationString);
        setIsOpen(false);
      }, (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please enter it manually.");
      });
    } else {
      alert("Geolocation is not supported by your browser. Please enter your location manually.");
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualLocation) {
      setLocation(manualLocation);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MapPin className="mr-2 h-4 w-4" />
          {location}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Your Location</DialogTitle>
          <DialogDescription>
            Enter your location manually or use your current location.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleManualSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={handleGetCurrentLocation}>
              Use Current Location
            </Button>
            <Button type="submit">Set Location</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LocationButton;