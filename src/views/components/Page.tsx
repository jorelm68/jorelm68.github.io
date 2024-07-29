interface PageProps {
    children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
    return (
        <div className="container" style={{
            position: 'absolute',
            display: 'flex',
            top: 0,
            left: 0,
            margin: 0,
            padding: 8,
            paddingTop: 48 + 20 + 8,
        }}>
            {children}
        </div>
    )
}