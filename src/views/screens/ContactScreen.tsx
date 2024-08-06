import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../redux/global.reducer";
import Page from "../components/Page";

const DOCUMENT_TITLE = 'Contact | Ethan McIntyre';

export default function ContactScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = DOCUMENT_TITLE;
        dispatch(setScreen('ContactScreen'));
    }, [dispatch]);

    return (
        <Page />
    );
}
