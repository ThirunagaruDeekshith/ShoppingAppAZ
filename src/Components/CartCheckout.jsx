import { useContext } from "react"
import CartContext from "../store/CartContext"
import UserProgressContext from "../store/userProgressContext";
import Button from "./UI/Button";
import Modal from "./UI/Modal"
import Input from "./UI/Input";
import { useState } from "react";
export default function CartCheckout(){
   const cartCtx= useContext(CartContext);
   const userProgressCtx=useContext(UserProgressContext);
   const cartTotal=cartCtx.items.reduce((totalPrice,item)=>totalPrice+item.quantity*item.price,0);
   const [Submit,setSubmit]=useState(false);
   function handleClose(){
    userProgressCtx.hideCheckout();
    setSubmit(false);
   }
   function handleSubmit(event){
    event.preventDefault();
    const fd= new FormData(event.target);
    const customerData=Object.fromEntries(fd.entries());
    console.log(customerData);

    fetch('https://shoppingappaz-b.onrender.com/orders',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order:{
                items:cartCtx.items,
                customer:customerData,
            }
        })
    });

    setSubmit(true);



   }
    return <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
        
            
        <form onSubmit={handleSubmit}>
            {!Submit 
            &&
            <>
            <h2>Cart Check Out</h2>
            <p>Total Amount : ${cartTotal}</p>
            <Input label="Full-name" type="text" id="name" />
            <Input label="E-Mail Address" type="email" id="email" />
            <Input label="Address" type="text" id="address"/>
            <div className="control-row">
            <Input label="Postal Code" type="text" id="postal-code"/>
            <Input label="City" type="text" id="city"/>
            <Input label="Phone number" type="text" id="phone_number"/>
            </div>
            </>
            }
            {Submit &&
            <p>Order Submitted Successfully, will get confirmation to your number</p>
            }
            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                {!Submit &&<Button >Submit Order</Button>}
            </p>
        </form>
        

    </Modal>
}