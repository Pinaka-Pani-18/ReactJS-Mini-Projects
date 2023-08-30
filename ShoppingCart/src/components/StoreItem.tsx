import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { UseShoppingCart } from "../context/ShoppingContext";

type StoreItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
const StoreItem = ({ id, name, price, imgUrl }: StoreItemsProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = UseShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height={"225px"}
        style={{
          objectFit: "cover",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex flex-row justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              Add to Cart
            </Button>
          ) : (
            <div className="d-flex flex-column">
              <div
                className="d-flex flex-row align-items-center justify-content-center mb-3 
              "
                style={{
                  gap: ".5rem",
                }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-2">{quantity} </span>
                  <span>in cart</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                className=" align-self-center"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
