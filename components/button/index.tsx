import { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function btn(
    { type, className, id, children, ...props },
    ref
) {
    return (
        <button id={id} type={type} className={`text-white outline-none ${className}`}>
            {children}
        </button>
    );
});

export default Button;
