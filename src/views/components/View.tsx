import { HTMLProps } from "react";
import styles from "../../lib/styles";

interface ViewProps extends HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
}

export default function View({ children, ...rest }: ViewProps) {
    return (
        <div {...rest} style={{
            ...styles.reset,
            ...rest.style,
        }} >
            {children}
        </div>
    )
}