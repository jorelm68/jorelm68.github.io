import { useEffect, useState } from "react";
import Text from "./Text";
import View from "./View";
import { useAppSelector } from "../../data/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";

export default function MyNameComponent() {
    const { screen } = useAppSelector(state => state.global);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            const contentWidth = 1000; // Content width to center

            if (viewportWidth > contentWidth) {
                setLeft((viewportWidth - contentWidth) / 2); // Center the text
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
            paddingTop: 48,
            zIndex: -10,
        }}>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: screen !== 'LandingScreen' ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 0.35 } }}
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        pointerEvents: 'none',
                    }}
                >
                    <View style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        borderBottom: '1px solid white',
                        borderTop: '1px solid white',
                    }}>
                        <motion.p
                            style={{
                                margin: 0,
                                paddingLeft: left,
                                fontSize: 'clamp(24px, 6vw, 72px)', // Responsive font size
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                                whiteSpace: 'nowrap', // Prevent text wrapping
                                fontFamily: 'Nunito',
                            }}
                            initial={{ x: '-50%' }}
                            animate={{ x: screen === 'LandingScreen' ? '0%' : '-50%' }}
                            transition={{ x: { duration: screen === 'LandingScreen' ? 0.35 : 0, delay: screen === 'LandingScreen' ? 0 : 2, ease: "backOut" } }}
                        >ETHAN MCINTYRE</motion.p>
                    </View>

                    <View style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        borderBottom: '1px solid white',
                    }}>
                        <motion.p
                            style={{
                                margin: 0,
                                paddingLeft: left,
                                fontSize: 'clamp(24px, 6vw, 72px)', // Responsive font size
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                                whiteSpace: 'nowrap', // Prevent text wrapping
                                fontFamily: 'Nunito',
                            }}
                            initial={{ x: '-50%' }}
                            animate={{ x: screen === 'LandingScreen' ? '0%' : '-50%' }}
                            transition={{ x: { duration: screen === 'LandingScreen' ? 0.35 : 0, delay: screen === 'LandingScreen' ? 0.1 : 2, ease: "backOut" } }}
                        >DEVELOPER</motion.p>
                    </View>
                </motion.div>
            </AnimatePresence>
        </View>
    );
}
