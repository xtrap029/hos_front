import Button from "../../components/ui/Button";

const ProductListItem = (props) => {
  const stripedClass = "even:bg-gray-100";

  if (
    props.type === "unpicked" &&
    props.product.qty_total === props.product.qty_picked
  ) {
    return;
  } else if (props.type === "picked" && props.product.qty_picked === 0) {
    return;
  }

  return (
    <tr className={stripedClass}>
      <td className="p-2">
        <div className="flex gap-4">
          <div className="flex-none w-[50px]">
            <img src={props.product.image} alt="" className="rounded-lg" />
          </div>
          <div className="flex-1">
            {props.product.name} <br />({props.product.sku})
          </div>
        </div>
      </td>
      <td className="p-2">
        <div className="lg:flex" role="group">
          {props.type === "unpicked" && (
            <>
              <Button
                variant="sub"
                size="sm"
                className="m-1 w-full lg:w-auto"
                onClick={() => props.onPick(props.product.sku, 1)}
              >
                Pick
              </Button>
              <Button
                variant="sub"
                size="sm"
                className="m-1 w-full lg:w-auto whitespace-nowrap"
                onClick={() => props.onPick(props.product.sku)}
              >
                Pick All
              </Button>
            </>
          )}
          <div className="flex-1 text-end font-semibold align-middle p-2">
            {props.type === "unpicked" &&
              props.product.qty_total - props.product.qty_picked}
            {props.type === "picked" && props.product.qty_picked}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ProductListItem;
