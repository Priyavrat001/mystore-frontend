import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductQuery } from "../redux/api/productApi";
import SkeletonLoader from "../components/SkeletonLoader";
// import { addToCart } from "../redux/reducer/cartReducer";
// import { CartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    console.log("handle")
  };

  if (isError) toast.error("Not Able Fetch the Products");

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
          <SkeletonLoader width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
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