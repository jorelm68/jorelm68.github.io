import { motion } from "framer-motion";
import files from "../../lib/files";
import { useAppSelector } from "../../redux/hooks";
import PhotoComponent from "./PhotoComponent";
import View from "./View";
import constants from "../../lib/constants";
import styles from "../../lib/styles";

const MAX_WIDTH = '700px';

export default function Me1Component() {
    const { screen } = useAppSelector(state => state.global);

    return (
        <View style={{
            ...styles.absolute,
            paddingTop: constants.HEADER_HEIGHT,
            zIndex: constants.Z_MIDDLE,
            ...styles.center,
            pointerEvents: 'none',
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: screen === constants.ME1_SCREEN ? 1 : 0 }}
                transition={{ duration: screen === constants.ME1_SCREEN ? constants.SLOW_TRANSITION : constants.QUICK_TRANSITION }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    maxWidth: MAX_WIDTH,
                }}
            >
                <PhotoComponent 
                    photo={files.me1} 
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        marginBottom: constants.BOTTOM_ADJUSTMENT,
                    }} 
                />
            </motion.div>
        </View>
    );
}
