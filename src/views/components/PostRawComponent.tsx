import { EMPTY_POST } from "../../data/constants/empty";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";

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

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '40vw',
                minWidth: '400px',
                maxWidth: '40vw',
                backgroundColor: backgroundColor ? backgroundColor : EMPTY_POST.backgroundColor,
                color: color,
                textDecoration: 'none',
                padding: '10px',
                minHeight: '200px',
                maxHeight: '200px',
                overflow: 'hidden',
                borderRadius: '8px',
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
                    photo={url ? url : EMPTY_POST.urls[0]}
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
                {name && (
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
                        {name}
                    </Text>
                )}

                {description && (
                    <Text
                        style={{
                            fontSize: '1em',
                            overflow: 'hidden',
                            color: color ? color : EMPTY_POST.color,
                        }}
                    >
                        {description}
                    </Text>
                )}
            </View>
        </View>
    );
}
