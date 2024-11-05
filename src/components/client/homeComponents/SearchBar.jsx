// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button } from '../../ui/button'

function SearchBar() {
  return (
    <div className='h-[50vh] bg-red-100 flex justify-center items-end'>
    
    <div className='serach-input w-1/2 mb-10 flex'>
    <input type="" name="" value="" className='w-full p-3 rounded-md outline-none'/>
        <Button className="bg-red-400 ml-1 p-6">Search </Button>
    </div>
    </div>
  )
}

export default SearchBar