import { useState, useEffect } from "react";
import { VscError } from "react-icons/vsc"
import CartItems from "../components/CartItems";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";


const Cart = () => {

const {cartItems, subtotal, tax, total, shippingCharges, discount} = useSelector((state:{
  cartReducer:CartReducerInitialState
})=>state.cartReducer);

  const [cuponCode, setCuponCode] = useState("");
  const [IsvalidcuponCode, setIsvalidCuponCode] = useState(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsvalidCuponCode(true);
      else setIsvalidCuponCode(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      setIsvalidCuponCode(false);
    }
  }, [cuponCode])


  return (
    <>
      <div className="cart">
        <main>
          {
         cartItems.length>0 ?    cartItems.map((i, index) => (
          <CartItems key={index} cartItem={i} />
        )) : <h1>No items added</h1>
          }

        </main>
        <aside>

          <p>Subtotal : ₹{subtotal}</p>
          <p>Shiping Charges : ₹{shippingCharges}</p>
          <p>tax : ₹{tax}</p>
          <p>
            Discount : <em>
              ₹{discount}
            </em>

          </p>
          <p><b>Total: ₹{total}</b></p>

          <input type="text" value={cuponCode} onChange={e => setCuponCode(e.target.value)} placeholder="Cupon Code" />


          {cuponCode &&
            (IsvalidcuponCode ? (<span className="green">₹{discount} off using <code>{cuponCode}</code></span>)
              : (<span className="red">Invlaid cupone <VscError /></span>))
          }

          {
            cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
          }
        </aside>
      </div>
    </>
  )
}

export default Cart