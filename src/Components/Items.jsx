import { useContext } from "react";
import { useState,useEffect } from "react";
import {useData} from "../store/ItemContext";
import Errors from "./Errors";
import useHttp from "./Hooks/useHttp";
import ShopItem from "./ShopItem";
const requestConfig={};
export default function Items(){
    
    const {data:loadedItems,isLoading,error,}=useHttp('https://shoppingappaz-b.onrender.com/items',requestConfig,[]);
    
    
    const {searchQuery,filterQuery,sortQuery}=useData();
    // const {} 
    

    if(isLoading){
        return <p className="error">Items fetching..,</p>
    }
    if(!loadedItems){
        
        return <Errors title="Error Fetching Items" message="unable to fetch items" />
    }
    !loadedItems
    var filteredItems= loadedItems.filter(item=> item.name.toLowerCase().includes(searchQuery.toLowerCase())).filter(item=>item.id.toLowerCase().includes(filterQuery.toLowerCase()));
    if(sortQuery==="PriceL2H"){
        filteredItems=filteredItems.sort((item1,item2)=>parseInt( item1.price)-parseInt(item2.price));
    }
    else if(sortQuery==="PriceH2L"){
        filteredItems=filteredItems.sort((item1,item2)=>parseInt(item2.price)-parseInt( item1.price));
    }
    else if(sortQuery==="AtoZ"){
        filteredItems=filteredItems.sort((item1,item2)=>{
            const nameA = item1.name.toUpperCase(); // Convert names to uppercase for case-insensitive comparison
            const nameB = item2.name.toUpperCase();
            if (nameA < nameB) {
              return -1; // Name A should come before name B
            }
            if (nameA > nameB) {
            return 1; // Name A should come after name B
            }
            return 0;
        });
    }


    if(filteredItems.length===0){
        
        return <Errors title="Items searching is not available" message="Items searching is not available please search for other items" />
    }
    
    console.log(error);
    if(error){
        return <Errors title="Error Fetching Items" message="unable to fetch items"/>
    }   

 
    return (
        <>
        <p>{searchQuery}</p>
    <ul id="items">
        {filteredItems.map(item=><ShopItem key={item.id} item={item}>{item.name}</ShopItem>)}
    </ul>
    </>
    )
}