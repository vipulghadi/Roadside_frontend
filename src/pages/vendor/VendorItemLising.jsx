import React, { useEffect, useState } from 'react'

import SearchWithSuggestions from '@/components/common/SearchWithSuggestions'
import { VendorAPI } from '@/api/vendorAPI';
import { getUserInfo } from '@/utils/localStorageData';
import toast from 'react-hot-toast';
import {DeleteIcon} from 'lucide-react'

export default function VendorItemListing() {
const [searchInput,setSearchInput]=useState("")
const [selectedItem,setSelectedItem]=useState("")
const [selectedItems,setSelectedItems]=useState([])
const [suggestions,setSuggestions]=useState([])
const [isLoading, setIsLoading] = useState(false);

useEffect(()=>{
    VendorAPI.getVendorFoodItems().then((resp)=>{
        setSelectedItems(resp.data);
    })
},[])


const fetchSuggestions = async () => {
    if (searchInput.length > 0) {
      setIsLoading(true);
      VendorAPI.getTop8FoodItemSuggestions(searchInput).then((resp)=>{
          setSelectedItem(null);
          if (resp.data){
            setSuggestions(resp.data);
          }          
         
      }).catch((error)=>{
          console.log(error);
          setSuggestions([])
          setSearchInput("");

      }).finally(()=>{
          setIsLoading(false);
        
      })
      
    } else {
      setSuggestions([]);
    }
  };

const handleSelectedItem= async(item)=>{
    console.log("selected_items",selectedItems);
    console.log("current_item",item);
    
    
    const exists = selectedItems.some(existingItem => existingItem.image_id == item.id);
    
    if (exists){
        setSelectedItem("")
        setSuggestions([])
        setSearchInput("")
        return
    }

    VendorAPI.addVendorFoodItem({
        "food_item":item.id
    }).
    then((resp)=>{
        toast.success("Item added successfully")
        setSelectedItems([...selectedItems, resp.data])
        setSelectedItem("")
        setSuggestions([])
        setSearchInput("")
    }).finally(()=>{
        setSelectedItem("")
        setSuggestions([])
        setSearchInput("")
    })
}
const handleDeleteItem=async(item)=>{
    VendorAPI.deleteVendorFoodItem(item.id).
    then((resp)=>{
        toast.success("Item deleted successfully")
        setSelectedItems(selectedItems.filter((i)=>i.id!==item.id))
    }).finally(()=>{
        setSelectedItem("")
        setSuggestions([])
        setSearchInput("")
    })

}
  return (
    <div className="p-6 w-full">
    <SearchWithSuggestions 
    searchInput={searchInput}
    setSearchInput={setSearchInput}
    selectedItem={selectedItem}
    setSelectedItem={setSelectedItem}
    selectedItems={selectedItems}
    setSelectedItems={setSelectedItems}
    suggestions={suggestions}
    setSuggestions={setSuggestions}
    isLoading={isLoading}
    setIsLoading={setIsLoading}
    fetchSuggestions={fetchSuggestions}
    handleSelectedItem={handleSelectedItem}
  />
  
      <h1 className="text-3xl font-bold mb-6">Food Items</h1>

      
    <div className='w-full p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4'>
    {selectedItems && selectedItems.map((item) => (
        <div key={item.id} className="flex flex-col items-center justify-center p-3 w-[100px] border mr-2 relative">
        <span className='absolute top-0 right-0  cursor-pointer' onClick={()=>{
            handleDeleteItem(item)
        }}><DeleteIcon/></span>
          <img src={item.image} alt="" className="object-fill w-[70px] h-[70px] rounded-full" />
          <h1 className="font-semibold text-[12px]">{item.name}</h1>
        </div>
      ))}
      
    

    </div>
    </div>

  )
}