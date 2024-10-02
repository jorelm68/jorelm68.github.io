import { Link, useParams } from "react-router-dom";
import Page from "../components/Page";
import { usePost } from "../../lib/hooks";
import View from "../components/View";
import Text from "../components/Text";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../redux/global.reducer";
import constants from "../../lib/constants";
import styles from "../../lib/styles";
import PostComponent from "../components/PostComponent";
import helper from "../../lib/helper";

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
        start,
        end,
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
            {width >= constants.WEB_VERTICAL_POST_MIN || showEssay ? (
                <View style={{
                    ...commonColumnStyle,
                    paddingTop: constants.HEADER_HEIGHT + constants.DEFAULT_PADDING,
                    paddingBottom: constants.DEFAULT_PADDING,
                    height: 'auto',
                    width: (width < constants.WEB_VERTICAL_POST_MIN) ? FULL_SIZE_ESSAY_WIDTH : HALF_SIZE_ESSAY_WIDTH,
                    minWidth: (width < constants.WEB_VERTICAL_POST_MIN) ? MOBILE_ESSAY_MIN_WIDTH : WEB_ESSAY_MIN_WIDTH,
                    display: 'flex',
                    alignSelf: 'flex-start',
                    flexDirection: 'column',
                    marginLeft: constants.SIDE_GAP,
                    boxSizing: 'border-box',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'flex-start',
                        borderRadius: constants.BORDER_RADIUS,
                        boxSizing: 'border-box',
                        border: `1px solid ${color}`,
                        backgroundColor: 'white',
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

                        <Text style={{
                            fontSize: constants.TEXT_FONT_SIZE,
                            color,
                            textAlign: 'center',
                            padding: '0px',
                        }}>{start && end ? helper.formatDateRange(start, end) : null}</Text>

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
            {width >= constants.WEB_VERTICAL_POST_MIN || !showEssay ? (
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
                    width: (width < constants.WEB_VERTICAL_POST_MIN) ? '100%' : '50%',
                    paddingRight: constants.SIDE_GAP,
                    paddingLeft: constants.SIDE_GAP,
                }}>
                    {urls && urls.length > 0 && urls.map((url, index) => {
                        const caption = captions[index];
                        const parts = caption.split(' ~ ');
                        const name = parts[0];
                        const description = parts[1];
                        return (
                            <PostComponent
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