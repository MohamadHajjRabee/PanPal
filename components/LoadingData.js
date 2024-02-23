import {ActivityIndicator, View} from "react-native";

const LoadingData = () => {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator size="large" color="#4871FF"/>
        </View>
    )
}

export default LoadingData