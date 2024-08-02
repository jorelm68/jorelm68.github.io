import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import Text from "../components/Text";
import View from "../components/View";
import PhotoComponent from "../components/PhotoComponent";
import photos from "../../data/constants/photos";

export default function AboutScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('AboutScreen'));
    }, [dispatch]);

    return (
        <Page style={{
            paddingTop: 48,
            alignItems: 'center',
            overflowY: 'hidden',
            zIndex: 2,
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflowY: 'auto',
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                width: '40%',
                minWidth: '500px',
            }}>
                <Text style={{
                    fontSize: '8rem',
                    fontWeight: 'bold',
                    color: 'rgba(255, 255, 255, 0.9)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '1rem',
                }}>
                    ABOUT
                </Text>

                <View style={{
                    display: 'fex',
                    flexDirection: 'row',
                }}>
                    <PhotoComponent
                        photo={photos.view1}
                        style={{
                            width: '45%',
                            height: 'auto',
                            marginLeft: `${10 / 3}%`,
                            marginRight: `${10 / 3}%`,
                        }}
                    />

                    <PhotoComponent
                        photo={photos.view2}
                        style={{
                            width: '45%',
                            height: 'auto',
                        }}
                    />
                </View>

                <Text style={{
                    fontSize: '1.5rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    overflowWrap: 'break-word',
                    padding: '1rem',
                    lineHeight: '1.5',
                }}>
                    Hey! I'm Ethan and I'm a developer with a passion for creating and building things. 
                    <br />I'm a junior studying Computer Science and Business at the University of Michigan. 
                    <br />I have experience in full-stack web development and mobile app development.
                    <br />I'm always looking for new opportunities to learn and grow as a developer. 
                    <br />I'm currently working as a developer for Streetmeet Inc. 
                    <br />In my free time, I enjoy skydiving, ballroom dancing, and playing guitar.
                </Text>
            </View>
        </Page>
    );
}
