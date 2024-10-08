import { HTMLProps, ReactNode } from "react";
import constants from "../../lib/constants";
import styles from "../../lib/styles";

interface TextProps extends HTMLProps<HTMLParagraphElement> {
    children?: ReactNode;
}

const Text: React.FC<TextProps> = ({ children, ...rest }) => {
    return (
        <p {...rest} style={{
            ...styles.reset,
            fontFamily: constants.FONT,
            ...rest.style,
        }} >{children}</p>
    );
}

export default Text;