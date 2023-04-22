import { useContext } from "react";
import { UserContext } from "../../providers/UserContext/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { CartProvider } from "../../providers/CartContext/CartContext";

export const ProtectedRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <CartProvider>
      <Outlet />
    </CartProvider>
  ) : (
    <Navigate to="/" />
  );
};
