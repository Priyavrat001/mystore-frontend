import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { key } from "../utils/server";
import { CartItem } from "../types/types";



type CartItemsProps = {
    cartItem: CartItem;
    incrementCartHandler:(cartItem:CartItem)=>void;
    dcrementCartHandler:(cartItem:CartItem)=>void;
    removeHandler:(id:string)=>void;
}


const CartItems = ({cartItem, incrementCartHandler, dcrementCartHandler, removeHandler}: CartItemsProps) => {
  const {photo, productId, name, price, quantity} = cartItem;
  return (
    <>
    <div className="cartItem">
      <img src={`${key}/${photo}`} alt="" />
      <article>

      <Link to={`/product/${productId}`}>
      {name}
      </Link>
      <span>₹{price}</span>
      </article>
      <div>
        <button onClick={()=>dcrementCartHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={()=>incrementCartHandler(cartItem)}>+</button>
      </div>
      <button onClick={()=>removeHandler(productId)}><FaTrash/></button>
    </div>
    </>
  )
}

export default CartItems