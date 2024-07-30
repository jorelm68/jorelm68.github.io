import { Link } from "react-router-dom";
import { EMPTY_POST } from "../../data/constants/empty";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import Text from "./Text";

interface PostRawComponentProps {
    name: string;
    description: string;
    photoBase64: string | null;
    link: string;
    maxWidth: string;
    minWidth: string;
    minHeight: string;
    maxHeight: string;
    photoWidth: string;
    photoHeight: string;
    color: string;
    backgroundColor: string;
    flexDirection: string;
}

export default function PostRawComponent({
    name,
    description,
    photoBase64,
    link,
    maxWidth,
    minWidth,
    minHeight,
    maxHeight,
    photoWidth,
    photoHeight,
    color,
    backgroundColor,
    flexDirection,
}: PostRawComponentProps) {
    return (
        <Link
            to={link ? link : EMPTY_POST.link}
            style={{
                textDecoration: 'none',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                maxWidth: maxWidth ? maxWidth : EMPTY_POST.maxWidth,
                maxHeight: maxHeight ? maxHeight : EMPTY_POST.maxHeight,
                minWidth: minWidth ? minWidth : EMPTY_POST.minWidth,
                minHeight: minHeight ? minHeight : EMPTY_POST.minHeight,
                padding: 8,
                borderRadius: 8,
                gap: 8,
                backgroundColor: backgroundColor ? backgroundColor : EMPTY_POST.backgroundColor,
                flexDirection: flexDirection as 'row' | 'column' || EMPTY_POST.flexDirection as 'row' | 'column',  // Explicit type assertion
            }}
        >
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: photoWidth ? photoWidth : EMPTY_POST.photoWidth,
                height: photoHeight ? photoHeight : EMPTY_POST.photoHeight,
            }}>
                <PhotoComponent
                    photo={photoBase64 ? photoBase64 : EMPTY_POST.photo}
                    resolution={1080}
                />
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}>
                <Text style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: color ? color : EMPTY_POST.color
                }}>
                    {name ? name : EMPTY_POST.name}
                </Text>
                <Text style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 16,
                    color: color ? color : EMPTY_POST.color
                }}>
                    {description ? description : EMPTY_POST.description}
                </Text>
            </View>
        </Link>
    )
}