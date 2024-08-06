import { Link } from "react-router-dom";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { motion } from "framer-motion";
import constants from "../../lib/constants";
import styles from "../../lib/styles";
import files from "../../lib/files";

const CONTACT_SCREEN = 'ContactScreen';
const STARTING_POSITION = '-100%';
const ENDING_POSITION = '0%';
const DURATION = 0.75;
const CONTAINER_WIDTH = 885;
const BORDER_RADIUS = 50;
const BUSINESS_CARD = {
    position: 'absolute' as const,
    width: '100%',
    height: 'auto',
    top: 48,
    left: 0,
}

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
        link.download = constants.RESUME_NAME;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <View>
            <motion.div
                initial={{ opacity: 0, marginTop: STARTING_POSITION }}
                animate={{
                    opacity: screen === CONTACT_SCREEN ? 1 : 0,
                    marginTop: screen === CONTACT_SCREEN ? ENDING_POSITION : STARTING_POSITION,
                }}
                transition={{
                    opacity: { duration: DURATION },
                    marginTop: { duration: DURATION, delay: screen === CONTACT_SCREEN ? 0 : 2 },
                }}
                style={{
                    ...BUSINESS_CARD,
                    maxWidth: CONTAINER_WIDTH,
                    zIndex: constants.Z_BACK,
                }}
            >
                <PhotoComponent
                    photo={files.businessCard}
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderBottomRightRadius: width < CONTAINER_WIDTH ? 0 : BORDER_RADIUS,
                    }}
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, marginTop: STARTING_POSITION }}
                animate={{
                    opacity: screen === CONTACT_SCREEN ? 1 : 0,
                    marginTop: screen === CONTACT_SCREEN ? 0 : STARTING_POSITION,
                }}
                transition={{
                    opacity: { duration: DURATION },
                    marginTop: { duration: DURATION, delay: screen === CONTACT_SCREEN ? 0 : 2 },
                }}
                style={{
                    ...BUSINESS_CARD,
                    maxWidth: CONTAINER_WIDTH,
                    zIndex: constants.Z_FRONT,
                }}
            >
                <PhotoComponent
                    photo={files.businessCard}
                    style={{
                        width: '100%',
                        height: 'auto',
                        opacity: 0,
                        borderBottomRightRadius: width < CONTAINER_WIDTH ? 0 : BORDER_RADIUS,
                    }}
                />

                <View
                    style={styles.absolute}
                >
                    <Link
                        to={constants.GITHUB_LINK}
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
                        to={constants.LINKEDIN_LINK}
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
        </View>
    );
}
