import { useState, useEffect } from "react";
import photos from "../../data/constants/photos";
import PhotoComponent from "./PhotoComponent";
import { motion } from "framer-motion";
import View from "./View";
import { useAppSelector } from "../../data/redux/hooks";

export default function Me2Component() {
    const { screen } = useAppSelector(state => state.global);

    const aspectRatio = 2048 / 1152; // Example aspect ratio. Replace with your image's actual aspect ratio.
    const imageHeight = '75vh';

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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: screen === 'ContactScreen' ? 1 : 0 }}
                transition={{ duration: screen === 'ContactScreen' ? 1 : 0.35 }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0, // Aligned to the right side of the screen
                    height: imageHeight,
                    display: 'flex',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    minWidth: `calc(75vh * ${aspectRatio})`, // Min width relative to height
                    maxWidth: '100%',
                    pointerEvents: 'none', // Ignore all pointer events
                }}
            >
                <PhotoComponent photo={photos.me2} />
            </motion.div>
        </View>
    );
}
