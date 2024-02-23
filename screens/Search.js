import {FlatList, Pressable, StatusBar, StyleSheet, TextInput, View, Text} from "react-native";
import {FontAwesome, FontAwesome6, Ionicons} from '@expo/vector-icons';
import {useEffect, useState} from "react";
export default function Search({navigation}) {
    const [userSearch, setUserSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState(1)
    const [loadMoreMessage, setLoadMoreMessage] = useState("Load More")

    useEffect(() => {
        async function search() {
            if(userSearch !== ''){
                const res = await fetch(`https://pan-pal-backend.vercel.app/search?userSearch=${userSearch}&page=${1}`, {
                    method: "GET",
                })
                const result = await res.json()
                if(result){
                    setSearchResults(result)
                }
            }else{
                setSearchResults([])
            }
        }
        const delayDebounceFn = setTimeout(search, 500);
        return () => clearTimeout(delayDebounceFn);
        }, [userSearch]);

    const getMoreResults = async () => {
        if(userSearch){
            const res = await fetch(`https://pan-pal-backend.vercel.app/search?userSearch=${userSearch}&page=${page + 1}`, {
                method: "GET",
            })
            const result = await res.json()
            if(result){
                setSearchResults(prevState => [...prevState , ...result])
            }else{
                setLoadMoreMessage("No more data")
            }
        }else{
            setSearchResults([])}
    }

    const Item = ({item}) => {
        const regex = new RegExp(`(${userSearch})`, 'gi');
        const parts = item.name.split(regex);
        return (
            <Pressable onPress={()=> {navigation.navigate("Recipe", {_id: item._id})}} style={styles.itemContainer}>
                <FontAwesome name="search" size={24} color="white" />
                <Text style={styles.itemText}>
                    {parts.map((part, index) => (
                        regex.test(part) ? (
                            <Text key={index} style={{ fontWeight: 'bold' }}>
                                {part}
                            </Text>
                        ) : (
                            <Text key={index}>{part}</Text>
                        )
                    ))}
                </Text>
                <Pressable onPress={() => {setUserSearch(item.name)}} style={styles.itemUpArrowContainer}><FontAwesome6 name="arrow-turn-up" size={16} color="white" /></Pressable>
            </Pressable>
        )
    }
    return (
        <>
            <StatusBar backgroundColor="#292A31"/>
            <View style={styles.headerContainer}>
                <Pressable onPress={()=> {
                    navigation.goBack()
                }}><Ionicons name="chevron-back-outline" size={32} color="white" /></Pressable>
                <View style={styles.searchContainer}>
                    <FontAwesome name="search" size={24} color="white" />
                    <TextInput placeholder="Search Recipes..." placeholderTextColor="white" autoFocus={true} value={userSearch} onChangeText={(e) => setUserSearch(e)} style={styles.searchInput}/>
                    {userSearch ? <Pressable onPress={() => {setUserSearch("")}}><Ionicons name="close-circle-outline" size={24} color="white"/></Pressable> : null}
                </View>
            </View>
            <FlatList data={searchResults}
                      renderItem={Item}
                      keyExtractor={(item, index) => index.toString()}
                      ListFooterComponent={
                searchResults.length > 0 && searchResults.length % 10 === 0 ?
                    <Pressable onPress={() => {
                          setPage(prevState => prevState + 1)
                          getMoreResults()}}>
                          <Text style={styles.loadMoreText}>{loadMoreMessage}</Text>
                    </Pressable>
                    :
                    <></>
            }
            />
        </>
    )
}
const styles = StyleSheet.create({
    headerContainer: {flexDirection: 'row', padding: 10, backgroundColor: '#292A31', alignItems: "center", gap: 10},
    searchContainer:{flex: 1, flexDirection:'row', gap:10, alignItems: 'center', height: "100%", borderWidth: 2, borderRadius: 20, borderColor: 'white', paddingHorizontal: 10, paddingVertical: 5},
    searchInput: {flex: 1, height: "100%", color:'white'},
    itemContainer: {flexDirection: 'row', gap:15, margin: 15, alignItems: 'center'},
    itemUpArrowContainer:{alignSelf: 'flex-end',height: '100%', flexDirection: 'row', alignItems: 'center'},
    itemText:{fontSize: 16, color:'white'},
    loadMoreText: {textAlign: 'center', fontWeight: '500', fontSize: 16, color: 'white'},
})