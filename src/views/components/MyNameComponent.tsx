import { useMemo } from "react";
import View from "./View";
import { useAppSelector } from "../../redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import constants from "../../lib/constants";
import styles from "../../lib/styles";

const NO_PADDING = 0;
const CONTENT_WIDTH = 1000;
const STARTING_POSITION = '0%';
const ENDING_POSITION = '-50%';
const RESTART_ANIMATION_DELAY = 2;

export default function MyNameComponent() {
    const { screen, width } = useAppSelector(state => state.global);

    const padding = useMemo(() => {
        if (width > CONTENT_WIDTH) {
            return (width - CONTENT_WIDTH) / 2;
        }
        else {
            return NO_PADDING;
        }
    }, [width]);

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
                                color: styles.colors.white,
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