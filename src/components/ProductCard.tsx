import { FaPlus } from "react-icons/fa";

type ProductProps = {
  productId:string;
  image:string;
  name:string;
  price:number;
  stock:number;
  handler: ()=>void;
}
const server = "fsfsdfsf";

const ProductCard = ({productId, name, image, price, stock, handler}: ProductProps) => {

  return (
    <div className="productcard">
      <img src={image} alt={name} />
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