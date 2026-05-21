import { HTMLAttributes } from "react";
import constants from "../../../constants";
import styles from "../../../styles";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export default function Page({ children, ...rest }: PageProps) {
    return (
        <div
            {...rest}
            className="container"
            style={{
                zIndex: constants.Z_MIDDLE,
                ...styles.reset,
                ...styles.absolute,
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarWidth: 'none',
                ...rest.style,
            }}
        >
            {children}
        </div>
    );
}
