import { HTMLProps, ReactNode } from "react";

interface TextProps extends HTMLProps<HTMLParagraphElement> {
    children?: ReactNode;
}

const Text: React.FC<TextProps> = ({ children, ...rest }) => {
    return (
        <p {...rest} style={{
            margin: 0,
            padding: 0,
            ...rest.style,
        }} >{children}</p>
    );
}

export default Text;