import Filter from "../../components/filters/Filter";
import SingleProduct from "../../components/singleProduct/SingleProduct";
import { CartState } from "../../contexts/Context";

const Home = () => {
  const {
    state: { productList },
    productState: { byStock, byFastDelivery, byRating, sort, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = productList;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  console.log(productList);
  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformProducts().map((product, index) => (
          <SingleProduct product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
