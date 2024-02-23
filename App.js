import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from "./screens/Home";
import Favorites from "./screens/Favorites";
import Categories from "./screens/Categories";
import Info from "./screens/Info";
import Search from "./screens/Search";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Recipe from "./screens/Recipe";
import Category from "./screens/Category";

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#292A31',
    },
};

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {

  return (
      <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{
              headerShown: false
          }}>
              <Stack.Screen name="Main" component={HomeTabs} />
              <Stack.Screen name="Search" component={Search} options={{
                  animationTypeForReplace: 'pop',
                  animation: 'slide_from_right'
              }}/>
              <Stack.Screen name="Recipe" component={Recipe} options={{
                  animationTypeForReplace: 'pop',
                  animation: 'slide_from_right'
              }}/>
              <Stack.Screen name="Category" component={Category} options={{
                  animationTypeForReplace: 'pop',
                  animation: 'slide_from_right'
              }}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
    function HomeTabs() {
        return (
            <Tab.Navigator tabBarPosition="bottom" screenOptions={{
                tabBarActiveTintColor: "#4871FF",
                tabBarInactiveTintColor: "#ffffff",
                tabBarShowLabel: false,
                headerShown:false,
                tabBarStyle:{
                    height: 50,
                    backgroundColor: '#292A31',
                    borderTopWidth: 0.3,
                    borderColor: "#000",
                },
                tabBarIndicatorStyle: {
                    height: 0,
                },
            }}>
                <Tab.Screen name='Home' component={Home} options={{tabBarIcon: ({focused})=> {
                        return (
                                <AntDesign name="home" size={24} color={focused ? "#4871FF" : "#ffffff"} />
                        )
                    }}}/>
                <Tab.Screen name='Favorites' component={Favorites} options={{tabBarIcon: ({focused})=> {
                        return (
                                <MaterialIcons name="favorite-border" size={24} color={focused ? "#4871FF" : "#ffffff"} />
                        )
                    }}}/>
                <Tab.Screen name='Categories' component={Categories} options={{tabBarIcon: ({focused})=> {
                        return (
                                <AntDesign name="bars" size={24} color={focused ? "#4871FF" : "#ffffff"} />
                        )
                    }}}/>
                <Tab.Screen name='Info' component={Info} options={{tabBarIcon: ({focused})=> {
                        return (
                                <MaterialIcons name="info-outline" size={24} color={focused ? "#4871FF" : "#ffffff"} />
                        )
                    }}}/>
            </Tab.Navigator>
        );
    }
}

