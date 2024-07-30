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
        }}>
            <View style={{
                display: 'flex',
                alignSelf: 'flex-start',
                flexDirection: 'column',
                backgroundColor,
                width: '40%',
                minWidth: '350px',
                marginLeft: '5%',
                paddingTop: 16,
                paddingBottom: 16,
                paddingLeft: 32,
                paddingRight: 32,
                borderRadius: 8,
                zIndex: 1,
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
                alignSelf: 'flex-start',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'column',
                width: '50%',
                gap: '16px',
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
                            link={''}
                        />
                    )
                })}
            </View>
        </Page>
    )
}