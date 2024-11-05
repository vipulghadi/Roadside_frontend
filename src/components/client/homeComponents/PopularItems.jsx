/* eslint-disable no-unused-vars */
import React from 'react';

const foodItems = [
    {
      itemName: "Burger",
      itemImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      itemName: "Pizza",
      itemImg: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        itemName: "Burger",
        itemImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        itemName: "Pizza",
        itemImg: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        itemName: "Burger",
        itemImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        itemName: "Pizza",
        itemImg: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        itemName: "Pizza",
        itemImg: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        itemName: "Burger",
        itemImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        itemName: "Pizza",
        itemImg: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },

  ];

  function PopularItems() {
    return (
      <div className="mt-5 mx-3 p-2 flex flex-col ">
        <p className="text-[20px] mb-3 font-semibold">What's on your mind?</p>
        <div className="food-items w-full flex overflow-x-auto space-x-4">
          {foodItems.map((item, index) => (
            <div
              key={index}
              className="mr-4 flex  flex-col w-[200px] items-center justify-center"
            >
              <img
                src={item.itemImg}
                alt={item.itemName}
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
              <span>{item.itemName}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default PopularItems;