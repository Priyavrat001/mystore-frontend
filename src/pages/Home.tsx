import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useLatestProductQuery } from "../redux/api/productApi";
// import { addToCart } from "../redux/reducer/cartReducer";
// import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductQuery("");

  // const dispatch = useDispatch();

  const addToCartHandler = () => {
  console.log("handle")
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>

      <main>
        {isLoading ? (
         <Loader/>
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              proudctId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              image={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;