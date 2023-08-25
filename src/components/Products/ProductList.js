import ProductListItem from "./ProductListItem";
import { memo } from "react";
const ProductList = (props) => {
  return (
    <table className="w-full text-left text-sm h-fit">
      <thead className="bg-gray-100">
        <tr>
          <th className="font-medium p-2" colSpan={3}>
            {props.title}
          </th>
        </tr>
      </thead>
      <tbody>
        {props.products.map(product => (
          <ProductListItem key={product.sku} product={product} type={props.type} onPick={props.onPick}/>
        ))}
      </tbody>
    </table>
  );
};

export default memo(ProductList);
