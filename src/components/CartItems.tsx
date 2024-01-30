import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { key } from "../utils/server";



type CartItemsProps = {
    cartItem: any
}


const CartItems = ({cartItem}: CartItemsProps) => {
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
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button><FaTrash/></button>
    </div>
    </>
  )
}

export default CartItems