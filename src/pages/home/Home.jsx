import Filter from "../../components/filters/Filter";
import SingleProduct from "../../components/singleProduct/SingleProduct";
import { CartState } from "../../contexts/Context";

const Home = () => {
  const {
    state: { productList },
  } = CartState();

  console.log(productList);
  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {productList.map((product, index) => (
          <SingleProduct product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
