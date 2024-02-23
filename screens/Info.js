import {View, Text, Linking, Pressable} from "react-native";
import styleSheet from "react-native-web/src/exports/StyleSheet";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";

export default function Info() {
    return (
        <View style={styles.container}>
            <Text style={styles.appLogo}>PanPal</Text>
            <Text style={styles.text}>Made By Mohamad Hajj Rabee</Text>
            <Text style={styles.text}>All culinary recipes featured in this application are sourced from BBC Good Food.</Text>
            <View style={styles.linksContainer}><AntDesign name="github" size={32} color="white" /><Pressable onPress={() => {Linking.openURL("https://github.com/MohamadHajjRabee")}}><Text style={{textDecorationLine: 'underline', ...styles.text}}>MohammadHajjRabee</Text></Pressable></View>
            <View style={styles.linksContainer}><MaterialIcons name="email" size={32} color="white" /><Pressable onPress={() => {Linking.openURL("mailto:mohamad.hajjrabee@gmail.com")}}><Text style={{textDecorationLine: 'underline', ...styles.text}}>mohamad.hajjrabee@gmail.com</Text></Pressable></View>
        </View>
    )
}
const styles = styleSheet.create({
    container:{flex: 1, alignItems: "center", justifyContent: "center", flexDirection: 'column', gap: 25, padding: 15},
    appLogo:{fontSize: 50, color: 'white', textAlign: 'center'},
    text: {color: 'white', fontSize: 16, fontWeight: '500', textAlign: 'center'},
    linksContainer: {flexDirection: 'row', alignItems: 'center', gap:15}
})