import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import View from "../components/View";
import MeComponent from "../components/MeComponent";
import Text from "../components/Text";

const LandingScreen = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setScreen('LandingScreen'));
    }, [dispatch]);

    const [left, setLeft] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            const contentWidth = 1000; // Content width to center
            setLeft(viewportWidth > contentWidth ? (viewportWidth - 600) / 2 : 0);
            console.log(viewportWidth);
        };

        // Set initial padding
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    console.log(left);

    return (
        <Page>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                backgroundColor: 'red',
                paddingLeft: left,
                boxSizing: 'border-box',
            }}>
                <Text style={{
                    fontSize: 48,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                }}>Ethan McIntyre</Text>

                <Text style={{
                    fontSize: 24,
                    color: 'white',
                    textAlign: 'center',
                }}>Software Engineer</Text>
            </View>

            <MeComponent />
        </Page>
    );
}

export default LandingScreen;
