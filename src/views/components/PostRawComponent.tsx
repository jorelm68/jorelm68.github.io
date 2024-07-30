import { Link } from "react-router-dom";
import { EMPTY_POST } from "../../data/constants/empty";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";
import { useEffect, useRef, useState } from "react";

interface PostRawComponentProps {
    name: string;
    description: string;
    media: string[];
    link: string;
    color: string;
    backgroundColor: string;
}

export default function PostRawComponent({
    name,
    description,
    media,
    link,
    color,
    backgroundColor,
}: PostRawComponentProps) {

    return (
        <Link
            to={link ? link : EMPTY_POST.link}
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '50vw',
                minWidth: '400px',
                maxWidth: '50vw',
                backgroundColor: backgroundColor ? backgroundColor : EMPTY_POST.backgroundColor,
                color: color,
                textDecoration: 'none',
                padding: '10px',
                maxHeight: '200px',
                overflow: 'hidden'
            }}
        >
            <View
                style={{
                    flex: '0 0 auto',
                    width: 'auto',
                    height: '200px',
                    marginRight: '10px',
                    overflow: 'hidden'
                }}
            >
                <PhotoComponent
                    photo={media && media.length > 0 ? media[0] : EMPTY_POST.media[0]}
                    resolution={1080}
                    style={{
                        height: '100%',
                        width: 'auto',
                    }}
                />
            </View>
            <View
                style={{
                    overflow: 'hidden',
                }}
            >
                <Text
                    style={{
                        fontSize: '1.5em',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '32px',
                        color: color ? color : EMPTY_POST.color,
                    }}
                >
                    {name ? name : EMPTY_POST.name}
                </Text>
                <Text
                    style={{
                        fontSize: '1em',
                        overflow: 'hidden',
                        color: color ? color : EMPTY_POST.color,
                    }}
                >
                    {description}
                </Text>
            </View>
        </Link>
    );
}
