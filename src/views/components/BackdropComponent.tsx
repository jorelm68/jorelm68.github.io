import { useEffect, useState } from "react";
import { useAppSelector } from "../../lib/redux/hooks";
import files from "../../lib/files";
import { AnimatePresence, motion } from "framer-motion";
import constants from "../../lib/constants";
import styles from "../../lib/styles";
import { Files } from "../../lib/types";

const BACKDROP_WIDTH = '110%';
const BACKDROP_START = '0%';
const BACKDROP_END = '-5%';
const QUICK_TRANSITION = 0.35;
const SLOW_TRANSITION = 2;
const SLIDING_DURATION = 20;
const PHOTO_INTERVAL = 15000;
const TINTED = 0.33;

const BackdropComponent = () => {
    const { screen } = useAppSelector(state => state.global);
    const [index, setIndex] = useState(Math.floor(Math.random() * constants.NUM_GENERIC_PHOTOS) + 1);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * constants.NUM_GENERIC_PHOTOS) + 1;
            setIndex(randomNumber);
        }, PHOTO_INTERVAL);

        return () => clearInterval(interval);
    }, [])

    const key = `generic${index}` as keyof Files;
    const photo = files[key];

    return (
        <div className="container" style={{
            ...styles.absolute,
            width: BACKDROP_WIDTH,
            backgroundColor: styles.colors.black,
            zIndex: constants.Z_FAR_BACK,
        }}>
            <AnimatePresence>
                <motion.img
                    key={index}
                    src={photo}
                    alt="Backdrop"
                    initial={{ opacity: 0, x: BACKDROP_START }}
                    animate={{
                        opacity: constants.NO_BACKDROP.includes(screen) ? 0 : TINTED,
                        x: BACKDROP_END,
                    }}
                    exit={{ opacity: 0, x: BACKDROP_END }}
                    transition={{
                        opacity: { duration: constants.NO_BACKDROP.includes(screen) ? QUICK_TRANSITION : SLOW_TRANSITION },
                        x: { duration: SLIDING_DURATION, ease: "linear" }
                    }}
                    style={{
                        ...styles.absolute,
                        objectFit: 'cover',
                    }}
                />
            </AnimatePresence>
        </div>
    )


}

export default BackdropComponent;