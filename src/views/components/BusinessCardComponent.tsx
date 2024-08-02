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
        const resumeUrl = files.resume;

        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Ethan_McIntyre.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            initial={{ opacity: 0, marginTop: '-100%' }}
            animate={{
                opacity: screen === 'ContactScreen' ? 1 : 0,
                marginTop: screen === 'ContactScreen' ? 0 : '-100%',
            }}
            transition={{
                opacity: { duration: 0.75 },
                marginTop: { duration: 0.75, delay: screen === 'ContactScreen' ? 0 : 2 },
            }}
            style={{
                width: '100%',
                maxWidth: 885,
                height: 'auto',
                transition: 'background-color 0.3s ease',
                position: 'absolute',
                top: 48,
                left: 0,
                zIndex: 100,
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
                    zIndex: 100,
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
                        cursor: 'pointer',
                    }}
                />
            </View>
        </motion.div>
    );
}
