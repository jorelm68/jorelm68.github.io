import { useEffect, useState } from "react";
import View from "./View";
import { useAppSelector } from "../../lib/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import constants from "../../lib/constants/constants";
import styles from "../../lib/constants/styles";
import colors from "../../lib/constants/colors";

const NO_PADDING = 0;
const CONTENT_WIDTH = 1000;
const STARTING_POSITION = '0%';
const ENDING_POSITION = '-50%';
const RESTART_ANIMATION_DELAY = 2;

export default function MyNameComponent() {
    const { screen } = useAppSelector(state => state.global);
    const [padding, setPadding] = useState(NO_PADDING);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;

            if (viewportWidth > CONTENT_WIDTH) {
                setPadding((viewportWidth - CONTENT_WIDTH) / 2);
            } else {
                setPadding(NO_PADDING);
            }
        };

        // Set initial padding
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <View style={{
            ...styles.absolute,
            paddingTop: constants.HEADER_HEIGHT,
            zIndex: constants.Z_MIDDLE,
        }}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: screen === constants.MY_NAME_SCREEN
                            ? 1
                            : 0
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: constants.QUICK_TRANSITION } }}
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        pointerEvents: 'none',
                    }}
                >
                    <View style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        borderBottom: constants.BORDER,
                        borderTop: constants.BORDER,
                    }}>
                        <motion.p
                            style={{
                                margin: 0,
                                paddingLeft: padding,
                                fontSize: constants.HEADER_FONT_SIZE,
                                fontWeight: 'bold',
                                color: colors.white,
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontFamily: constants.FONT,
                            }}
                            initial={{ x: STARTING_POSITION }}
                            animate={{
                                x: screen === constants.MY_NAME_SCREEN
                                    ? STARTING_POSITION
                                    : ENDING_POSITION
                            }}
                            transition={{
                                x: {
                                    duration: screen === constants.MY_NAME_SCREEN
                                        ? constants.QUICK_TRANSITION
                                        : 0, delay: screen === constants.MY_NAME_SCREEN
                                            ? 0
                                            : RESTART_ANIMATION_DELAY,
                                    ease: "backOut"
                                }
                            }}
                        >ETHAN MCINTYRE</motion.p>
                    </View>

                    <View style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        borderBottom: constants.BORDER,
                    }}>
                        <motion.p
                            style={{
                                margin: 0,
                                paddingLeft: padding,
                                fontSize: constants.HEADER_FONT_SIZE,
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontFamily: constants.FONT,
                            }}
                            initial={{ x: STARTING_POSITION }}
                            animate={{
                                x: screen === constants.MY_NAME_SCREEN
                                    ? STARTING_POSITION
                                    : ENDING_POSITION
                            }}
                            transition={{
                                x: {
                                    duration: screen === constants.MY_NAME_SCREEN
                                        ? constants.QUICK_TRANSITION
                                        : 0, delay: screen === constants.MY_NAME_SCREEN
                                            ? 0.1
                                            : 2,
                                    ease: "backOut"
                                }
                            }}
                        >DEVELOPER</motion.p>
                    </View>
                </motion.div>
            </AnimatePresence>
        </View>
    );
}
