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
            paddingTop: '3rem',
            paddingBottom: '2rem',
            alignItems: 'center',
            zIndex: 2,
            scrollbarWidth: 'auto',
            boxSizing: 'border-box',
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                boxSizing: 'border-box',
            }}>
                <Text style={{
                    fontSize: 'clamp(2rem, 8vw, 8rem)', // Responsive font size
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
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap', // Allow items to wrap on small screens
                    width: '100%',
                    maxWidth: '1000px', // Limit maximum width
                    justifyContent: 'center',
                    gap: '1rem', // Add gap between images
                    boxSizing: 'border-box',
                }}>
                    <PhotoComponent
                        photo={photos.view1}
                        style={{
                            width: '45%',
                            maxWidth: '500px', // Max width for each image
                            height: 'auto',
                        }}
                    />

                    <PhotoComponent
                        photo={photos.view2}
                        style={{
                            width: '45%',
                            maxWidth: '500px', // Max width for each image
                            height: 'auto',
                        }}
                    />
                </View>

                <Text style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', // Responsive font size
                    color: 'rgba(255, 255, 255, 0.8)',
                    padding: '1rem',
                    lineHeight: '1.5em',
                    fontWeight: 'normal',
                    width: '90%',
                    maxWidth: '800px', // Max width for text
                    boxSizing: 'border-box',
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
