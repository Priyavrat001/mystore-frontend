import { useState } from "react"
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = ()=>{

  };

  const isNextPage = page > 1;
  const isPrevPage = page < 4;
  

  return (
    <div className="search">
      <aside>
        <h2>Filter</h2>
        <div>
          <h4>Short</h4>
          <select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice||""}</h4>
        <input type="range" min={100} max={50000} value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}/>
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="">Default</option>
            <option value="">Laptop</option>
            <option value="">Camera</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Product</h1>
        <input type="text" placeholder="Search by name..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div className="search-product-list">
          <ProductCard proudctId="dsfsf" name="MackBook" price={500000} image="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71an9eiBxpL._AC_SR180,120_QL70_.jpg" stock={435} handler={addToCartHandler}/>
        </div>
        <article>
          <button disabled={!isPrevPage} onClick={()=>setPage(prev=>prev - 1)}>Prev</button>
          <span>{page} of {4}</span>
          <button disabled={!isNextPage} onClick={()=>setPage(prev=>prev + 1)}>Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search