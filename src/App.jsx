import Cart from "./Components/Cart";
import Header from "./Components/Header";
import Meals from "./Components/Items";
import  { UserProgressContextProvider } from "./store/userProgressContext";
import {CartContextProvider} from "./store/CartContext"
import CartCheckout from "./Components/CartCheckout";
import Errors from "./Components/Errors";
import { ItemContextProvider } from "./store/ItemContext";
import Items from "./Components/Items";

function App() {
  return (
    <UserProgressContextProvider>
    <CartContextProvider>
    <ItemContextProvider>
      <Header></Header>
      <Items></Items>
      <Cart></Cart>
      {/* <Errors></Errors> */}
      <CartCheckout></CartCheckout>
      </ItemContextProvider>
    </CartContextProvider>
    </UserProgressContextProvider>
    
  );
}

export default App;
