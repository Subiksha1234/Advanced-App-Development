import Gifts from "../../assets/hero/Gifts"
import CarouselDefault from "../../components/CarouselDefault"
import Products from "../../components/Products"

const Home = () => {
  return (
    <>
    <div className="bg-slate-300">
      <CarouselDefault />
      <Gifts />
      {/* <Products /> */}
    </div>
    </>
  )
}

export default Home