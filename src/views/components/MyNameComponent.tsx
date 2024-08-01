import { useEffect, useState } from "react";
import Text from "./Text";
import View from "./View";
import { useAppSelector } from "../../data/redux/hooks";
import { constants } from "buffer";
import { AnimatePresence, motion } from "framer-motion";

export default function MyNameComponent() {
    const { screen } = useAppSelector(state => state.global);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            const contentWidth = 1000; // Content width to center

            if (viewportWidth > contentWidth) {
                setLeft((viewportWidth - contentWidth));
            } else {
                setLeft(0);
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
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -10,
            paddingTop: 40 + 20 + 8,
        }}>
            <AnimatePresence>
                <motion.div
                    initial={{
                        opacity: 0,
                        x: '-100%',
                    }}
                    animate={{
                        opacity: screen !== 'LandingScreen' ? 0 : 1,
                        x: screen === 'LandingScreen' ? '0%' : '-100%',
                    }}
                    exit={{
                        opacity: 0,
                        x: '-100%',
                    }}
                    transition={{
                        opacity: { duration: 0.35 },
                        x: { duration: 0.2, ease: "linear" },
                    }}
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    <Text
                        style={{
                            paddingLeft: left,
                            fontSize: 72,
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                            borderTop: '1px solid white',
                            borderBottom: '1px solid white',

                        }}>ETHAN MCINTYRE</Text>

                    <Text style={{
                        paddingLeft: left,
                        fontSize: 72,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                        borderBottom: '1px solid white',
                    }}>DEVELOPER</Text>
                </motion.div>
            </AnimatePresence>
        </View>
    );
}