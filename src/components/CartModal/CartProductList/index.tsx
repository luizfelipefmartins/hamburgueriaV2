import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import {
  CartContext,
  IProduct,
} from "../../../providers/CartContext/CartContext";

const CartProductList = () => {
  const { addCart, setAddCart, total } = useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {addCart.map((Prod: IProduct) => (
          <CartProductCard key={Prod.id} Prod={Prod} />
        ))}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">
          R$ {total.toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={() => setAddCart([])}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
