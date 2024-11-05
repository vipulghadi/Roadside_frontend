'use client'

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";




export default function SearchWithSuggestions(    
{
    searchInput,
    setSearchInput,
    selectedItem,
    setSelectedItem,
    selectedItems,
    setSelectedItems,
    suggestions,
    setSuggestions,
    isLoading,
    setIsLoading,
    fetchSuggestions,
    handleSelectedItem
  }) {
  
  useEffect(() => {
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  return (
    <div className="w-full  mx-auto p-4">
      <div className="relative">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search Food Items"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        {isLoading && (
          <div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-60 overflow-y-auto">
            <div className="text-gray-500 text-sm">Loading suggestions...</div>
          </div>
        )}
        {!isLoading && suggestions.length > 0 && (
          <div className="absolute mt-1 w-full p-1 bg-white shadow-lg rounded-bl rounded-br max-h-60 overflow-y-auto z-50" >
            {suggestions.map((suggestion) => (
            <div className='w-full flex p-1 hover:bg-gray-100 cursor-pointer' onClick={()=>{
                
            handleSelectedItem(suggestion)
  
            }} key={suggestion.name}>
            <img src={suggestion.image} alt="" className='w-[30px] h-[30px] rounded-full mr-2'/>
            <span>{suggestion.name}</span>
                
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
