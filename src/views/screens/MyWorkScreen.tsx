import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../data/redux/global.reducer";

export default function MyWorkScreen() {
    console.log('my work screen rednered');
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('my work');
        dispatch(setScreen('MyWorkScreen'));
    }, [])

    return (
        <div className="container">
            <p>My Work</p>
        </div>
    )
}