import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import View from "../components/View";
import Me1Component from "../components/Me1Component";
import Text from "../components/Text";
import api from "../../data/server/api";
import { Res } from "../../data/constants/types";
import PostComponent from "../components/PostComponent";
import MyNameComponent from "../components/MyNameComponent";

const LandingScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Ethan McIntyre';
        dispatch(setScreen('LandingScreen'));
    }, [dispatch]);

    return (
        <Page style={{
            overflow: 'hidden', // Prevent scrollbars on the parent
        }}>
            
        </Page>
    );
}

export default LandingScreen;
