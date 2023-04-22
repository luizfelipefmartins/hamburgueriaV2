import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import {
  CartContext,
  IProduct,
} from "../../../../providers/CartContext/CartContext";
import { useContext } from "react";

interface ICartProdProps {
  Prod: IProduct;
}

const CartProductCard = ({ Prod }: ICartProdProps) => {
  const { removeCartProd } = useContext(CartContext);

  return (
    <StyledCartProductCard>
      <div className="imageBox">
        <img src={Prod.img} alt={Prod.name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {Prod.name}
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => removeCartProd(Prod)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
