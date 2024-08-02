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
        document.title = 'About | Ethan McIntyre';
        dispatch(setScreen('AboutScreen'));
    }, [dispatch]);

    return (
        <Page style={{
            paddingTop: 48,
            paddingBottom: 32,
            alignItems: 'center',
            zIndex: 2,
            scrollbarWidth: 'auto',
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: 'auto',
                alignItems: 'center',
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
                    width: '40%',
                    minWidth: '500px',
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
                    fontSize: '1.2rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '1rem',
                    lineHeight: '2',
                    fontWeight: 'normal',
                    width: '35%',
                    minWidth: '500px',
                }}>
                    Hey! I'm Ethan and I'm a developer with a passion for creating and building things. 
                    I'm a junior studying Computer Science and Business at the University of Michigan. 
                    I have experience in full-stack web development and mobile app development.
                    I'm always looking for new opportunities to learn and grow as a developer. 
                    I'm currently working as a developer for Streetmeet Inc. 
                    In my free time, I enjoy skydiving, ballroom dancing, and playing guitar.
                </Text>
            </View>
        </Page>
    );
}
