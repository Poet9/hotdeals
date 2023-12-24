import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};
const Input = forwardRef<HTMLInputElement, InputProps>(function textInput(
    { type = "text", label, name, id, className, ...props },
    ref
) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            ref={ref}
            className={`px-6 py-2 bg-inherit border-1 my-1 focus:border-grey-500  ${
                className || ""
            }`}
            {...props}
        />
    );
});
export default Input;
