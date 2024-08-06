import { Link, useParams } from "react-router-dom";
import Page from "../components/Page";
import { usePost } from "../../data/server/state";
import View from "../components/View";
import Text from "../components/Text";
import PostRawComponent from "../components/PostRawComponent";
import { useAppSelector } from "../../data/redux/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import constants from "../../data/constants/constants";

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
        scrollbarWidth: 'none' as const, // Hide scrollbar for Firefox
    };

    return (
        <Page style={{
            flexDirection: 'row',
            height: '100vh', // Ensure full viewport height
            overflow: 'hidden', // Prevent scrollbars on the parent
            paddingTop: 0,
            width: '100%',
        }}>
            {!(width < 800) || showEssay ? (
                <View style={{
                    ...commonColumnStyle,
                    alignSelf: 'flex-start',
                    flexDirection: 'column',
                    width: (width < 800) ? '90%' : '45%',
                    minWidth: (width < 800) ? 'unset' : '350px',
                    paddingTop: `${48 + 32}px`,
                    zIndex: 1,
                    marginLeft: '5%',
                    paddingBottom: '32px',
                    boxSizing: 'border-box',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'flex-start',
                        backgroundColor,
                        borderRadius: '16px',
                        boxSizing: 'border-box',
                        border: `1px solid ${color}`,
                    }}>
                        {isAuthenticated && (
                            <Link
                                to={`/post/${post}/edit`}
                                style={{
                                    textDecoration: 'none',
                                    alignSelf: 'flex-end',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '24px',
                                    height: '24px',
                                    zIndex: 1,
                                }}
                            >
                                <Text style={{
                                    fontSize: '1.5em',
                                    color: color,
                                }}>
                                    🖊
                                </Text>
                            </Link>
                        )}

                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color,
                            textAlign: 'center',
                            paddingTop: '16px',
                        }}>{name}</Text>

                        <p dangerouslySetInnerHTML={{ __html: essay }} style={{
                            fontSize: '1em',
                            overflow: 'hidden',
                            color: color,
                            borderTop: `1px solid ${color}`,
                            padding: '16px',
                            fontFamily: constants.FONT,
                            lineHeight: '1.5em',
                        }} />
                    </View>
                </View>
            ) : null}
            {!(width < 800) || !showEssay ? (
                <View style={{
                    ...commonColumnStyle,
                    paddingTop: `${48 + 32}px`,
                    paddingBottom: '32px',
                    alignItems: 'flex-start',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '16px',
                    height: 'auto',
                    width: (width < 800) ? '100%' : '50%',
                    paddingRight: '5%',
                    paddingLeft: '5%',
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