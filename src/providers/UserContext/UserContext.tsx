import { createContext, useEffect, useState } from "react";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { string } from "zod";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUser {
  email: string;
  name: string;
  id: number;
}

interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserResponse {
  accessToken: string;
  user: IUser;
}

interface IUserContext {
  user: IUser | null;
  userRegister: (
    formData: IUserRegister,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userLogin: (
    formData: IUserLogin,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userLogout: () => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("@USERID: Hamburgueria");
    const token = localStorage.getItem("@TOKEN: Hamburgueria");

    const userAuthLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        navigate("/shop");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("@TOKEN: Hamburgueria");
        localStorage.removeItem("@USERID: Hamburgueria");
      }
    };
    if (token && userId) {
      userAuthLogin();
    }
  }, []);

  const userRegister = async (
    formData: IUserRegister,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const response = await api.post<IUserResponse>("/users", formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (
    formData: IUserLogin,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<IUserResponse>("/login", formData);
      localStorage.setItem("@TOKEN: Hamburgueria", data.accessToken);
      localStorage.setItem(
        "@USERID: Hamburgueria",
        JSON.stringify(data.user.id)
      );
      setUser(data.user);
      navigate("/shop");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN: Hamburgueria");
    localStorage.removeItem("@USERID: Hamburgueria");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, userRegister, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
