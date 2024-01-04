import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

const Home = () => {

const addToCartHandler = ()=>{

}

  return (
    <>
    <div className="home">
      <section>

      </section>
      <h1>
        Leatest Product
        
      <Link to="/search" className="findmore">More</Link>
        
        </h1>

        <main>

        <ProductCard proudctId="dsfsf" name="MackBook" price={500000} image="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/71an9eiBxpL._AC_SR180,120_QL70_.jpg" stock={435} handler={addToCartHandler}/>
          
        </main>



    </div>
    </>
  )
}

export default Home