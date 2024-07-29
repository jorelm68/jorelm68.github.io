import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";

export default function AboutMeScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('AboutMeScreen'));
    }, [dispatch]);

    return (
        <div className="container">
            <p>About Me</p>
        </div>
    )
}