import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";

export default function ContactScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('ContactScreen'));
    }, [dispatch])
    
    return (
        <div className="container">
            <p>Contact</p>
        </div>
    )
}