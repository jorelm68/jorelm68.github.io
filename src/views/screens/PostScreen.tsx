import { Link, useParams } from "react-router-dom";
import Page from "../components/Page";
import { usePost } from "../../lib/hooks";
import View from "../components/View";
import Text from "../components/Text";
import PostRawComponent from "../components/PostRawComponent";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../redux/global.reducer";
import constants from "../../lib/constants";
import styles from "../../lib/styles";

const FULL_SIZE_ESSAY_WIDTH = '90%';
const HALF_SIZE_ESSAY_WIDTH = '45%';
const MOBILE_ESSAY_MIN_WIDTH = 'unset';
const WEB_ESSAY_MIN_WIDTH = '350px';

export default function PostScreen() {
    const { isAuthenticated } = useAppSelector(state => state.global);
    const dispatch = useDispatch();
    const { post } = useParams();
    const {
        name,
        essay,
        color,
        backgroundColor,
        urls,
        captions,
    } = usePost(post);

    const { width, showEssay } = useAppSelector(state => state.global);

    useEffect(() => {
        document.title = `${name} | Ethan McIntyre`;
        dispatch(setScreen('PostScreen'));
    }, [dispatch, name])

    const commonColumnStyle = {
        overflowY: 'auto' as const,
        maxHeight: '100vh',
        scrollbarWidth: 'none' as const,
    };

    return (
        <Page style={{
            flexDirection: 'row',
            overflow: 'hidden',
            zIndex: constants.Z_FRONT,
        }}>
            {width >= constants.MOBILE_THRESHOLD || showEssay ? (
                <View style={{
                    ...commonColumnStyle,
                    alignSelf: 'flex-start',
                    flexDirection: 'column',
                    width: (width < constants.MOBILE_THRESHOLD) ? FULL_SIZE_ESSAY_WIDTH : HALF_SIZE_ESSAY_WIDTH,
                    minWidth: (width < constants.MOBILE_THRESHOLD) ? MOBILE_ESSAY_MIN_WIDTH : WEB_ESSAY_MIN_WIDTH,
                    paddingTop: constants.HEADER_HEIGHT + constants.DEFAULT_PADDING,
                    marginLeft: constants.SIDE_GAP,
                    paddingBottom: constants.DEFAULT_PADDING,
                    boxSizing: 'border-box',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'flex-start',
                        backgroundColor,
                        borderRadius: constants.BORDER_RADIUS,
                        boxSizing: 'border-box',
                        border: `1px solid ${color}`,
                    }}>
                        {isAuthenticated && (
                            <Link
                                to={`/post/${post}/edit`}
                                style={{
                                    ...styles.reset,
                                    alignSelf: 'flex-end',
                                    display: 'flex',
                                    fontSize: constants.TITLE_FONT_SIZE,
                                    color: color,
                                }}
                            >
                                🖊
                            </Link>
                        )}

                        <Text style={{
                            fontSize: constants.TITLE_FONT_SIZE,
                            fontWeight: 'bold',
                            color,
                            textAlign: 'center',
                            padding: constants.POST_TEXT_PADDING,
                            paddingBottom: '0px',
                        }}>{name}</Text>

                        <p dangerouslySetInnerHTML={{ __html: essay }} style={{
                            fontSize: constants.TEXT_FONT_SIZE,
                            overflow: 'hidden',
                            color: color,
                            borderTop: `1px solid ${color}`,
                            padding: constants.POST_TEXT_PADDING,
                            fontFamily: constants.FONT,
                            lineHeight: constants.TEXT_LINE_HEIGHT,
                        }} />
                    </View>
                </View>
            ) : null}
            {!(width < 800) || !showEssay ? (
                <View style={{
                    ...commonColumnStyle,
                    paddingTop: constants.HEADER_HEIGHT + constants.DEFAULT_PADDING,
                    paddingBottom: constants.DEFAULT_PADDING,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: constants.POST_GAP,
                    height: 'auto',
                    width: (width < constants.MOBILE_THRESHOLD) ? '100%' : '50%',
                    paddingRight: constants.SIDE_GAP,
                    paddingLeft: constants.SIDE_GAP,
                }}>
                    {urls && urls.length > 0 && urls.map((url, index) => {
                        const caption = captions[index];
                        const parts = caption.split(' ~ ');
                        const name = parts[0];
                        const description = parts[1];
                        return (
                            <PostRawComponent
                                key={index}
                                url={url}
                                name={name}
                                description={description}
                                color={color}
                                backgroundColor={backgroundColor}
                            />
                        )
                    })}
                </View>
            ) : null}
        </Page>
    )
}