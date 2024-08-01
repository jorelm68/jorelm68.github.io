import { useEffect, useState } from "react";
import { useAppSelector } from "../../data/redux/hooks";
import photos, { Photos } from "../../data/constants/photos";
import { AnimatePresence, motion } from "framer-motion";
import constants from "../../data/constants/constants";

const BackdropComponent = () => {
    const { screen } = useAppSelector(state => state.global);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex === 24) {
                    return 1;
                }
                else {
                    return prevIndex + 1;
                }
            });
        }, 20000);

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
                        x: { duration: 25, ease: "linear" }  // Adjust the duration as needed
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