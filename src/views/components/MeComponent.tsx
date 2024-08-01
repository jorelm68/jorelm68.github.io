import { useState, useEffect } from "react";
import photos from "../../data/constants/photos";
import PhotoComponent from "./PhotoComponent";
import { motion } from "framer-motion";
import View from "./View";
import { useAppSelector } from "../../data/redux/hooks";

export default function MeComponent() {
    const { screen = 'LandingScreen' } = useAppSelector(state => state.global);

    const aspectRatio = 1248 / 1102; // Example aspect ratio. Replace with your image's actual aspect ratio.
    const imageHeight = '75vh';

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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: screen === 'LandingScreen' ? 1 : 0 }}
                transition={{ duration: screen === 'LandingScreen' ? 1 : 0.35 }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: imageHeight,
                    display: 'flex',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    pointerEvents: 'none', // Ignore mouse events for this component
                    minWidth: `calc(75vh * ${aspectRatio})`, // Min width relative to height
                    maxWidth: '100%',
                }}
            >
                <PhotoComponent photo={photos.me} />
            </motion.div>
        </View>
    );
}
