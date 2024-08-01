import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setScreen } from "../../data/redux/global.reducer";
import Page from "../components/Page";
import PhotoComponent from "../components/PhotoComponent";
import photos from "../../data/constants/photos";
import Text from "../components/Text";
import View from "../components/View";
import files from "../../data/constants/files";

export default function ContactScreen() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScreen('ContactScreen'));
    }, [dispatch])

    const handleDownload = () => {
        // URL of the PDF file
        const resumeUrl = files.resume; // Make sure this is a URL

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Ethan_McIntyre.pdf';

        // Append the link to the document and trigger a click to start the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    };

    return (
        <Page style={{
            backgroundColor: 'white',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
            <View style={{
                width: '100%',
                height: '48px',
                backgroundColor: 'black',
            }}>

            </View>

            <PhotoComponent 
                photo={photos.businessCard}
                style={{
                    width: '100%',
                    maxWidth: 1000,
                    height: 'auto',
                    marginBottom: 20,
                }}
            />
        </Page>
    )
}