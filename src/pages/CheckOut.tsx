import { Elements, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from '@stripe/react-stripe-js';
import { useState, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router";
import { NewOrdertRequest } from "../types/api-types";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../redux/store";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { responseToast } from "../utils/features";
import { resetCart } from "../redux/reducer/cartRuducer";


const stripePromise = loadStripe('pk_test_51OaIarSHqJlERpUxJ6WAwlJTGmyKh1WzUae0VfUE1I7FwDjLeEDCmx0lSMCzjIBkRyxJh2U7h5e1zcF4W8Mcc4tE00ub86qiIm');


const CheckoutForm = () => {

    const stripe = useStripe();

    const elements = useElements();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [newOrder] = useNewOrderMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;
        setIsProcessing(true);

        const orderData: NewOrdertRequest = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: user?._id!,
          };

        const { paymentIntent, error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: window.location.origin }, redirect: "if_required" });

        if (error) {
            setIsProcessing(false);
            return toast.error(error.message || "Something Went Wrong");
        };

        if (paymentIntent.status === "succeeded") {
            const res = await newOrder(orderData);
            dispatch(resetCart());
            responseToast(res, navigate, "/orders");
          }
          setIsProcessing(false);
        };
    return (
        <form onSubmit={handleSubmit} className="checkout-container">
            <PaymentElement />
            <button type="submit" disabled={isProcessing}>{isProcessing ? "Processing..." : "Pay"}</button>
        </form>
    );
};

const CheckOut = () => {

    const location = useLocation();

    const clientSecret: string | undefined = location.state;
    if(!clientSecret) return <Navigate to={"/shipping"}/>


    const options = {
        // passing the client secret obtained from the server
        clientSecret: "pi_3OfMBHSHqJlERpUx0FeKwP4R_secret_QrLcQTrup4hy3JqlkHnZBJ6o4",
    };
    return (
        <>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </>
    )
}

export default CheckOut