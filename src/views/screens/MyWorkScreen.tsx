import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import Text from "../components/Text";
import View from "../components/View";

export default function MyWorkScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('MyWorkScreen'));
    }, [dispatch])

    return (
        <Page style={{}}>

            <View className="wrapper" style={{
                width: '100%',
                maxWidth: '960px',
                margin: '0 auto',
            }}>
                <View className="flex-container" style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    flexWrap: 'wrap',

                }}>
                    <View className="box-one" style={{
                        flexGrow: 1,
                        height: '100px',
                        minWidth: '200px',
                        backgroundColor: 'red',
                    }} />

                    <View className="box-two" style={{
                        flexGrow: 1,
                        height: '100px',
                        minWidth: '200px',
                        backgroundColor: 'blue',
                    }} />

                    <View className="box-three" style={{
                        flexGrow: 1,
                        height: '100px',
                        minWidth: '200px',
                        backgroundColor: 'green',
                    }} />
                </View>
            </View>
        </Page>
    )
}