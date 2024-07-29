import { Link } from "react-router-dom";
import { useAppSelector } from "../../data/redux/hooks";
import photos from "../../data/constants/photos";

const NavbarComponent = () => {
    const { screen } = useAppSelector(state => state.global);
    const headshot = photos.headshot;

    const linkStyle = (active: boolean) => ({
        textDecoration: 'none',
        backgroundColor: active ? 'white' : 'rgba(0, 0, 0, 0.5)',
        borderRadius: '24px',
        padding: '8px 16px',
        minWidth: 64,
        width: '15%',
        fontWeight: 'bold',
        color: active ? 'black' : 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        textAlign: 'center' as const,
        transition: 'all 0.3s ease', // Smooth transition
        boxShadow: active ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none', // Add shadow when active
    });

    return (
        <div className="container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1,
            padding: '8px 0',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div className="options" style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '50%',
                }}>
                    <Link
                        to="/"
                        style={{
                            fontSize: 0,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'white';
                            e.currentTarget.style.width = '48px';
                            e.currentTarget.style.height = '48px';
                            e.currentTarget.style.margin = '0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.width = '44px';
                            e.currentTarget.style.height = '44px';
                            e.currentTarget.style.margin = '2px';
                        }}
                    >
                        <img
                            src={headshot}
                            alt="headshot"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 100,
                                border: screen === 'LandingScreen' ? '2px solid white' : '2px solid transparent',
                                transition: 'border-color 0.3s ease', // Smooth transition
                            }}
                        />
                    </Link>

                    <Link
                        to="/aboutMe"
                        style={linkStyle(screen === 'AboutMeScreen')}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.fontSize = '16px';
                            e.currentTarget.style.backgroundColor = screen === 'AboutMeScreen' ? 'white' : 'transparent';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.fontSize = '14px';
                            e.currentTarget.style.backgroundColor = screen === 'AboutMeScreen' ? 'white' : 'rgba(0, 0, 0, 0.5)';
                        }}
                    >
                        About Me
                    </Link>

                    <Link
                        to="/myWork"
                        style={linkStyle(screen === 'MyWorkScreen')}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.fontSize = '16px';
                            e.currentTarget.style.backgroundColor = screen === 'MyWorkScreen' ? 'white' : 'transparent';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.fontSize = '14px';
                            e.currentTarget.style.backgroundColor = screen === 'MyWorkScreen' ? 'white' : 'rgba(0, 0, 0, 0.5)';
                        }}
                    >
                        My Work
                    </Link>

                    <Link
                        to="/contact"
                        style={linkStyle(screen === 'ContactScreen')}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.fontSize = '16px';
                            e.currentTarget.style.backgroundColor = screen === 'ContactScreen' ? 'white' : 'transparent';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.fontSize = '14px';
                            e.currentTarget.style.backgroundColor = screen === 'ContactScreen' ? 'white' : 'rgba(0, 0, 0, 0.5)';
                        }}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent;
