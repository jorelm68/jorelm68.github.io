import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import files from "../../lib/files";
import PhotoComponent from "./PhotoComponent";
import { useDispatch } from "react-redux";
import { setShowEssay, setWidth } from "../../redux/global.reducer";
import { useEffect } from "react";
import constants from "../../lib/constants";
import styles from "../../lib/styles";

const HORIZONTAL_PADDING = '16px';
const IMAGE_SIZE = '48px';
const TINTED = 'rgba(0, 0, 0, 0.75)';
const SETTING_SIZE = '24px';

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

    const handleMouseEnter = (e: any) => {
        e.currentTarget.style.textDecoration = 'underline';
    }
    const handleMouseLeave = (e: any) => {
        e.currentTarget.style.textDecoration = 'none';
    }

    const linkStyle = (active: boolean) => ({
        ...styles.reset,
        fontSize: constants.NAVBAR_FONT_SIZE,
        height: constants.HEADER_HEIGHT,
        ...styles.center,
        fontWeight: 'bold',
        boxSizing: 'border-box' as const,
        padding: `0px ${HORIZONTAL_PADDING}`,
        margin: '0px',
        color: active ? styles.colors.black : styles.colors.offWhite,
        backgroundColor: active ? styles.colors.white : 'transparent',
        textAlign: 'center' as const,
        transition: `all ${constants.QUICK_TRANSITION}s ease`,
        boxShadow: active ? `0 4px 8px ${styles.colors.shadow}` : 'none',
        fontFamily: constants.FONT,
    });

    return (
        <div className="container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: constants.Z_FAR_FRONT,
            backgroundColor: TINTED,
        }}>
            <div className="options" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                maxHeight: IMAGE_SIZE,
            }}>
                <Link
                    to="/"
                    style={{
                        width: IMAGE_SIZE,
                        height: IMAGE_SIZE,
                        minWidth: IMAGE_SIZE,
                        boxSizing: 'border-box',
                    }}
                >
                    <img
                        src={files.initialsTransparent}
                        alt="headshot"
                        style={{
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            transition: `border-color ${constants.QUICK_TRANSITION}s ease`,
                        }}
                    />
                </Link>

                <Link
                    to="/work"
                    style={linkStyle(screen === 'WorkScreen')}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    WORK
                </Link>

                <Link
                    to="/about"
                    style={linkStyle(screen === 'AboutScreen')}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    ABOUT
                </Link>

                <Link
                    to="/contact"
                    style={linkStyle(screen === 'ContactScreen')}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    CONTACT
                </Link>

            </div>

            {width < constants.WEB_VERTICAL_POST_MIN && screen === 'PostScreen' && (
                <button onClick={handleToggleShowEssay} style={{
                    ...styles.reset,
                    height: '100%',
                    position: 'absolute',
                    padding: '4px 16px',
                    top: 0,
                    right: 0,
                    backgroundColor: styles.colors.white,
                    borderBottomLeftRadius: constants.SMALL_BORDER_RADIUS,
                    color: styles.colors.black,
                    cursor: 'pointer',
                }}>
                    {showEssay ? '📚' : '📝'}
                </button>
            )}

            {isAuthenticated && (
                <Link
                    to="/createPost"
                    style={{
                        width: SETTING_SIZE,
                        height: SETTING_SIZE,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        margin: '8px',
                    }}
                >
                    <PhotoComponent
                        photo={files.gear}
                    />
                </Link>
            )}
        </div>
    )
}

export default NavbarComponent;
