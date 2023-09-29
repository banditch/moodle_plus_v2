import { View, Text, ImageBackground, Image, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addClass, getClasses, getLastPage, getUserData, resetClasses, resetUser, setLastPage, setUserData } from '../features/UserDataSlice'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import * as DocumentPicker from 'expo-document-picker';
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Motion } from '@legendapp/motion'
import { useFonts } from 'expo-font'
import uuid from 'react-uuid'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ClassCard from '../components/ClassCard'
import CreateClass from '../components/CreateClass'


const StudentHomeScreen = () => {

  /*
  -----------------FONT------------------------------------------------------------------------
  */

  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
  });
  
  /*
  -----------------GLOBAL------------------------------------------------------------------------
  */
  const dispatch = useDispatch()
  const navigation = useNavigation()
  
  const userData = useSelector(getUserData)
  const lastPageSelected = useSelector(getLastPage)
    
  const [pageSelected, selectPage] = useState("H") //HOME = H, CLASSES = C, MESSAGES = M, USER DATA = U, APP SETTINGS = S, ADD CLASS = A
   /*
  -----------------USER DATA SCREEN------------------------------------------------------------------------
  */
  const [showPassword, setPasswordVisavility] = useState(1)
  const [logInOut, setLogingInOut] = useState(false)

   /*
  -----------------CLASSES SCREEN------------------------------------------------------------------------
  */


  const storage = firebase.storage().ref()
  const firestore = firebase.firestore()

  const classes = useSelector(getClasses)


  /*
  -----------------FUNCTIONS------------------------------------------------------------------------
  */
  
  const reLoginUser = () => {
    console.log(userData)
    firestore.collection("users").doc(userData.uid).get()
    .then((doc) => {
      const dd = doc.data()
      dispatch(setUserData({uid: dd.uid, password: dd.password, email: dd.email, username: dd.username, pp_url: dd.pp_url, type: dd.type}))
    })
  }

  /*
  -----------------CLASS CREATION------------------------------------------------------------------------
  */
 
  const deleteClasses = () => {
    firestore.collection("users").doc(userData.uid).collection("classes").get()
    .then((docs) => {
      docs.forEach((doc) => {
        firestore.collection("users").doc(userData.uid).collection("classes").doc(doc.id).delete()
        .then(() => {
          console.log("deleted doc " + doc.id)
        })
      })
    })
  }

  //Load Classes
  const loadClasses = () => {
    firestore.collection("users").doc(userData.uid).collection("classes").get()
    .then((docs) => {
      dispatch(resetClasses())
      docs.forEach((doc) => {
        dispatch(addClass(doc.data()))
      }) 
    })
  }
    
  useEffect(() => {
    reLoginUser()
    loadClasses()
    selectPage(lastPageSelected)
    if(classes.length == undefined){
      dispatch(resetClasses())
    }
  }, [])

  // USE TABS TO NAVIGATE -----------------------------------------------------------------------------
  
  const handleKeyDown = (e) => {
    if(e.nativeEvent.key == "Enter"){
        dismissKeyboard();
    }
  }

  //UPLOAD NEW PROFILE
  const updateProfilePicture = useCallback(async () => {
    const res = DocumentPicker.getDocumentAsync({multiple: false, type: "image/*"})
    .then((result) => {
      storage.child(userData.uid + "/" + "pp_url" + "." + result.mimeType.slice(6)).putString(result.uri, "data_url")
      .then(() => {
        storage.child(userData.uid + "/" + "pp_url" + "." + result.mimeType.slice(6)).getDownloadURL()
        .then((url) => {
          firestore.collection("users").doc(userData.uid).update({pp_url: url})
        })
        .then(() => {reLoginUser()})
      })      
    })

  }, []);

  
  return (
    <View className="flex-1 h-screen">
      <ImageBackground source={{uri: "https://i.ibb.co/V3YvvRK/BG-IMAGE-10.jpg"}} resizeMode="cover" className="flex-1 justify-center items-center flex-row py-2 px-10 space-x-5" blurRadius={10}>
          <View className="w-20 h-5/6 rounded-2xl"
            style={{opacity: logInOut ? 0 : 1, backgroundColor: 'rgba(30, 30, 30, 0.3)', borderRadius: 10, 
            borderBottomWidth: 2, borderLeftWidth: 2, borderColor: 'rgba(30, 30, 30, 0.15)', margin: 20, padding: 10, overflow: 'hidden', 
            shadowColor: 'rgba(0, 0, 0, 0.2)', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10}}
          >
            <View className="flex-col items-center justify-center h-full">
                <ImageBackground className="flex-1 space-y-6">
                  <Motion.Pressable onPress={() => {selectPage("H"); dispatch(setLastPage("H"))}}>
                      <Motion.View 
                        className="rounded-lg p-3" 
                        style={{backgroundColor: pageSelected === "H" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        whileHover={{y: -3, scale:1.1}}
                        whileTap={{scale: 0.8}}  
                        transition={{type: "spring", stiffness: 200}}
                      >
                        <Image source={{uri: "https://i.ibb.co/grC8BbZ/home.png"}} className="w-8 h-8"/>
                      </Motion.View>
                  </Motion.Pressable>
                  <Motion.Pressable onPress={() => {selectPage("C"); dispatch(setLastPage("C")); loadClasses()}}>
                      <Motion.View 
                        className="rounded-lg p-3" 
                        style={{backgroundColor: pageSelected === "C" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        whileHover={{y: -3, scale:1.1}}
                        whileTap={{scale: 0.8}}  
                        transition={{type: "spring", stiffness: 200}}
                      >
                        <Image source={{uri: "https://i.ibb.co/VNBW7K3/Teacher.png"}} className="w-8 h-8"/>
                      </Motion.View>
                  </Motion.Pressable>
                  <Motion.Pressable onPress={() => {selectPage("M"); dispatch(setLastPage("M"))}}>
                      <Motion.View 
                        className="rounded-lg p-3" 
                        style={{backgroundColor: pageSelected === "M" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        whileHover={{y: -3, scale:1.1}}
                        whileTap={{scale: 0.8}}  
                        transition={{type: "spring", stiffness: 200}}
                      >
                        <Image source={{uri: "https://i.ibb.co/fSwZgG6/envelope.png"}} className="w-8 h-8"/>
                      </Motion.View>
                  </Motion.Pressable>
                </ImageBackground>
                <View className="flex space-y-6">
                    <Motion.Pressable onPress={() => {selectPage("U"); dispatch(setLastPage("U"))}}>
                        <Motion.View 
                          className="rounded-lg p-3" 
                          style={{backgroundColor: pageSelected === "U" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                          whileHover={{y: -3, scale:1.1}}
                          whileTap={{scale: 0.8}}  
                          transition={{type: "spring", stiffness: 200}}
                        >
                          <Image source={{uri: "https://i.ibb.co/C8qXJTY/user.png"}} className="w-8 h-8"/>
                        </Motion.View>
                    </Motion.Pressable>
                    <Motion.Pressable onPress={() => {selectPage("S"); dispatch(setLastPage("S"))}}>
                        <Motion.View 
                          className="rounded-lg p-3" 
                          style={{backgroundColor: pageSelected === "S" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                          whileHover={{y: -3, scale:1.1}}
                          whileTap={{scale: 0.6}}
                          transition={{type: "spring", stiffness: 200}}
                        >
                          <Image source={{uri: "https://i.ibb.co/2MMzFTr/settings.png"}} className="w-8 h-8"/>
                        </Motion.View>
                    </Motion.Pressable>
                </View>
              </View>
            </View>

          <View className="w-9/12 h-5/6 rounded-2xl flex-1 bg-white/30 shadow-2xl"
            style={{opacity: logInOut ? 0 : 1, backgroundColor: 'rgba(30, 30, 30, 0.3)', borderRadius: 10, 
            borderBottomWidth: 2, borderLeftWidth: 2, borderColor: 'rgba(30, 30, 30, 0.15)', margin: 20, overflow: 'hidden', 
            shadowColor: 'rgba(0, 0, 0, 0.2)', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10}}
          >
              {pageSelected === "H" && (
                <View className="w-9/12">
                  <View className="my-4 mx-1">
                    <Motion.Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="font-extrabold text-5xl" initial={{x: -20, opacity: 0}} animate={{x: 20, opacity: 1}} transition={{type: "spring", stiffness: 70}} >Home</Motion.Text>
                  </View>
                </View>
              )}
              {pageSelected === "C" && (
                <View className="h-full w-full">
                  <View className="w-full h-full">
                    <View className="my-4 mx-1">
                      <Motion.Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="font-extrabold text-5xl" initial={{x: -20, opacity: 0}} animate={{x:20, opacity: 1 }} transition={{type: "spring", stiffness: 70}}>Classes</Motion.Text>
                    </View>
                    {classes.length > 0 && (
                      <ScrollView className="mx-10" style={{maxHeight: "69%"}} showsHorizontalScrollIndicator={false}>
                        {classes.map((items) => (
                          <ClassCard
                            key={items.id}
                            id={items.id}
                            owner={items.owner}
                            title={items.title}
                            users={items.users}
                            color={items.color}
                          />
                        ))}
                      </ScrollView>
                    )}
                    {classes.length <= 0 && (
                      <View className="mx-10 h-[69%] items-center justify-center">
                        {userData.type == "S" && (
                          <Text selectable={false} className="text-3xl" style={{fontFamily: "outfit", fontWeight: 600}}>Your teacher will soon add you to your corresponding classes</Text>
                        )}
                        {userData.type == "T" && (
                          <Text selectable={false} className="text-3xl" style={{fontFamily: "outfit", fontWeight: 600}}>Add more classes with the button below</Text>
                        )}
                      </View>
                    )}
                    {userData.type != "S" && (
                      <Motion.View initial={{y: 150, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{type: "spring", stiffness: 200}}  className="w-full justify-end items-center m-3">
                        <Motion.Pressable onPress={() => {selectPage("+c") ; dispatch(setLastPage("+c"))}}>
                          <Motion.View initial={{backgroundColor: "#a1a1aa"}} whileHover={{rotateZ: "270deg", backgroundColor: "#d7d7db"}} whileTap={{scale: 1.1}} className="rounded-full">
                            <Image source={{uri: "https://i.ibb.co/dWPh4sM/Plus-small.png"}} style={{height: 60, width: 60, tintColor: "black"}}/>
                          </Motion.View>
                          <Motion.Text selectable={false} className="mt-2" style={{fontFamily: 'outfit', fontWeight: '400'}} initial={{opacity: 0, x: 30}} whileHover={{opacity: 1, x: 0}}>Add Class</Motion.Text>
                        </Motion.Pressable>
                      </Motion.View>
                    )}
                  </View>
                </View>
              )}
              {pageSelected === "M" && (
                <View className="my-4 mx-1">
                  <Motion.Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="font-extrabold text-5xl" initial={{x: -20, opacity: 0}} animate={{x: 20, opacity: 1}} transition={{type: "spring", stiffness: 70}} >Messages</Motion.Text>
                </View>
              )}
              {pageSelected === "U" && (
                <View className="w-full">
                  <View className="flex-row justify-between">
                    <View className="my-4 mx-1">
                      <Motion.Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="font-extrabold text-5xl" initial={{x: -20, opacity: 0}} animate={{x: 20, opacity: 1}} transition={{type: "spring", stiffness: 70}} >User Settings</Motion.Text>
                    </View>
                    <View className="items-center justify-end m-10">
                      <Motion.Pressable className="items-center" onPress={() => {window.location.reload(); setLogingInOut(true); dispatch(resetUser()); dispatch(setLastPage("H"));}}>
                        <Motion.View
                          whileHover={{rotate: "10deg", scale: 1.2}}
                          whileTap={{scale: 0.8}}
                          transition={{type: "spring", stiffness: 500}}
                        >
                          <Image className="h-10 w-10 " source={{uri: "https://i.ibb.co/TmfMYLC/enter-wh.png"}} style={{tintColor: "#f54260"}}/> 
                        </Motion.View>
                      </Motion.Pressable>
                    </View>
                  </View>
                  <Motion.View className="mx-10 space-y-3 items-center justify-start mt-5" initial={{x: -400, opacity: 0.1}} animate={{x: 30, opacity: 1}} transition={{easing: "easeOut", stiffness: 200}}>
                    <View className="p-4 items-center">
                      <Motion.Pressable>
                        <Motion.View
                          transition={{type: "spring", stiffness: 100, mass: 1.8}}
                          whileHover={{y: -10, scale: 1.1}}
                          whileTap={{y: -60, scale: 2.3}}
                        >
                          <View className="rounded-full bg-white/75 m-3 p-2">
                            <Image className="w-20 h-20 rounded-full" source={{uri: userData.pp_url}}/>
                          </View>
                        </Motion.View>
                      </Motion.Pressable>
                      <Motion.Pressable onPress={() => updateProfilePicture()}>
                        <Motion.View
                          whileTap={{rotateZ: "-20deg", scale: 1.4}}
                          whileHover={{rotateZ: "-45deg"}}
                        >
                          <PencilIcon style={{width: 30, height: 30}}/>
                        </Motion.View>
                      </Motion.Pressable>
                    </View>
                    <View className="items-start space-y-7">
                      <View className="flex-row items-center justify-center">
                        <Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '400'}} className="text-3xl mt-0.5">Username:</Text>
                        <Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="text-3xl"> {userData.username}</Text>
                        <Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="text-xl text-zinc-800">  ({userData.uid}) </Text>
                      </View> 
                      <View className="flex-row items-center">
                        <Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '400'}} className="text-3xl mt-0.5">Email:</Text>
                        <Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="text-3xl"> {userData.email}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '400'}} className="text-3xl mt-0.5 mr-3">Password:</Text>
                        {showPassword === 0 && (
                          <View className="flex-row items-center">
                            <Motion.Pressable onPress={() => setPasswordVisavility(1)}>
                              <Motion.Text selectable={false} transition={{type: "spring", stiffness: 200}} initial={{scale: 0.7, y: -4, backgroundColor: "rgba(255, 255, 255, 0)"}} animate={{scale: 1, y: 0}} style={{fontFamily: 'outfit', fontWeight: '700'}} className="text-3xl rounded-lg p-0.5" whileHover={{backgroundColor: "rgba(255, 255, 255, 0.2)", rotateZ: "0.5deg", scale: 1.05}}> {userData.password}</Motion.Text>
                            </Motion.Pressable>
                          </View>
                        )}
                        {showPassword === 1 && (
                          <View className="items-center flex-row">
                            <Motion.Pressable onPress={() => setPasswordVisavility(0)}>
                              <Motion.View transition={{type: "spring", stiffness: 200}} initial={{backgroundColor: "#3d3d3d", scale: 1.05, y: -4}} whileHover={{backgroundColor: "#575757", rotateZ: "0.5deg", scale: 1.01}} className="rounded-lg py-0.5"  animate={{scale: 0.9, y: 0}}>
                                <Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700', color: "rgba(0, 0, 0, 0)"}} className="text-3xl"> {userData.password}</Text>
                              </Motion.View>
                            </Motion.Pressable>
                          </View>
                        )}
                      </View>
                    </View>
                  </Motion.View>  
                </View>
              )}
              {pageSelected === "S" && (
                <View className="my-4 mx-1">
                  <View>
                    <Motion.Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="font-extrabold text-5xl" initial={{x: -20, opacity: 0}} animate={{x:20, opacity: 1}} transition={{type: "spring", stiffness: 70}} >Settings</Motion.Text>
                  </View>
                  <View>
                    <TouchableOpacity className="m-10" onPress={() => deleteClasses()}>
                      <Text>DELETE ALL CLASSES</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {pageSelected === "A" && (
                <View>

                </View>
              )}
              {pageSelected === "+c" && (
                <CreateClass
                  goToClass={() => {selectPage("C"); dispatch(setLastPage("C"))}}
                />
              )}
          </View>
      </ImageBackground>
    </View>
  )
}

export default StudentHomeScreen