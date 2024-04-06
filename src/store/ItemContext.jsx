// DataContext.js
import React, { createContext, useState, useContext } from 'react';

const ItemContext = createContext();

export const useData = () => useContext(ItemContext);

export const ItemContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setfilterQuery] = useState('');
 const [sortQuery,setsortQuery]=useState(''); 
  const setSearch = (query) => {
    console.log(query);
    setSearchQuery(query);
  };
  const setfilter = (query) => {
    console.log(query);
    setfilterQuery(query);
  };
  const setSort = (query) => {
    console.log(query);
    setsortQuery(query);
  };
  return (
    <ItemContext.Provider value={{  searchQuery,filterQuery,sortQuery, setSearch,setfilter,setSort}}>
      {children}
    </ItemContext.Provider>
  );
};
export default ItemContext;
