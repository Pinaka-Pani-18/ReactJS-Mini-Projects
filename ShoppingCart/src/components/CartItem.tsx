import { Button, Stack } from "react-bootstrap";
import stoteItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingContext";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = stoteItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack
      direction="horizontal"
      className="d-flex align-content-center"
      gap={2}
    >
      <img
        src={item?.imgUrl}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover",
        }}
        alt={item?.name}
      />
      <div className="me-auto">
        <div>
          {item?.name}{" "}
          {quantity > 1 && (
            <span
              className="text-muted"
              style={{
                fontSize: ".85rem",
              }}
            >
              x{quantity}
            </span>
          )}
        </div>
        <div
          className="text-muted"
          style={{
            fontSize: ".95rem",
          }}
        >
          {formatCurrency(item?.price)}
        </div>
      </div>
      <div> {formatCurrency(item?.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
