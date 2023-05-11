import { StyleSheet } from "react-native";
import theme from "./theme";

export const commonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        left: 6,
        zIndex: 10,
        position: 'absolute',
    },
    containerList: {
        borderRadius: 15,
        padding: 0,
        marginBottom: 16,
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.9,
        shadowRadius: 15,
        elevation: 8,
    },
    imageInBack: {
        flex: 1,
        width: 230,
        height: 140,
        top: 10,
        left: 72,
        position: 'absolute',
    },
    cardContainer: {
        flex: 1,
        width: 320,
        height: 210,
        overflow: 'hidden',
        borderWidth: 0,
        marginVertical: 1,
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    txt: {
        fontSize: 16,
        fontWeight: theme.fontWeight.bold,
        top: 154,
        left: 10,
        position: 'absolute',
    },
    icon: {
        marginTop: 5,
    }
});