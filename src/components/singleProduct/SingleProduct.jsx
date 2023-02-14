import { Button, Card } from "react-bootstrap";
import { CartState } from "../../contexts/Context";
import Rating from "../rating/Rating";

const SingleProduct = (props) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const { product, index } = props;
  return (
    <div key={index} className="products">
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle>
            <span>₹ {product.price.split(".")[0]}</span>
            {product.fastDelivery ? (
              <div>FastDelivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>
          {product.inStock ? (
            cart.some((p) => p.id === product.id) ? (
              <Button
                variant="danger"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: product,
                  });
                }}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  });
                }}
              >
                Add to Cart
              </Button>
            )
          ) : (
            <Button variant="warning" disabled>
              Out of Stock
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
