import { z } from "zod";

export const RegisterFormValid = z
  .object({
    name: z
      .string()
      .min(4, "O nome é obrigatório, precisa de pelo menos 4 caracteres"),
    email: z.string().min(1, "O email é obrigatório").email("Forneça o email"),
    password: z
      .string()
      .min(7, "A senha precisa conter pelo menos 7 caracteres")
      .regex(
        /(?=.*?[#?!@$%^&*-])/,
        "É necessário pelo menos um caracter especial"
      )
      .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
      .regex(/[0-9a-zA-Z$*&@#]{8,}/, "É necessário pelo menos um número"),
    confirm: z.string().min(1, "Confirmar a senha"),
  })
  .refine(({ password, confirm }) => confirm === password, {
    message: "As senhas não conferem",
    path: ["confirm"],
  });

export type TRegisterFormValues = z.infer<typeof RegisterFormValid>;
