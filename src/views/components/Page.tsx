import { HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export default function Page({ children, ...rest }: PageProps) {
    return (
        <div
            {...rest}
            className="container"
            style={{
                margin: 0,
                display: 'flex',
                position: 'absolute',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                top: 0,
                left: 0,
                overflowY: 'auto', // Enable vertical scrolling
                overflowX: 'hidden', // Disable horizontal scrolling
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                padding: 8,
                paddingTop: 48 + 20 + 8,
                ...rest.style,
            }}
        >
            {children}
        </div>
    );
}
