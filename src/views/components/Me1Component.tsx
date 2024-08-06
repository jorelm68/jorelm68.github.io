import { motion } from "framer-motion";
import photos from "../../data/constants/photos";
import { useAppSelector } from "../../data/redux/hooks";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import constants from "../../data/constants/constants";

export default function Me1Component() {
    const { screen } = useAppSelector(state => state.global);

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            paddingTop: 48,
            zIndex: constants.Z_MIDDLE,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: screen === 'LandingScreen' ? 1 : 0 }}
                transition={{ duration: screen === 'LandingScreen' ? 1 : 0.35 }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    maxWidth: '700px',
                }}
            >
                <PhotoComponent 
                    photo={photos.me1} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        marginBottom: 44,
                    }} 
                />
            </motion.div>
        </View>
    );
}
