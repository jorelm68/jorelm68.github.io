import { Link } from "react-router-dom";
import photos from "../../data/constants/photos";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import { useState, useEffect } from "react";
import files from "../../data/constants/files";
import { useAppSelector } from "../../data/redux/hooks";
import { motion } from "framer-motion";

export default function BusinessCardComponent() {
    const { screen } = useAppSelector(state => state.global);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: screen === 'ContactScreen' ? 1 : 0 }}
            transition={{ duration: screen === 'ContactScreen' ? 1 : 0.35 }}
            style={{
                width: '100%',
                maxWidth: 885,
                height: 'auto',
                transition: 'background-color 0.3s ease',
                position: 'absolute',
                top: 48,
                left: 0,
                zIndex: 100, // Ensure this is above other elements
                pointerEvents: 'auto', // Ensure pointer events are enabled
            }}
        >
            <PhotoComponent
                photo={photos.businessCard}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderBottomRightRadius: width < 885 ? 0 : 50,
                }}
            />

            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'auto', // Ensure this is not set to 'none'
                }}
            >
                <Link
                    to="https://www.github.com/jorelm68"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        position: 'absolute',
                        width: '16%',
                        height: '8%',
                        top: '82.75%',
                        left: '6.75%',
                        cursor: 'pointer',
                        zIndex: 101, // Ensure this is above other elements
                    }}
                />

                <Link
                    to="https://www.linkedin.com/in/ethan-mcintyre68"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        position: 'absolute',
                        width: '17.5%',
                        height: '8%',
                        top: '82.75%',
                        left: '30%',
                        cursor: 'pointer',
                        zIndex: 101, // Ensure this is above other elements
                    }}
                />

                <View
                    onClick={handleDownload}
                    style={{
                        position: 'absolute',
                        right: '14.75%',
                        top: '82.75%',
                        width: '30.75%',
                        height: '8%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        cursor: 'pointer',
                        zIndex: 101, // Ensure this is above other elements
                    }}
                />
            </View>
        </motion.div>
    );
}
