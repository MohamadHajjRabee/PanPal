import {StyleSheet, View, Text, Pressable, StatusBar, Image, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useWindowDimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styleSheet from "react-native-web/src/exports/StyleSheet";

export default function Recipe({navigation, route}) {
    const [recipe, setRecipe] = useState({})
    const [recipeIsInFavorite, setRecipeIsInFavorite] = useState(false)
    const {height, width} = useWindowDimensions();
    useEffect(() => {
        const _id = route.params._id
        async function getRecipe() {
            const res = await fetch(`https://pan-pal-backend.vercel.app/recipe/${_id}`, {
                method: "GET",
            })
            const result = await res.json()
            if(result){
                console.log(result)

                setRecipe(result)
            }
        }
        async function checkIfRecipeInFavorites() {
            try {
                let favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];

                if(favorites.some((list) => list._id === _id)){
                    setRecipeIsInFavorite(true)
                }

            } catch (e) {
                console.error(e)
            }
        }
        getRecipe()
        checkIfRecipeInFavorites()
    }, []);

    const toggleRecipeInFavorites = async () => {
        const _id = route.params._id
        if(recipeIsInFavorite){
            try {
                let  favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
                favorites = favorites.filter(recipe => {return recipe._id !== _id});
                await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
                setRecipeIsInFavorite(false)

            } catch (e) {
                console.error(e)
            }
        }else{
            try {
                const  favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
                favorites.push({
                    _id: _id,
                    name: recipe.name,
                    image: recipe.image
                });
                await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
                setRecipeIsInFavorite(true)
            } catch (e) {
                console.error(e)
            }
        }
    }

    const SectionItem = ({text}) => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', padding:10, gap:10}}>
            <View style={{height: 2, backgroundColor: '#4871FF', flex: 1}}/>
            <Text style={{color: '#4871FF', fontWeight: '700'}}>{text}</Text>
            <View style={{height: 2, backgroundColor: '#4871FF', flex: 1}}/>
        </View>
        )
    }
    return (
        recipe.name &&(
    <LinearGradient colors={['#292A31', '#383a46']}>
        <StatusBar backgroundColor="#292A31"/>
        <ScrollView>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => {
                    navigation.goBack()
                }}>
                    <Ionicons name="chevron-back-outline" size={32} color="white"/>
                </Pressable>
                <Text style={styles.headerRecipeName}>{recipe.name}</Text>
            </View>
            <Image style={styles.recipeImage} source={{uri: `${recipe.image}?resize=${width},250`}}/>
            <Pressable onPress={toggleRecipeInFavorites}  style={{position: 'absolute', top: 275, right: 10}} ><MaterialIcons name={`favorite${recipeIsInFavorite ? '' : '-border'}`} size={28} color="#292A31" /></Pressable>
            <View style={styles.recipeInfoContainer}>
                <Text>Preparation: {recipe.times.Preparation}</Text>
                <Text>Cooking: {recipe.times.Cooking}</Text>
                <Text>Reviews: {recipe.ratings} ({recipe.vote_count})</Text>
                <Text>Difficulty: {recipe.difficult}</Text>
                <Text>Serves: {recipe.serves}</Text>
            </View>
            {recipe.nutrients && <View style={styles.recipeNutrientsContainer}>
                <View>
                    <Text style={styles.recipeNutrientsText}>🍞 Carbs: {recipe.nutrients.carbs}</Text>
                    <Text style={styles.recipeNutrientsText}>🥑 Fat: {recipe.nutrients.fat}</Text>
                    <Text style={styles.recipeNutrientsText}>🌾 Fibre: {recipe.nutrients.fibre}</Text>
                    <Text style={styles.recipeNutrientsText}>🔥 Kcal : {recipe.nutrients.kcal}</Text>
                </View>
                <View>
                    <Text style={styles.recipeNutrientsText}>🍗 Protein: {recipe.nutrients.protein}</Text>
                    <Text style={styles.recipeNutrientsText}>🧂 Salt: {recipe.nutrients.salt}</Text>
                    <Text style={styles.recipeNutrientsText}>🧈 Saturates: {recipe.nutrients.saturates}</Text>
                    <Text style={styles.recipeNutrientsText}>🍭 Sugars: {recipe.nutrients.sugars}</Text>
                </View>
            </View>}
            <SectionItem text="Description"/>
            <View>
                <Text style={styles.text}>{recipe.description}</Text>
            </View>
            <SectionItem text="Ingredients"/>
            <View>
                {recipe.ingredients.map((item, index) => {
                    return(
                        <Text key={index} style={styles.text}>- {item}</Text>
                    )
                })}
            </View>
            <SectionItem text="Steps"/>
            <View>
                {recipe.steps.map((item, index) => {
                    return(
                        <Text key={index} style={styles.text}>{index + 1}) {item}</Text>
                    )
                })}
            </View>
        </ScrollView>
    </LinearGradient>
    ))
}
const styles = StyleSheet.create({
    headerContainer:{flexDirection: 'row', alignItems: 'center', paddingRight: 42, paddingVertical: 10, paddingLeft: 10},
    headerRecipeName: {flex: 1, textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '700'},
    recipeImage:{width: '100%', height: 250},
    recipeInfoContainer:{backgroundColor: '#FFB700', flexDirection: 'row', margin: 10, padding:10, borderRadius:15, flexWrap: 'wrap', gap: 15, justifyContent: 'space-evenly'},
    recipeNutrientsContainer: {flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-around'},
    recipeNutrientsText:{color: 'white', fontSize: 16, padding: 10},
    text: {color: 'white', padding: 10}
})