import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Pressable, StatusBar
} from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Allura_400Regular } from '@expo-google-fonts/allura';
import {useCallback, useEffect, useState} from "react";
import { FontAwesome } from '@expo/vector-icons';
SplashScreen.preventAutoHideAsync();
export default function Home({navigation}) {
    const [appIsReady, setAppIsReady] = useState(false);
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [canLoadMore, setCanLoadMore] = useState(true)

    const [fontsLoaded] = useFonts({
        Allura_400Regular
    });
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady && fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady, fontsLoaded]);
    const fetchData = async (page = 1) => {
        if(canLoadMore){
            const res = await fetch(`https://pan-pal-backend.vercel.app/home?page=${page}`, {
                method: "GET",
            })
            const resJson = await res.json()
            if(resJson){
                if(page === 1 ){
                    setData(resJson)
                }else{
                    setData(prevState => [...prevState, ...resJson])
                }
            }else{
                setCanLoadMore(false)
            }
        }
        return true;
    }
    useEffect(() => {
        async function prepare() {
            try {
                await fetchData()
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare()
    }, []);

    if (!fontsLoaded && !appIsReady) {
        return null;
    }

    const Item = ({item}) => {
        const categoryName = item[0];
        const foods = item.slice(1)
        return (
            <>
                <Text style={styles.itemCategoryName}>{categoryName}</Text>

                <View style={styles.itemFoodContainer}>
                    {foods.map((food, index) => {
                        let difficultyColor;

                        switch (food.difficult) {
                            case 'Easy':
                                difficultyColor = 'green';
                                break;
                            case 'More effort':
                                difficultyColor = 'yellow';
                                break;
                            case 'A challenge':
                                difficultyColor = 'red';
                                break;
                            default:
                                difficultyColor = 'white';
                        }
                        return (
                            index === 0 ?
                                null
                                :
                                <Pressable onPress={() => {navigation.navigate('Recipe', {_id: food._id})}} style={styles.foodCategory} key={index}>
                                    <Image style={styles.foodImage} source={{uri: food.image}}/>
                                    <View style={{ flexDirection: "column", gap: 10, flex: 1}}>
                                        <Text style={{color: 'white', fontWeight: "500", fontSize: 16}}>{food.name}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            gap: 20,
                                        }}>
                                            <View style={styles.foodPreparationContainer}>
                                                <FontAwesome name="clock-o" size={12} color="#4871FF" />
                                                <Text style={styles.foodFiltersText}>{food.times.Preparation}</Text>
                                            </View>
                                            <View style={{...styles.foodDifficultyContainer, borderColor: difficultyColor}}>
                                                <Text style={{color : difficultyColor, fontSize:12}}>{food.difficult}</Text>
                                            </View>
                                            <View style={styles.foodRatingContainer}>
                                                <FontAwesome name="star" size={12} color="orange" />
                                                <Text style={styles.foodFiltersText}>{food.ratings}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                        )
                    })}
                </View>
        </>
        )
    }

    const header = () => {
        return <View style={styles.container}>
            <StatusBar backgroundColor="#292A31"/>

            <Text style={styles.headerText}>PanPal</Text>

            <Pressable onPress={() => {
                navigation.navigate('Search')
            }} style={styles.headerSearchContainer}>
                <FontAwesome name="search" size={24} color="white" />
                <Text style={{color:'white'}}>Search Recipes...</Text>
            </Pressable>

        </View>
    }

    return (
        <View onLayout={onLayoutRootView}>
            <FlatList
            data={data}
            style={styles.container}
            renderItem={Item}
            ListHeaderComponent={header}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
                setPage(prevState => prevState + 1)
                fetchData(page)
            }}
            onEndReachedThreshold={0.2}/>
        </View>
    )
}

const styles = StyleSheet.create({
    itemCategoryName: {fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 20, marginBottom: 20},
    container: {backgroundColor: '#292A31', padding: 10,},
    itemFoodContainer: {flexDirection: 'column', gap: 20, paddingBottom: 10},
    input: {flex: 1, height: '100%', color: 'white', borderWidth: 0,},
    foodCategory: {flexDirection: 'row', alignItems: 'center', gap: 15},
    foodImage: {height: 80, width: 80, borderRadius: 15},
    foodText: {textAlign: 'center', color: 'white'},
    foodPreparationContainer: {flexDirection: 'row', alignItems: 'center', gap:10,borderWidth: 1, borderColor: '#4871FF', borderRadius: 15, paddingVertical:4, paddingHorizontal: 8},
    foodFiltersText:{color: '#4871FF', fontSize:12},
    foodDifficultyContainer:{borderWidth: 1, borderRadius: 15, paddingVertical:4, paddingHorizontal: 8},
    foodRatingContainer: {flexDirection: 'row', alignItems: 'center', gap:10,borderWidth: 1, borderColor: 'white', borderRadius: 15, paddingVertical:4, paddingHorizontal: 8},
    headerText: {fontFamily: 'Allura_400Regular', fontSize: 50, color: 'white', textAlign: 'center'},
    headerSearchContainer:{display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40, margin: 10, borderWidth: 2, paddingHorizontal: 10, gap:10, borderRadius: 20, borderColor: 'white', color:'white'},

});
