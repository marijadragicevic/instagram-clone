import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import Story from "../components/home/stories/Story";

import Test3 from "../screens/Test3";

import { getThemeColors } from "../utilities/theme";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { COLORS } from "../constants/Colors";

import HomeScreen from "../screens/HomeScreen";
import NewPostScreen from "../screens/AddPostScreens/NewPostScreen";
import MessagesScreen from "../screens/MessagesScreen";
import Header from "../components/home/header/Header";
import NotificationScreen from "../screens/NotificationScreen";
import SearchScreen from "../screens/SearchScreen";

import PreviewPost from "../screens/AddPostScreens/PreviewPost";
import LocationPickerScreen from "../screens/AddPostScreens/LocationPickerScreen";
import MessageChat from "../components/messages/MessageChat";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostListScreen from "../screens/PostListScreen";
import CommentViewScreen from "../screens/CommentViewScreen";
import AddStoryScreen from "../screens/AddStoryScreen";
import ProfileSearchScreen from "../screens/ProfileSearchScreen";

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TopTabs = createMaterialTopTabNavigator();

const SideNavigation = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: backgroundColor },
        headerTintColor: textColor,
        tabBarStyle: { backgroundColor: backgroundColor },
        tabBarActiveTintColor: textColor,
        tabBarShowLabel: false,
      }}
    >
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={28}
              color={color}
            />
          ),
          // headerShown: false,
          header: (props) => <Header />,
        }}
      />
      <BottomTabs.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Feather name="plus-square" size={28} color={color} />
          ),
          title: "New Post",
          tabBarStyle: { display: "none" },
        }}
      />
      <BottomTabs.Screen
        name="Test3"
        component={Test3}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "movie-play" : "movie-play-outline"}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <Story
              user=""
              image=""
              disableGradient={true}
              imageStyle={{
                height: 28,
                width: 28,
                borderWidth: focused ? 2 : 0,
                borderColor:
                  focused && !isDarkLogo
                    ? COLORS.global.white
                    : COLORS.global.black,
              }}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const Navigation = () => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: backgroundColor },
          headerTintColor: textColor,
        }}
      >
        {/* home screen  */}
        <Stack.Screen
          name="SideNavigation"
          component={SideNavigation}
          options={{ headerShown: false }}
        />

        {/* login / signup / forget password */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ title: "" }}
        />

        {/* post list */}
        <Stack.Screen name="PostListScreen" component={PostListScreen} />

        {/* comment screen (add,view) */}
        <Stack.Screen
          name="CommentViewScreen"
          component={CommentViewScreen}
          options={{ title: "Comments" }}
        />

        {/* story screens */}
        <Stack.Screen name="AddStoryScreen" component={AddStoryScreen} />

        {/* message screens list,chat*/}
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="MessageChat" component={MessageChat} />

        {/* add post screens */}
        <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
        <Stack.Screen name="PreviewPost" component={PreviewPost} />
        <Stack.Screen
          name="LocationPickerScreen"
          component={LocationPickerScreen}
          options={{ title: "Add Location" }}
        />

        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />

        {/* profile search screen */}
        <Stack.Screen
          name="ProfileSearchScreen"
          component={ProfileSearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
