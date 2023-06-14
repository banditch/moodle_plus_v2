import { View, Text, ImageBackground, Image, TextInput, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {useFonts} from 'expo-font'
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, resetUser, setUserData } from '../features/UserDataSlice';


const LoginScreen = () => {

  //LOADING FONTS
  const [fontsLoaded] = useFonts({
    'Roboto_BK': require('../assets/fonts/Roboto-Black.ttf'),
  });
  //LOADING FONTS

  //DEFINING HOOKS
  const navigation = useNavigation()
  const dispatch = useDispatch()
  //DEFINING HOOKS


  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")

  const [isLoggingIn, setIsLogingIn] = useState(false)

  //FIRESTORE DEFINED
  const auth = firebase.auth()
  const firestore = firebase.firestore()
  //FIRESTORE DEFINED


  //ERRORS DISPLAY
  const [error, setError] = useState("no-error")
  //ERRORS DISPLAY


  const userData = useSelector(getUserData)
  
  //LOG IN LOGIC
  const logInUser = () => {
    console.log(userPassword, userEmail)
    if(userPassword !== "" && !userPassword.includes(" ")) {
      auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then(current_user => {
        const ud = current_user.user
        firebase.firestore().collection("users").doc(ud.uid).get()
        .then(doc => {
          const dd = doc.data()
          dispatch(setUserData({uid: ud.uid, password: dd.password, email: ud.email, username: dd.username, pp_url: dd.pp_url, type: dd.type}))
        })
        .then(() => {
          navigation.navigate("HomeScreenS")
        })
      })
      .catch(error => {
        setError(error.code.slice(5))
      })
    }
  }
  //LOG IN LOGIC

  
  //ADMIN CODE
  const adminCode = "/gamemode 1"
  //ADMIN CODE

  
  
  // LOG IN ANIMATION LOGIC
  const setLogingInAnimation = () => {
    setIsLogingIn(true)
    startAnimation()
    setTimeout(function() {
      navigation.navigate("HomeScreenS")  
    }, 1500)
  }
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0.75,
      duration: 750,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 750,
        useNativeDriver: false,
      }).start();
    });
  };
  const animatedStyle = {
    transform: [{ scale: animation }],
  };
  // LOG IN ANIMATION *LOGIC*
  


  // SUBMIT FORM ON ENTER PRESS
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if(userEmail === adminCode) {
        navigation.navigate("AdminScreen")
      }
    }
    if (event.key === 'Enter') {
        logInUser()
    }
  };
  // SUBMIT FORM ON ENTER PRESS

  //CHECK FOR CURRENT USER IN CAHCE
  useEffect(() => {
    reLoginUser()
  }, []);
  //CHECK FOR CURRENT USER IN CAHCE

  //
  const reLoginUser = () => {
    console.log(userData)
    if(userData !== 0 && userData !== 1) {
      firestore.collection("users").doc(userData.uid).get()
      .then((doc) => {
        const dd = doc.data()
        dispatch(setUserData({uid: dd.uid, password: dd.password, email: dd.email, username: dd.username, pp_url: dd.pp_url, type: dd.type}))
      })
      navigation.navigate("HomeScreenS")
    }
    if(userData === 1) {
      navigation.navigate("AdminScreen")
    }
  }
  

  return (
    <View className="flex-1">
      <ImageBackground source={{uri: "https://i.ibb.co/Z6mQn40/BG-IMAGE-8.jpg"}} resizeMode="cover" className="flex-1 justify-center items-center" blurRadius={15}>
        {!isLoggingIn && (
          <View className="w-9/12 h-5/6 rounded-2xl  bg-white/30 shadow-2xl">
            <View className="flex-row items-center justify-around mx-5 my-7">
              <View className="items-center justify-center flex-1 -mr-10">
                <Text className="text-6xl" style={{fontFamily: "Roboto_BK", fontWeight: "bold"}}>Welcome Back,</Text>
                <Text className="text-xl mt-1">Enter your credentials below</Text>
                <View className="px-3 py-1 mt-2 bg-slate-400/50 rounded-lg" style={{opacity: error === "no-error" ? 0 : 1}}>
                  <Text className="text-lg  text-rose-500 font-bold">{error}</Text>
                </View>
              </View>
              <View className="mb-7">
                <Image className="w-[85px] h-[64px]" source={{uri: "https://i.ibb.co/MDxZk7H/m-LOGO-co.png"}}/>
              </View>
            </View>
              <View>
                <View className="bg-gray-200 p-2 rounded-lg items-start my-5 mx-64">
                  <TextInput
                    className="text-2xl w-"
                    style={{
                        outlineStyle: 'none',
                    }}
                    placeholder='Email'
                    placeholderTextColor={"rgb(100, 100, 100)"}
                    onChangeText={setUserEmail}
                    value={userEmail}
                    secureTextEntry={false}
                    onKeyPress={(event) => handleKeyPress(event)}
                  />
                </View>
                <View className="bg-gray-200 p-2 rounded-lg pr-32 my-5 mx-64">
                  <TextInput
                    className="text-2xl"
                    style={{
                        outlineStyle: 'none',
                    }}
                    placeholder='Password'
                    placeholderTextColor={"rgb(100, 100, 100)"}
                    onChangeText={setUserPassword}
                    value={userPassword}
                    secureTextEntry={true}
                    onKeyPress={(event) => handleKeyPress(event)}
                  />
                </View>
                <View className="items-center justify-center">
                  {userEmail === adminCode && (
                      <View>
                        <TouchableWithoutFeedback className="" onPressOut={() => navigation.navigate("AdminScreen")}>
                          <View className="mt-10 space-x-3 border-black border-2 rounded-lg p-3 bg-white flex-row items-center justify-center">
                            <Image 
                              source={{uri: "https://i.ibb.co/bshftbN/spades.png"}}
                              className="w-7 h-7"
                            />
                            <Text className="font-bold" style={{fontFamily: "Roboto_BK"}}>ENTER ADMIN MODE</Text>
                            <Image 
                              source={{uri: "https://i.ibb.co/bshftbN/spades.png"}}
                              className="w-7 h-7"
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                  )}
                  {userEmail !== adminCode && (
                    <View>
                      <View className="mt-10">
                        <TouchableOpacity className="" onPress={() => logInUser()}>
                            <Image 
                              source={{uri: "https://i.ibb.co/0yh7q1g/enter-bk.png"}}
                              className="w-12 h-12"
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="mt-10">
                        <TouchableOpacity className="" onPress={() => dispatch(resetUser())}>
                              <Text>RESET</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mt-10">
                        <TouchableOpacity className="" onPress={() => dispatch(setUserData({uid: "xd"}))}>
                              <Text>TEST</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mt-10">
                        <TouchableOpacity className="" onPress={() => console.log(userData)}>
                              <Text>LOG</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                  )}
                </View>
            </View>
          </View>
        )}
        {isLoggingIn && (
          <View>
            <Animated.View style={[{ width: 300, height: 300, backgroundColor: "white" }, animatedStyle]} className="absolute -ml-7 -mt-5 rounded-xl"/>
            <Image
              source={{uri: "https://i.ibb.co/XkL9K2Z/login-gif.gif"}}
              className="w-60 h-60 rounded-full"
            />
          </View>
        )}
      </ImageBackground>
    </View>
  )
}

export default LoginScreen