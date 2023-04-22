import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext/UserContext";
import {
  RegisterFormValid,
  TRegisterFormValues,
} from "../../../validation/FormValidation";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(RegisterFormValid),
  });

  const { userRegister } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const submit: SubmitHandler<TRegisterFormValues> = (formData) => {
    userRegister(formData, setLoading);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome"
        type="text"
        placeholder="Nome"
        {...register("name")}
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />
      <Input
        label="Confirme sua Senha"
        type="password"
        placeholder="Confirme sua senha"
        {...register("confirm")}
        error={errors.confirm}
      />

      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        type="submit"
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
