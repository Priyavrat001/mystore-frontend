import { FaPlus } from "react-icons/fa";
import { key } from "../utils/server";
import { CartItem } from "../types/types";
// import { server } from "../redux/store";

type ProductProps = {
  productId:string;
  image:string;
  name:string;
  price:number;
  stock:number;
  handler: (cartItem: CartItem) => void
};


const ProductCard = ({productId, name, image, price, stock, handler}: ProductProps) => {

  return (
    <div className="productcard">
      <img src={`${key}/${image}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
          onClick={() =>
            handler({
              productId,
              photo:image,
              name,
              price,
              stock,
              quantity:1
            })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard