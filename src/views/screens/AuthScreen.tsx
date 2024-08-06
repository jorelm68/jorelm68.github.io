import { useEffect, useState } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setScreen } from "../../data/redux/global.reducer";
import { useAppSelector } from "../../data/redux/hooks";
import View from "../components/View";
import constants from "../../data/constants/constants";

export default function AuthScreen() {
    const { isAuthenticated } = useAppSelector(state => state.global);

    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Auth | Ethan McIntyre';
        dispatch(setScreen('AuthScreen'));
    }, [dispatch]);

    const [password, setPassword] = useState('');
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === 'humpback') {
            dispatch(setIsAuthenticated(true));
        }
    }

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: constants.TEXT_FONT_SIZE,
        border: 'none',
        borderRadius: constants.SMALL_BORDER_RADIUS,
        backgroundColor: '#007BFF',
        color: '#FFFFFF',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <Page style={{
            paddingTop: 48,
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
                        <h1 style={{ color: 'white' }}>You are authenticated!</h1>
                    ) :
                    (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="password" style={{
                                fontSize: constants.TEXT_FONT_SIZE,
                                marginBottom: '10px',
                                color: 'white',
                                marginRight: 4,
                            }}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handleChangePassword}
                                required
                                style={{
                                    marginBottom: '10px',
                                    padding: '10px',
                                    fontSize: constants.TEXT_FONT_SIZE,
                                    borderRadius: constants.SMALL_BORDER_RADIUS,
                                    border: '1px solid #ccc',
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
