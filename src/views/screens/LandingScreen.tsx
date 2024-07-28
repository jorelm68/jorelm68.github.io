import { useEffect } from "react";
import { useAppSelector } from "../../data/redux/hooks";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import PostComponent from "../components/PostComponent";


const LandingScreen = () => {
    const { screen } = useAppSelector(state => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScreen('LandingScreen'));
    }, [])

    return (
        <div className="container" style={{
            position: 'absolute',
            display: 'flex',
            top: 0,
            left: 0,
            margin: 0,
            padding: 8,
            paddingTop: 48 + 20 + 8,
        }}>
            
        </div>
    )
}

export default LandingScreen;