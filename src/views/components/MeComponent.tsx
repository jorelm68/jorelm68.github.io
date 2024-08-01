import { useState, useEffect } from "react";
import photos from "../../data/constants/photos";
import PhotoComponent from "./PhotoComponent";
import { motion } from "framer-motion";

export default function MeComponent() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            setOpacity(window.innerWidth >= 1000 ? 1 : 0);
        };

        // Set initial opacity
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '75vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                maxWidth: '100%',
                // Setting a maximum width based on image aspect ratio can be done dynamically
            }}
        >
            <PhotoComponent photo={photos.me} />
        </motion.div>
    );
}
