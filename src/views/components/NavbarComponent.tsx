import { Link } from "react-router-dom";
import { useAppSelector } from "../../data/redux/hooks";
import photos from "../../data/constants/photos";
import PhotoComponent from "./PhotoComponent";

const NavbarComponent = () => {
    const { screen, isAuthenticated } = useAppSelector(state => state.global);
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
            zIndex: 100,
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
                            margin: '2px',
                            width: '48px',
                            height: '48px',
                            minWidth: '48px',
                            boxSizing: 'border-box',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'white';
                            e.currentTarget.style.padding = '2px';
                            e.currentTarget.style.borderWidth = '1px';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.padding = '0px';
                            e.currentTarget.style.borderWidth = '0px';
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
                        ABOUT
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
                        WORK
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
                        CONTACT
                    </Link>
                </div>
            </div>

            {isAuthenticated && (
                <Link
                    to="/createPost"
                    style={{
                        width: '24px',
                        height: '24px',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        margin: '8px',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    }}
                >
                    <PhotoComponent
                        photo={photos.gear}
                    />
                </Link>
            )}
        </div>
    )
}

export default NavbarComponent;
