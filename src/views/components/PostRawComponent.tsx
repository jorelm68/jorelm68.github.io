import { EMPTY_POST } from "../../data/constants/empty";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../data/redux/hooks";

interface PostRawComponentProps {
    name: string;
    description: string;
    url: string;
    color: string;
    backgroundColor: string;
}

export default function PostRawComponent({
    name,
    description,
    url,
    color,
    backgroundColor,
}: PostRawComponentProps) {
    const { width } = useAppSelector(state => state.global);
    const conditionalBorder = width < 550 || width < 1100 && width >= 800 ? {
        borderTop: `1px solid ${color ? color : EMPTY_POST.color}`,
    } : {
        borderLeft: `1px solid ${color ? color : EMPTY_POST.color}`,
    }

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: width < 550 || width < 1100 && width >= 800 ? 'column' : 'row',
                width: '100%',
                backgroundColor: backgroundColor ? backgroundColor : EMPTY_POST.backgroundColor,
                color: color,
                textDecoration: 'none',
                borderRadius: '8px',
                boxSizing: 'border-box',
                maxWidth: '650px',
                alignItems: 'center',
                border: `1px solid ${color ? color : EMPTY_POST.color}`,
            }}
        >
            <View
                style={{
                    flex: '1 1 40%',
                    height: 'auto',
                    overflow: 'hidden',
                    minWidth: url.includes('api/photo/readPhoto') ? '0px' : '226px',
                    maxWidth: url.includes('api/photo/readPhoto') ? '226px' : '226px',
                }}
            >
                {url && url.includes('api/photo/readPhoto') ? (
                    <PhotoComponent
                        photo={url}
                        resolution={1080}
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                ) : (
                    <iframe
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        src={url}
                        title={`YouTube Video`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </View>

            <View
                style={{
                    flex: '1 1 60%',
                    overflow: 'hidden',
                    padding: '2%',
                    ...conditionalBorder,
                }}
            >
                {name && (
                    <Text
                        style={{
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'center',
                            color: color ? color : EMPTY_POST.color,
                        }}
                    >
                        {name}
                    </Text>
                )}

                {description && (
                    <p dangerouslySetInnerHTML={{ __html: description }} style={{
                        fontSize: '1em',
                        overflow: 'hidden',
                        color: color ? color : EMPTY_POST.color,
                        lineHeight: '1.5em',
                    }} />
                )}
            </View>
        </View>
    );
}
