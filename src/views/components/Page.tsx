import { HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export default function Page({ children, ...rest }: PageProps) {
    return (
        <div {...rest} className="container" style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            margin: 0,
            padding: 8,
            paddingTop: 48 + 20 + 8,
            ...rest.style,
        }}>
            {children}
        </div>
    )
}