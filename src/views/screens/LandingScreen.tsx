import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../redux/global.reducer";
import Page from "../components/Page";

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
