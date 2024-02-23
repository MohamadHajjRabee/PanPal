import {View, Text, FlatList, Image, Pressable, ActivityIndicator} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import { useIsFocused } from '@react-navigation/native';
import LoadingData from "../components/LoadingData";
import styleSheet from "react-native-web/src/exports/StyleSheet";


export default function Favorites({navigation}) {
    const [favoritesList, setFavoritesList] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(true)
    const isFocused = useIsFocused();

    useEffect(() => {
        const getFavoritesList = async () => {
            try {
                const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || []
                setFavoritesList(favorites)

            } catch(e) {
                console.error(e)
            }
        }
        if(isFocused){
            getFavoritesList()
            setIsLoadingData(false)
        }
    }, [isFocused]);
    const Item = ({item}) => {
        return (
            <Pressable onPress={() => navigation.navigate('Recipe', {_id: item._id})} style={styles.itemContainer}>
                <Image style={styles.itemImage} source={{uri: `${item.image}?resize=50,50`}}/>
                <Text style={styles.itemText}>{item.name}</Text>
            </Pressable>
        )
    }
    const header = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Favorites List</Text>
            </View>
        )
    }
    const emptyListContainer = () => {
        return (
            <View style={styles.emptyListContainer}>
                <Text style={{color: 'white'}}>The List Is Empty</Text>
            </View>
        )
    }

    return (
        <FlatList contentContainerStyle={{ flexGrow: 1 }} data={favoritesList} renderItem={Item} ListHeaderComponent={header} ListEmptyComponent={isLoadingData ? LoadingData : emptyListContainer} keyExtractor={(item, index) => index.toString()}/>
    )
}

const styles = styleSheet.create({
    itemContainer: {flexDirection: 'row', gap:10, padding: 10, backgroundColor: '#292A31'},
    itemImage: {width: 50, height: 50},
    itemText: {color: 'white', fontWeight: '500'},
    headerContainer: {backgroundColor: '#292A31', paddingVertical: 10},
    headerText: {fontWeight: '700', fontSize: 24, textAlign: 'center', color: 'white'},
    emptyListContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})