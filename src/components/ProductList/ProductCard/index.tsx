import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import {
  CartContext,
  IProduct,
} from "../../../providers/CartContext/CartContext";
import { useContext } from "react";

interface IProductCardProps {
  CartProd: IProduct;
}

const ProductCard = ({ CartProd }: IProductCardProps) => {
  const { handleAddToCart } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={CartProd.img} alt={CartProd.name} />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {CartProd.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {CartProd.category}
        </StyledParagraph>
        <StyledParagraph className="price">R$ {CartProd.price}</StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => handleAddToCart(CartProd)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
