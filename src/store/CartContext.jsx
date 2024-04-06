import { createContext,useReducer } from "react";

const CartContext=createContext({
 items:[],
 addItem : (item)=>{},
 removeItem : (id)=>{},
 onIncrease:()=>{},
 onDecrease:()=>{},
})
function cartReducer(state,action){
    if(action.type==='ADD_ITEM'){
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id);
        const updatedItems=[...state.items];
        const existingItem=state.items[existingCartItemIndex];
        console.log(existingCartItemIndex)
        if(existingCartItemIndex>-1){
            const updatedItem={
                ...existingItem,
                quantity:existingItem.quantity+1
            };
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        else{
            console.log(existingCartItemIndex)
            updatedItems.push({...action.item,quantity:1});}
        return {...state,items:updatedItems};
    }
    if(action.type==='UPDATE_ITEM'){

    }
    if(action.type==='REMOVE_ITEM'){
        console.log(action.id);
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id);
        console.log(existingCartItemIndex);
        const existingCartItem=state.items[existingCartItemIndex];
        const updatedItems=[...state.items];
        if(existingCartItem.quantity===1){
            console.log("inside slice");
            updatedItems.splice(existingCartItem,1);
            console.log(updatedItems);
        }
        else{
            const updatedItem ={...existingCartItem,quantity:existingCartItem.quantity-1};
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        return {...state,items:updatedItems};
    }
    return state;
}
export function CartContextProvider({children}){
   const [cart,dispatchCartAction]= useReducer(cartReducer,{items:[]});
   const cartContext={
    items:cart.items,
    addItem,
    removeItem,
   };

   function addItem(item){
    dispatchCartAction({type:'ADD_ITEM',item:item});
    }
   function removeItem(id){
    dispatchCartAction({type:'REMOVE_ITEM',id});
   }

//    console.log(cartContext);
  
    return (<CartContext.Provider value={cartContext} >{children}</CartContext.Provider>);
}

export default CartContext;