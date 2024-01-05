import {useState, ChangeEvent} from "react"
import { BiArrowBack } from "react-icons/bi"

const Shipping = () => {
    const [shippingInfo, setShippingInfo] = useState({
        address:"",
        city:"",
        state:"",
        country:"",
        pinCode:""
    })
    const changeHandler = (e: ChangeEvent<HTMLInputElement>)=>{

    }
  return (
    <>
    <div className="shipping">
        <button><BiArrowBack/></button>
        <form action="">

        </form>
        <h1>Shipping Address</h1>
        <input required type="text"  placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler}/>
        <input required type="text"  placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler}/>
        <input required type="text"  placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler}/>
        <input required type="text"  placeholder="Pincode" name="pincode" value={shippingInfo.pinCode} onChange={changeHandler}/>
        <select name="country" required value={shippingInfo.country} onChange={changeHandler}>
            <option value="">Choose Country</option>
            <option value="india">India</option>

        </select>
    </div>
    </>
  )
}

export default Shipping