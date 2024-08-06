import { useEffect, useState } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setScreen } from "../../lib/redux/global.reducer";
import { useAppSelector } from "../../lib/redux/hooks";
import View from "../components/View";
import constants from "../../lib/constants/constants";
import colors from "../../lib/constants/colors";

const DOCUMENT_TITLE = 'Auth | Ethan McIntyre';
const PASSWORD = 'humpback';

export default function AuthScreen() {
    const { isAuthenticated } = useAppSelector(state => state.global);

    const dispatch = useDispatch();
    useEffect(() => {
        document.title = DOCUMENT_TITLE;
        dispatch(setScreen('AuthScreen'));
    }, [dispatch]);

    const [password, setPassword] = useState('');
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === PASSWORD) {
            dispatch(setIsAuthenticated(true));
        }
    }

    const buttonStyle = {
        padding: constants.BUTTON_PADDING,
        fontSize: constants.TEXT_FONT_SIZE,
        border: 'none',
        borderRadius: constants.SMALL_BORDER_RADIUS,
        backgroundColor: colors.blue,
        color: colors.white,
        cursor: 'pointer',
    };

    const buttonHoverStyle = {
        backgroundColor: colors.hoverBlue,
    };

    return (
        <Page style={{
            paddingTop: constants.HEADER_HEIGHT,
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}>
                {isAuthenticated ?
                    (
                        <h1 style={{ color: colors.white }}>You are authenticated!</h1>
                    ) :
                    (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="password" style={{
                                fontSize: constants.TEXT_FONT_SIZE,
                                color: colors.white,
                                marginRight: 4,
                            }}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handleChangePassword}
                                required
                                style={{
                                    padding: constants.TEXT_INPUT_PADDING,
                                    fontSize: constants.TEXT_FONT_SIZE,
                                    borderRadius: constants.SMALL_BORDER_RADIUS,
                                    border: constants.BORDER,
                                }}
                            />
                            <button
                                type="submit"
                                style={buttonStyle}
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                            >
                                Submit
                            </button>
                        </form>
                    )
                }
            </View>
        </Page>
    );
}
