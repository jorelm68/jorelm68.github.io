import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../data/redux/global.reducer";

export default function MyWorkScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('MyWorkScreen'));
    }, [dispatch])

    return (
        <div className="container">
            <p>My Work</p>
        </div>
    )
}