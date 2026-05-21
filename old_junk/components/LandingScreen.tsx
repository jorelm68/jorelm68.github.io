import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../src/redux/global.reducer";
import Page from "../src/views/components/Page";

const DOCUMENT_TITLE = 'Ethan McIntyre';

const LandingScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = DOCUMENT_TITLE;
        dispatch(setScreen('LandingScreen'));
    }, [dispatch]);

    return (
        <Page />
    );
}

export default LandingScreen;
