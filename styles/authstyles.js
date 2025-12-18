import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dce0ffff',
    },
    headerContainer:{
        width:'100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: '#814470ff',
        alignItems:'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#120217ff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#4b5f83ff',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        color: '#120217ff',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#814470ff',
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#814470ff',
        borderRadius: 12,
        paddingVertical: 16,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        paddingVertical: 16,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#814470ff',
    },
    secondaryButtonText: {
        color: '#814470ff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    dividerText: {
        marginHorizontal: 15,
        color: '#4b5f83ff',
        fontSize: 14,
    },
    footerText: {
        textAlign: 'center',
        color: '#4b5f83ff',
        fontSize: 14,
        marginTop: 20,
        marginBottom: 30,
    },
    linkText: {
        color: '#814470ff',
        fontWeight: 'bold',
    },
});

export default styles;