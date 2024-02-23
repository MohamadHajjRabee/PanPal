import {StyleSheet, View, Text, FlatList, Pressable, Image, Dimensions} from "react-native";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import LoadingData from "../components/LoadingData";

export default function Category({navigation, route}) {
    const [categoryRecipes, setCategoryRecipes] = useState([])
    const isFocused = useIsFocused();
    useEffect(() => {
        const category = route.params.category

        async function getCategoryRecipes() {
            const res = await fetch(`https://pan-pal-backend.vercel.app/category/${category}`, {
                method: "GET",
            })
            const result = await res.json()
            if(result){
                setCategoryRecipes(result)
            }
        }
        if(isFocused && categoryRecipes.length === 0){
            getCategoryRecipes()
        }
    }, [isFocused]);
    const Item = ({item}) => {
        const itemWidth = Dimensions.get('window').width / 3 - 20
        return (
            <Pressable onPress={() => {navigation.navigate('Recipe', {_id: item._id})}} style={{...styles.itemContainer, width: itemWidth}}>
                <Image source={{ uri : `${item.image}?resize=${itemWidth - 4},70`}} style={{...styles.itemImage, width:itemWidth - 4}}/>
                <Text style={styles.itemText} numberOfLines={2}>{item.name}</Text>
            </Pressable>

        )
    }
    const header = () => {
        const category = route.params.category
        return (category &&

            <View style={styles.headerContainer}>
                <Pressable onPress={() => {
                    navigation.goBack()
                }}>
                    <Ionicons name="chevron-back-outline" size={32} color="white"/>
                </Pressable>
                <Text style={styles.headerText}>{`${category} Recipes`}</Text>
            </View>

        )
    }

    return (
        <FlatList contentContainerStyle={{ flexGrow: 1 }} horizontal={false} numColumns={3} data={categoryRecipes} renderItem={Item} ListHeaderComponent={header} ListEmptyComponent={LoadingData} keyExtractor={(item, index) => index.toString()}/>
    )
}

const styles = StyleSheet.create({
    itemContainer: { margin: 10,  alignItems: 'center', borderWidth: 2, borderRadius: 15, borderColor: '#FFB700', backgroundColor: "#FFB700"},
    itemImage: {height:70, borderTopRightRadius: 15, borderTopLeftRadius: 15},
    itemText: {textAlign: 'center', color: '#292A31',padding: 3, fontWeight: '500'},
    headerContainer: {flexDirection: 'row', alignItems: 'center', paddingRight: 42, paddingVertical: 10, paddingLeft: 10},
    headerText: {flex: 1, textAlign: 'center', color: 'white', fontSize: 24, fontWeight: '700'},
})