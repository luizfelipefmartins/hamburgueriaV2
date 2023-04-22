import { createContext, useEffect, useState } from "react";
import { api } from "../../service/api";
import { string } from "zod";

interface CartProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ICartContext {
  CartList: IProduct[];
  handleAddToCart: (CartProd: IProduct) => void;
  addCart: IProduct[];
  total: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
  removeCartProd: (CartProd: IProduct) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filterCart: IProduct[];
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [CartList, setCartList] = useState<IProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addCart, setAddCart] = useState<IProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const total = addCart.reduce((previewValue, value) => {
    return previewValue + value.price;
  }, 0);

  useEffect(() => {
    const cartLoad = async () => {
      const token = localStorage.getItem("@TOKEN: Hamburgueria");
      try {
        const { data } = await api.get<IProduct[]>("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartList(data);
      } catch (error) {
        console.log(error);
      }
    };
    cartLoad();
  }, []);

  const handleAddToCart = (CartProd: IProduct) => {
    const cartShop: IProduct[] = [...addCart, CartProd];
    setAddCart(cartShop);
  };

  const removeCartProd = (Prod: IProduct) => {
    const newCart = addCart.filter((currentProd) => currentProd.id !== Prod.id);
    setAddCart(newCart);
  };

  const filterCart: IProduct[] = CartList.filter(
    (prod: IProduct) =>
      prod.name.toLowerCase().includes(search) ||
      prod.category.toLowerCase().includes(search)
  );

  return (
    <CartContext.Provider
      value={{
        CartList,
        handleAddToCart,
        addCart,
        setAddCart,
        total,
        isOpen,
        setIsOpen,
        removeCartProd,
        search,
        setSearch,
        filterCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
