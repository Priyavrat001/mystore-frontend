import { useState, useEffect } from "react";
import { VscError } from "react-icons/vsc"
import CartItems from "../components/CartItems";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";
import { addTOCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartRuducer";
import { toast } from "react-hot-toast";
import axios from "axios";
import { key } from "../utils/server";


const Cart = () => {

  const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector((state: {
    cartReducer: CartReducerInitialState
  }) => state.cartReducer);

  const dispatch = useDispatch();

  const [couponeCode, setCouponeCode] = useState("");
  const [IsvalidcouponeCode, setIsvalidCouponeCode] = useState(false);


  const incrementCartHandler = (cartItem: CartItem) => {

    if (cartItem.quantity >= cartItem.stock) return toast.error("Max quantity reached");

    dispatch(addTOCart({ ...cartItem, quantity: cartItem.quantity + 1 }))

    console.log(cartItem)
  };

  const decrementCartHandler = (cartItem: CartItem) => {

    if (cartItem.quantity <= 1) return toast.error("Product quantity can not be less than one");

    dispatch(addTOCart({ ...cartItem, quantity: cartItem.quantity - 1 }))
  };

  const removeHandler = (productId: string) => {

    // if(cartItem.stock < 1) 

    dispatch(removeCartItem(productId));
  };

  useEffect(() => {

    const {token, cancel} = axios.CancelToken.source()

    const timeOutID = setTimeout(() => {

      axios.get(`${key}/api/v1/payment/discount?coupon=${couponeCode}`,{cancelToken:token}).then((res)=>{

        dispatch(discountApplied(res.data.discount));
        console.log(res.data)
        setIsvalidCouponeCode(true)
        dispatch(calculatePrice());
      }).catch(()=>{
        dispatch(discountApplied(0));
        setIsvalidCouponeCode(false);
        dispatch(calculatePrice());
      })
      
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsvalidCouponeCode(false);
    }
  }, [couponeCode])

  useEffect(() => {

    dispatch(calculatePrice());
    
  }, [cartItems])



  return (
    <>
      <div className="cart">
        <main>
          {
            cartItems.length > 0 ? cartItems.map((i, index) => (
              <CartItems incrementCartHandler={incrementCartHandler} dcrementCartHandler={decrementCartHandler} removeHandler={removeHandler} key={index} cartItem={i} />
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

          <input type="text" value={couponeCode} onChange={e => setCouponeCode(e.target.value)} placeholder="Cupon Code" />


          {couponeCode &&
            (IsvalidcouponeCode ? (<span className="green">₹{discount} off using <code>{couponeCode}</code></span>)
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