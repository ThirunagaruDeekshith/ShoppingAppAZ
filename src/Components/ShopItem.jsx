import { useContext } from "react";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formating";
export default function ShopItem({item}) {
    const cartCtx =useContext(CartContext);
    function handleAddItemToCart(){
        cartCtx.addItem(item);
    }
    return <li className="item">
        <article>
            <img src={`./${item.image}`} alt={item.name}/>
            <div>
                <h3>{item.name}</h3>
                <p className="item-price">{currencyFormatter.format(item.price)}</p>
                <p className="item-description">{item.description}</p>
            </div>
            <p className="item-actions">
                <Button onClick={handleAddItemToCart}>Add to Cart</Button>
            </p>
        </article>
    </li>
}