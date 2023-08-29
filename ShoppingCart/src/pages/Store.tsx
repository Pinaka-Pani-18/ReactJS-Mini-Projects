import { Col, Row } from "react-bootstrap";
import stoteItems from "../data/items.json";
import StoreItem from "../components/StoreItem";
const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={3} className="g-3">
        {stoteItems.map((item) => {
          return <Col key={item.id}>{<StoreItem {...item} />}</Col>;
        })}
      </Row>
    </>
  );
};

export default Store;
