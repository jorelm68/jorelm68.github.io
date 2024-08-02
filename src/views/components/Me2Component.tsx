import { motion } from "framer-motion";
import photos from "../../data/constants/photos";
import { useAppSelector } from "../../data/redux/hooks";
import PhotoComponent from "./PhotoComponent";
import View from "./View";

export default function Me2Component() {
    const { screen } = useAppSelector(state => state.global);

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            paddingTop: 48,
            zIndex: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: screen === 'ContactScreen' ? 1 : 0 }}
                transition={{ duration: screen === 'ContactScreen' ? 1 : 0.35 }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    maxWidth: '1200px',
                    zIndex: 2,
                }}
            >
                <PhotoComponent
                    photo={photos.me2}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 2,
                        marginBottom: 44,
                    }}
                />
            </motion.div>
        </View>
    );
}
