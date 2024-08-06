import { Link } from "react-router-dom";
import { useAppSelector } from "../../data/redux/hooks";
import photos from "../../data/constants/photos";
import PhotoComponent from "./PhotoComponent";
import { useDispatch } from "react-redux";
import { setShowEssay, setWidth } from "../../data/redux/global.reducer";
import { useEffect } from "react";
import View from "./View";

const NavbarComponent = () => {
    const { screen, isAuthenticated, width, showEssay } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => dispatch(setWidth(window.innerWidth));
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    const handleToggleShowEssay = () => {
        dispatch(setShowEssay(!showEssay));
    }

    const linkStyle = (active: boolean) => ({
        textDecoration: 'none',
        fontSize: '12px',
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        boxSizing: 'border-box' as const,
        padding: '0px 16px',
        margin: '0px',
        color: active ? 'black' : 'rgba(255, 255, 255, 0.9)',
        backgroundColor: active ? 'white' : 'transparent',
        textAlign: 'center' as const,
        transition: 'all 0.3s ease', // Smooth transition
        boxShadow: active ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none', // Add shadow when active
        fontFamily: 'Nunito',
    });

    return (
        <div className="container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}>
            <div className="options" style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                maxHeight: 48,
            }}>
                <Link
                    to="/"
                    style={{
                        width: '48px',
                        height: '48px',
                        minWidth: '48px',
                        boxSizing: 'border-box',
                    }}
                >
                    <img
                        src={photos.initialsTransparent}
                        alt="headshot"
                        style={{
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s ease', // Smooth transition
                        }}
                    />
                </Link>

                <Link
                    to="/work"
                    style={linkStyle(screen === 'WorkScreen')}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'none';
                    }}
                >
                    WORK
                </Link>

                <Link
                    to="/about"
                    style={linkStyle(screen === 'AboutScreen')}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'none';
                    }}
                >
                    ABOUT
                </Link>

                <Link
                    to="/contact"
                    style={linkStyle(screen === 'ContactScreen')}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'none';
                    }}
                >
                    CONTACT
                </Link>

            </div>

            {width < 800 && screen === 'PostScreen' && (
                <button onClick={handleToggleShowEssay} style={{
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 8,
                    border: 'none',
                    color: 'black',
                    cursor: 'pointer',
                }}>
                    {showEssay ? 'Show Media 📚' : 'Show Essay 📝'}
                </button>
            )}

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
