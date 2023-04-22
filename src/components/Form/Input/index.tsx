import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { FieldError } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

export const Input = forwardRef(
  (
    { label, type, value, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <StyledInputContainer>
          <input type={type} value={value} {...rest} ref={ref} />
          {label ? <label>{label}</label> : null}
        </StyledInputContainer>
        <StyledParagraph fontColor="red">
          {error ? <p>{error.message}</p> : null}
        </StyledParagraph>
      </div>
    );
  }
);

export default Input;
