import { FaPlus } from "react-icons/fa";
import { key } from "../utils/server";
// import { server } from "../redux/store";

type ProductProps = {
  productId:string;
  image:string;
  name:string;
  price:number;
  stock:number;
  handler: ()=>void;
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
            handler()
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard