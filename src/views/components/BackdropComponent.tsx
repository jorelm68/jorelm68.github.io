import { useEffect, useState } from "react";
import { useAppSelector } from "../../data/redux/hooks";
import photos, { Photos } from "../../data/constants/photos";
import { AnimatePresence, motion } from "framer-motion";
import constants from "../../data/constants/constants";
import axios from "axios";

const BackdropComponent = () => {
    const { screen } = useAppSelector(state => state.global);
    const [index, setIndex] = useState(Math.floor(Math.random() * 71) + 1);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 71) + 1;
            setIndex(randomNumber);
        }, 15000);

        return () => clearInterval(interval);
    }, [])

    const key = `generic${index}` as keyof Photos;
    const photo = photos[key];

    return (
        <div className="container" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '110%',
            height: '110%',
            backgroundColor: 'black',
            zIndex: -100,
        }}>
            <AnimatePresence>
                <motion.img
                    key={index}
                    src={photo}
                    alt="Backdrop"
                    initial={{ opacity: 0, x: '0%' }}
                    animate={{
                        opacity: constants.NO_BACKDROP.includes(screen) ? 0 : 0.33,
                        x: '-5%'
                    }}
                    exit={{ opacity: 0, x: '-5%' }}
                    transition={{
                        opacity: { duration: constants.NO_BACKDROP.includes(screen) ? 0.350 : 2 },
                        x: { duration: 20, ease: "linear" }  // Adjust the duration as needed
                    }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </AnimatePresence>
        </div>
    )


}

export default BackdropComponent;