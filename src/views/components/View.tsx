import { HTMLProps } from "react";

interface ViewProps extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

export default function View({ children, ...rest }: ViewProps) {
    return (
        <div {...rest}>
            {children}
        </div>
    )
}