import { useContext, useState } from "react";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { UserContext } from "../../../providers/UserContext/UserContext";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  LoginValidation,
  TLoginFormValues,
} from "../../../validation/LoginValidation";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(LoginValidation),
  });

  const submit: SubmitHandler<TLoginFormValues> = (formData) => {
    userLogin(formData, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label="Email"
        type="text"
        placeholder="Email"
        {...register("email")}
        error={errors.email}
        disabled={loading}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
        disabled={loading}
      />
      <StyledButton
        $buttonSize="default"
        $buttonStyle="green"
        type="submit"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
