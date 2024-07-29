import { useEffect, useState } from "react";
import Page from "../components/Page";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setScreen } from "../../data/redux/global.reducer";
import { useAppSelector } from "../../data/redux/hooks";
import View from "../components/View";

export default function DevScreen() {
    const { isAuthenticated } = useAppSelector(state => state.global);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('DevScreen'));
    }, [dispatch]);

    return (
        <Page>
            
        </Page>
    );
}
