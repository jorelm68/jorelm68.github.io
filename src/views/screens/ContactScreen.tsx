import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import PhotoComponent from "../components/PhotoComponent";
import photos from "../../data/constants/photos";
import View from "../components/View";
import files from "../../data/constants/files";
import { Link } from "react-router-dom";
import BusinessCardComponent from "../components/BusinessCardComponent";

export default function ContactScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Contact | Ethan McIntyre';
        dispatch(setScreen('ContactScreen'));
    }, [dispatch]);

    

    return (
        <Page style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
        </Page>
    );
}
