import { useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
// import logoImg from "ShopAZLogo.jpg";
import CartContext from "../store/CartContext";
import ItemContext from "../store/ItemContext";
import UserProgressContext from "../store/userProgressContext";
import Button from "./UI/Button";
import Input from "./UI/Input";
import { useData } from "../store/ItemContext";
export default function Header(){
    const { setSearch ,setfilter,setSort} = useData();
    const searchItem=useRef('');
    const cartCtx=useContext(CartContext);
    // const ItemCtx=useContext(ItemContext);
const userProgressCtx=useContext(UserProgressContext);
    const totalCartItems=cartCtx.items.reduce((totalNumberOfItems,item)=>{
        return totalNumberOfItems+item.quantity;
    },0);
    function handleShowCart(){
        userProgressCtx.showCart();
        console.log(userProgressCtx.progress)
    }
    function handleSearch(){
            console.log(searchItem.current.value);
            setSearch(searchItem.current.value);
    }
    function handleClear(){
        console.log(searchItem.current.value);
        if(!(searchItem.current.value==null || searchItem.current.value=='') )
        setSearch('');
        searchItem.current.value='';
}
    function handleFilterChange(option){
        console.log(option);
        setfilter(option);
    }
    function handleSortChange(option){
        console.log(option);
        setSort(option);
    }
    return <header id="main-header">
        <div id="title" >
            <img src={`./logo.jpg`} alt="logo"></img>
            <h1>ShopAZ</h1>
        </div>
        <nav>
            <input type={'search'} placeholder='search items' ref={searchItem} ></input>
            <Button textOnly onClick={handleSearch}>Search</Button>
            <Button textOnly onClick={handleClear} >Clear</Button>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            <div>
            <label htmlFor='All' >All</label>
            <input type='radio' name='filter' id='All' defaultChecked value=''
            onChange={() => handleFilterChange('')}
            />
            <label htmlFor='men'>Men</label>
            <input type='radio' name='filter' id='men'   value='m'
            onChange={() => handleFilterChange('m')}/>
            <label htmlFor='women'>Women</label>
            <input type='radio' name='filter' id='women'  value='w'
            onChange={() => handleFilterChange('w')}/>
            <label htmlFor='kid'>kids</label>
            <input type='radio' name='filter' id='kid'  value='k'
            onChange={() => handleFilterChange('k')}/>
            </div>
            <div>
            <label htmlFor='All' >All</label>
            <input type='radio' name='sort' id='All' defaultChecked value=''
            onChange={() => handleSortChange('')}
            />
            <label htmlFor='AtoZ'>AtoZ</label>
            <input type='radio' name='sort' id='AtoZ'   value='AtoZ'
            onChange={() => handleSortChange('AtoZ')}/>
            <label htmlFor='PriceL2H'>Price:Low to High</label>
            <input type='radio' name='sort' id='PriceL2H'  value='PriceL2H'
            onChange={() => handleSortChange('PriceL2H')}/>
            <label htmlFor='PriceH2L'>Price:High to Low</label>
            <input type='radio' name='sort' id='PriceH2L'  value='PriceH2L'
            onChange={() => handleSortChange('PriceH2L')}/>
            </div>
            
        </nav>
    </header>
} 