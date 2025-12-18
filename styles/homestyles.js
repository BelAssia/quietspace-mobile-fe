import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex: 1,
        backgroundColor: '#dce0ffff',
        alignItems:'center',
        justifyContent: 'center',
    },
   
    imageCard:{
        marginBottom: 20,
    },
    image:{
       width: 310,
       height: 100,
       resizeMode: 'contain',
    },
    subtitle:{
        color: '#4b5f83ff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonText:{
        color: '#120217ff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        backgroundColor: '#faf5fcff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        width: '60%',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default styles;