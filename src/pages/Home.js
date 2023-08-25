import { useState, useEffect, useCallback } from "react";
import { useOrdersData } from "../hooks/useOrdersData";
import { useOrderSubmit } from "../hooks/useOrderSubmit";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Input from "../components/ui/Input";
import InputLabel from "../components/ui/InputLabel";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import Progress from "../components/ui/Progress";
import ProductList from "../components/Products/ProductList";

const initialOrderStatement = {
  default: "No Order Loaded.",
  notFound: "Order Not Found.",
};

const initialStatusCompleted = "Completed";

const initialOrderProgress = {
  progressPicked: 0,
  progressTotal: 0,
  progress: 0,
};

const Home = () => {
  const [orderNo, setOrderNo] = useState("");
  const [orderProgress, setOrderProgress] = useState(initialOrderProgress);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  const [skuNo, setSkuNo] = useState("");
  const [skuIsError, setSkuIsError] = useState(false);

  const [toastStatement, setToastStatement] = useState("");
  const [orderStatement, setOrderStatement] = useState(
    initialOrderStatement.default
  );

  const { data: orderData, refetch: orderDataRefetch } = useOrdersData();
  const orderSubmit = useOrderSubmit(order);

  // If first load, assign localStorage orders to orders, else, load orderData hook
  useEffect(() => {
    const localOrders = localStorage.getItem("orders");
    if (localOrders !== null) {
      setOrders(JSON.parse(localOrders));
    } else {
      orderDataRefetch();
    }
  }, []);

  // If orderData hook has beed loaded, save to localStorage
  useEffect(() => {
    if (orderData !== undefined) {
      setOrders(orderData);
      localStorage.setItem("orders", JSON.stringify(orderData));
    }
  }, [orderData]);

  // If orders has been updated, save to localStorage
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  // If order submission succeeded, show toast, update orders and reset
  useEffect(() => {
    if (orderSubmit.isSuccess && orderSubmit.data) {
      setToastStatement(orderSubmit.data.data.message);
      setOrders((prev) =>
        prev.map((prevOrder) => {
          if (prevOrder.id === order.id) {
            return order;
          } else {
            return prevOrder;
          }
        })
      );
      setOrder(null);
      setOrderNo("");
    } else {
      setToastStatement("");
    }
  }, [orderSubmit.isSuccess]);

  // If order was changed, recalculate progress
  useEffect(() => {
    if (order !== null) {
        calculateProgress(order.products)
    }
  }, [order])

  // Handles order loading based on orders list
  const handleLoad = (e) => {
    e.preventDefault();

    if (orderNo !== "") {
      setOrder(() => {
        const filteredOrder = orders.filter((item) => item.id === orderNo);

        if (filteredOrder.length === 0) {
          setOrderStatement(initialOrderStatement.notFound);
          return null;
        }

        return filteredOrder[0];
      });
    } else {
      setOrderStatement(initialOrderStatement.default);
    }
  };

  // Handles order item picking for both single and all
  const handlePick = useCallback(
    (sku, quantity = null) => {
      const pickedProduct = order.products.filter(
        (item) => item.sku === sku
      )[0];

      if (pickedProduct !== undefined) {
        if (pickedProduct.qty_total > pickedProduct.qty_picked) {
          if (quantity !== null) {
            pickedProduct.qty_picked++;
          } else {
            pickedProduct.qty_picked = pickedProduct.qty_total;
          }
        }

        setOrder((prev) => ({
          ...prev,
          products: order.products.map(
            (product) =>
              (pickedProduct.sku === product.sku && pickedProduct) || product
          ),
        }));

        localStorage.setItem("orders", JSON.stringify(orders));
      } else if (skuNo !== "") {
        setSkuIsError(true);
      }
    },
    [order?.products, orders, skuNo]
  );

  // Handles order submission, setting to completed and sending to submit api
  const handleSubmit = () => {
    setOrder((prev) => ({
      ...prev,
      status: initialStatusCompleted,
    }));

    orderSubmit.mutate();
  };

  // Returns order item's progress detail
  const calculateProgress = (qty) => {
    setOrderProgress({
      progressPicked: calculateSum(qty, "qty_picked"),
      progressTotal: calculateSum(qty, "qty_total"),
      progress: Math.trunc(
        (calculateSum(qty, "qty_picked") / calculateSum(qty, "qty_total")) * 100
      ),
    });
  };

  // Returns sum of array's specific property
  const calculateSum = (array, property) => {
    const total = array.reduce((accumulator, object) => {
      return accumulator + object[property];
    }, 0);

    return total;
  };

  return (
    <>
      {toastStatement !== "" && <Toast>{toastStatement}</Toast>}
      <Title className="text-center">House of Supplements</Title>
      <form className="flex gap-4" onSubmit={handleLoad}>
        <Input
          placeholder="Order Number"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
        />
        <Button type="submit">Load</Button>
      </form>
      {order && (
        <Card>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              Order Status:
              <span className="font-semibold ml-2">{order.status}</span>
              <span className="float-right">
                {orderProgress.progressPicked}/
                {orderProgress.progressTotal}
              </span>
              {
                <Progress
                  innerVariant={
                    orderProgress.progress === 100
                      ? "success"
                      : "default"
                  }
                  style={{
                    width: `${orderProgress.progress}%`,
                  }}
                >
                  {orderProgress.progress}%
                </Progress>
              }
            </div>
            <div className="flex gap-4">
              <div className="relative w-full">
                <Input
                  placeholder="Product SKU"
                  status={skuIsError && "error"}
                  value={skuNo}
                  onChange={(e) => {
                    setSkuNo(e.target.value);
                    setSkuIsError(false);
                  }}
                />
                {skuIsError && (
                  <InputLabel variant="error">Product Not Found.</InputLabel>
                )}
              </div>
              <Button variant="sub" onClick={() => handlePick(skuNo, 1)}>
                Pick
              </Button>
            </div>
            <ProductList
              products={order.products}
              type="unpicked"
              title="Unpicked Items"
              onPick={handlePick}
            />
            <ProductList
              products={order.products}
              type="picked"
              title="Picked Items"
            />
          </div>
          {orderProgress.progress === 100 && (
            <div className="text-end mt-5">
              {!orderSubmit.isLoading &&
                order.status !== initialStatusCompleted && (
                  <Button
                    variant="success"
                    className="w-full lg:w-auto"
                    onClick={() => handleSubmit()}
                  >
                    Submit Order
                  </Button>
                )}
              {orderSubmit.isLoading && (
                <Button
                  variant="default"
                  className="w-full lg:w-auto animate-pulse"
                  disabled
                >
                  Submitting...
                </Button>
              )}
            </div>
          )}
        </Card>
      )}
      {!order && <Card className="text-center">{orderStatement}</Card>}
    </>
  );
};

export default Home;

// unit test
// git/instructions
