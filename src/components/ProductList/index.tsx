import { useContext } from "react";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { CartContext, IProduct } from "../../providers/CartContext/CartContext";

const ProductList = () => {
  const { CartList, search, filterCart } = useContext(CartContext);

  const currentProd = search !== "" ? filterCart : CartList;

  return (
    <StyledProductList>
      {currentProd.map((CartProd: IProduct) => (
        <ProductCard key={CartProd.id} CartProd={CartProd} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
