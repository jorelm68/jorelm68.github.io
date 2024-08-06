import { HTMLAttributes } from "react";
import constants from "../../data/constants/constants";

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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                overflowY: 'auto', // Enable vertical scrolling
                overflowX: 'hidden', // Disable horizontal scrolling
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                ...rest.style,
            }}
        >
            {children}
        </div>
    );
}
