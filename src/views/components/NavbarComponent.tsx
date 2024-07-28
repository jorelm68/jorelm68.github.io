import { Link } from "react-router-dom";
import { useAppSelector } from "../../data/redux/hooks";
import photos from "../../data/constants/photos";

const NavbarComponent = () => {
    const { screen } = useAppSelector(state => state.global);

    const headshot = photos.headshot;

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
                    <Link to="/" style={{
                        fontSize: 0,
                    }}>
                        <img src={headshot} alt="headshot" style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            border: screen === 'LandingScreen' ? '2px solid white' : '2px solid transparent',
                        }} />
                    </Link>

                    <Link to="/aboutMe" style={{
                        textDecoration: 'none',
                        backgroundColor: screen === 'AboutMeScreen' ? 'white' : 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '24px',
                        padding: '4px 16px',
                        minWidth: 64,
                        width: '15%',
                        fontWeight: 'bold',

                    }}>
                        <p style={{
                            color: screen === 'AboutMeScreen' ? 'black' : 'rgba(255, 255, 255, 0.9)',
                            fontSize: 14,
                            lineHeight: '0px',
                            textAlign: 'center',
                        }}>About Me</p>
                    </Link>

                    <Link to="/myWork" style={{
                        textDecoration: 'none',
                        backgroundColor: screen === 'MyWorkScreen' ? 'white' : 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '24px',
                        padding: '4px 16px',
                        minWidth: 64,
                        width: '15%',
                        fontWeight: 'bold',
                    }}>
                        <p style={{
                            color: screen === 'MyWorkScreen' ? 'black' : 'rgba(255, 255, 255, 0.9)',
                            fontSize: 14,
                            lineHeight: '0px',
                            textAlign: 'center',
                        }}>My Work</p>
                    </Link>

                    <Link to="/contact" style={{
                        textDecoration: 'none',
                        backgroundColor: screen === 'ContactScreen' ? 'white' : 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '24px',
                        padding: '4px 16px',
                        minWidth: 64,
                        width: '15%',
                        fontWeight: 'bold',

                    }}>
                        <p style={{
                            color: screen === 'ContactScreen' ? 'black' : 'rgba(255, 255, 255, 0.9)',
                            fontSize: 14,
                            lineHeight: '0px',
                            textAlign: 'center',
                        }}>Contact</p>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default NavbarComponent;