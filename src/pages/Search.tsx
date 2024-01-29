import { useState } from "react"
import ProductCard from "../components/ProductCard";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi";
import { toast } from "react-hot-toast";
import { CoustomError } from "../types/api-types";
import SkeletonLoader from "../components/SkeletonLoader";

const Search = () => {

  const { data: categoriesResponse, isLoading: loadingCategories, isError, error } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { isLoading: searchLoading, data: searchData, isError:searchIsError, error:searchError } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice
  });

  const addToCartHandler = () => {

  };

  const isNextPage = page > 1;
  const isPrevPage = page < 4;


  if (isError) {
    toast.error((error as CoustomError).data.message)
  }
  if (searchIsError) {
    toast.error((searchError as CoustomError).data.message)
  }


  return (
    <div className="search">
      <aside>
        <h2>Filter</h2>
        <div>
          <h4>Short</h4>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min={100} max={50000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">ALL</option>
            {
              !loadingCategories && categoriesResponse?.category.map((i) => (

                <option value={i} key={i}>{i.toUpperCase()}</option>

              ))
            }
          </select>
        </div>
      </aside>
      <main>
        <h1>Product</h1>
        <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />

        {
          searchLoading ? <SkeletonLoader /> : (
            <div className="search-product-list">
              {
                searchData?.products.map((i) => (
                  <ProductCard key={i._id} productId={i._id} name={i.name} price={i.price} image={i.photo} stock={i.stock} handler={addToCartHandler} />
                ))
              }
            </div>
          )
        }

        {
          searchData && searchData.totalPage > 1 && (
            <article>
              <button disabled={!isPrevPage} onClick={() => setPage(prev => prev - 1)}>Prev</button>
              <span>{page} of {4}</span>
              <button disabled={!isNextPage} onClick={() => setPage(prev => prev + 1)}>Next</button>
            </article>
          )
        }
      </main>
    </div>
  )
}

export default Search