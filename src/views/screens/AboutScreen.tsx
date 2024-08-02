import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";

export default function AboutScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('AboutScreen'));
    }, [dispatch]);

    return (
        <div className="container">
            <p>About Me</p>
        </div>
    )
}