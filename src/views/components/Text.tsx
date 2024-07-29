import { HTMLProps, ReactNode } from "react";

interface TextProps extends HTMLProps<HTMLParagraphElement> {
    children?: ReactNode;
}

const Text: React.FC<TextProps> = ({ children, ...rest }) => {
    return (
        <p {...rest}>{children}</p>
    );
}

export default Text;