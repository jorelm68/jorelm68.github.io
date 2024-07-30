import { useParams } from "react-router-dom";
import Page from "../components/Page";
import { usePost } from "../../data/server/state";
import View from "../components/View";
import Text from "../components/Text";
import PhotoComponent from "../components/PhotoComponent";
import PostRawComponent from "../components/PostRawComponent";

export default function PostScreen() {
    const { post } = useParams();
    const {
        name,
        description,
        essay,
        backgroundColor,
        color,
        captions,
        media,
    } = usePost(post);

    return (
        <Page style={{
            flexDirection: 'row',
            height: '100vh', // Ensure full viewport height
            overflow: 'hidden', // Prevent scrollbars on the parent
            paddingTop: 0,
        }}>
            <View style={{
                display: 'flex',
                alignSelf: 'flex-start',
                flexDirection: 'column',
                width: '45%',
                minWidth: '350px',
                marginLeft: '5%',
                backgroundColor: 'transparent',

                zIndex: 1,
                overflowY: 'auto', // Enable vertical scrolling
                maxHeight: '100vh', // Constrain to viewport height
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
            }}>
                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 48 + 20 + 8,
                    backgroundColor: 'transparent',
                }} />

                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'flex-start',
                    backgroundColor,
                    paddingBottom: 16,
                    paddingLeft: 32,
                    paddingRight: 32,
                    borderRadius: 8,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color,
                        textAlign: 'center',
                    }}>{name}</Text>

                    <Text style={{
                        fontSize: 16,
                        color,
                    }}>{essay}</Text>
                </View>

                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 32,
                    backgroundColor: 'transparent',
                }} />
            </View>

            <View style={{
                display: 'flex',
                alignSelf: 'flex-start',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                flexDirection: 'column',
                width: '45%',
                gap: '16px',
                overflowY: 'auto', // Enable vertical scrolling
                maxHeight: '100vh', // Constrain to viewport height
                scrollbarWidth: 'none', // Hide scrollbar for Firefox
                paddingTop: 48 + 20 + 8,
                zIndex: 2,
                boxSizing: 'border-box',
            }}>
                {media && media.length > 0 && media.map((photo, index) => {
                    return (
                        <PostRawComponent
                            key={index}
                            media={[media[index]]}
                            name={''}
                            description={captions[index]}
                            color={color}
                            backgroundColor={backgroundColor}
                        />
                    )
                })}

                <View style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 16,
                    backgroundColor: 'transparent',
                }} />
            </View>
        </Page>
    )
}