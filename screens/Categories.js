import {StyleSheet, View, Text, FlatList, Pressable, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";

export default function Categories({navigation}) {
    const [categories, setCategories] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        async function getCategories() {
            const res = await fetch(`https://pan-pal-backend.vercel.app/categories`, {
                method: "GET",
            })
            const result = await res.json()
            if(result){
                setCategories(result)
            }
        }
        if(isFocused && categories.length === 0) {
            getCategories()
        }
    }, [isFocused]);
    const Item = ({item}) => {
        console.log(item)
        return (
            <Pressable onPress={() => {navigation.navigate('Category', {category: item})}} style={styles.item}>
                <Text style={{color: 'white'}}>{item}</Text>
            </Pressable>
        )
    }
    const header = () => {
        return (
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Categories List</Text>
            </View>
        )
    }
    const loadingData = () => {
        return (
            <View style={styles.loadingDataView}>
                <ActivityIndicator size="large" color="#4871FF"/>
            </View>
        )
    }
    return (
        <FlatList contentContainerStyle={{ flexGrow: 1 }} data={categories} ListHeaderComponent={header} ListEmptyComponent={loadingData} keyExtractor={(item, index) => index.toString()} renderItem={Item}/>
    )
}
const styles = StyleSheet.create({
    item: {padding: 10, borderWidth: 1, borderColor: '#4871FF', borderRadius: 15, margin: 10},
    headerView: {backgroundColor: '#292A31', paddingVertical: 10},
    headerText: {fontWeight: '700', fontSize: 24, textAlign: 'center', color: 'white'},
    loadingDataView: {flex: 1, alignItems: "center", justifyContent: "center"}
})