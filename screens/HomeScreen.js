import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLastPage, getUserData, resetUser, setLastPage, setUserData } from '../features/UserDataSlice'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import * as DocumentPicker from 'expo-document-picker';
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import ClassCard from '../components/ClassCard'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Motion } from '@legendapp/motion'


const StudentHomeScreen = () => {
  
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const userData = useSelector(getUserData)
  const lastPageSelected = useSelector(getLastPage)

  const [showPassword, setPasswordVisavility] = useState(false)
  const [isCreatingClasss, setIsCreatingClass] = useState(false)

  const [logInOut, setLogingInOut] = useState(false)
  
  const storage = firebase.storage().ref()
  const firestore = firebase.firestore()

  let classes = []
  
  const reLoginUser = () => {
    console.log(userData)
    if(userData !== 0) {
      firestore.collection("users").doc(userData.uid).get()
      .then((doc) => {
        const dd = doc.data()
        dispatch(setUserData({uid: dd.uid, password: dd.password, email: dd.email, username: dd.username, pp_url: dd.pp_url, type: dd.type}))
      })
      navigation.navigate("HomeScreenS")
    }
  }

  useEffect(() => {
    console.log(userData, " <------>", lastPageSelected)
    selectPage(lastPageSelected)
  }, [])

  // PAGE SELECTION SYSTEM  
  const [pageSelected, selectPage] = useState("H") //HOME = H, CLASSES = C, MESSAGES = M, USER DATA = U, APP SETTINGS = S

  //UPLOAD NEW PROFILE
  const updateProfilePicture = useCallback(async () => {
    const res = DocumentPicker.getDocumentAsync({multiple: false, type: "image/*"})
    .then((result) => {
      storage.child(userData.uid + "/" + "pp_url" + "." + result.mimeType.slice(6)).putString(result.uri, "data_url")
      .then((upload) => {
        storage.child(userData.uid + "/" + "pp_url" + "." + result.mimeType.slice(6)).getDownloadURL()
        .then((url) => {
          firestore.collection("users").doc(userData.uid).update({pp_url: url})
        })
        .then(() => {reLoginUser()})
      })      
    })

  }, []);


  return (
    <View className="flex-1">
      <ImageBackground source={{uri: "https://i.ibb.co/V3YvvRK/BG-IMAGE-10.jpg"}} resizeMode="cover" className="flex-1 justify-center items-center flex-row py-2 px-10 space-x-5" blurRadius={10}>
          <View className="w-20 h-5/6 rounded-2xl  bg-white/30 shadow-2xl p-2" style={{opacity: logInOut ? 0 : 1}}>
              <View className="flex-col items-center justify-center h-full">
                  <View className="flex-1 space-y-6">
                      <Motion.Pressable className="p-3 rounded-full" style={{backgroundColor: pageSelected === "H" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        onPress={() => {selectPage("H"); dispatch(setLastPage("H"))}}
                      >
                        <Image source={{uri: "https://i.ibb.co/grC8BbZ/home.png"}} className="w-8 h-8"/>
                      </Motion.Pressable>
                      <TouchableOpacity className=" p-3 rounded-lg" style={{backgroundColor: pageSelected === "C" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        onPress={() => {selectPage("C"); dispatch(setLastPage("C"))} }
                      >
                        <Image source={{uri: "https://i.ibb.co/VNBW7K3/Teacher.png"}} className="w-8 h-8"/>
                      </TouchableOpacity>
                      <TouchableOpacity className=" p-3 rounded-lg" style={{backgroundColor: pageSelected === "M" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        onPress={() => {selectPage("M"); dispatch(setLastPage("M"))}}
                      >
                        <Image source={{uri: "https://i.ibb.co/fSwZgG6/envelope.png"}} className="w-8 h-8"/>
                      </TouchableOpacity>
                  </View>
                  <View className="flex space-y-6">
                      <TouchableOpacity className=" p-3 rounded-lg" style={{backgroundColor: pageSelected === "U" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        onPress={() => {selectPage("U"); dispatch(setLastPage("U"))}}
                      >
                        <Image source={{uri: "https://i.ibb.co/C8qXJTY/user.png"}} className="w-8 h-8"/>
                      </TouchableOpacity>
                      <TouchableOpacity className=" p-3 rounded-lg" style={{backgroundColor: pageSelected === "S" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0)" }}
                        onPress={() => {selectPage("S"); dispatch(setLastPage("S"))}}
                      >
                        <Image source={{uri: "https://i.ibb.co/2MMzFTr/settings.png"}} className="w-8 h-8"/>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
          <View className="w-9/12 h-5/6 rounded-2xl flex-1 bg-white/30 shadow-2xl" style={{opacity: logInOut ? 0 : 1}}>
              {pageSelected === "H" && (
                <View>
                  <Text>HOME</Text>
                </View>
              )}
              {pageSelected === "C" && (
                <View>
                  <Text>CLASSES</Text>
                  {classes.length <= 0 && (
                    <TouchableOpacity className="items-center justify-center mt-52" onPress={() => navigation.navigate("ClassScreen", {id: 1, title: "Messi", owner: userData.uid, users: [userData], color: "#fcc203"})}>
                      <View className="rounded-full bg-zinc-700">
                        <PlusIcon style={{height: 40, width: 40, color: "white"}}/>
                      </View>
                    </TouchableOpacity>
                  )}
                  {classes.length > 0 && (
                    <View className="mx-10">
                      <ScrollView className="m-10">
                        {classes.map((classe) => (
                        <ClassCard
                          key={classe.id}
                          id={classe.id}
                          title={classe.title}
                          owner={classe.owner}
                          users={classe.users}
                          color={classe.color}
                        />
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
              )}
              {pageSelected === "M" && (
                <View>
                  <Text>MESSAGES</Text>
                </View>
              )}
              {pageSelected === "U" && (
                <View className="">
                  <View className="flex-row items-center justify-end m-6">
                    <TouchableOpacity className="items-center" onPress={() => {window.location.reload(); setLogingInOut(true); dispatch(resetUser()); dispatch(setLastPage("H"));}}>
                      <Image className="h-10 w-10 " source={{uri: "https://i.ibb.co/TmfMYLC/enter-wh.png"}} style={{tintColor: "#f54260"}}/> 
                      <Text className="text-rose-500 font-bold">LOG OUT</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="mx-10 space-y-3 items-center justify-start">
                    <View className="p-4 items-center">
                      <View className="rounded-full bg-white/75 m-3 p-2">
                        <Image className="w-20 h-20 rounded-full" source={{uri: userData.pp_url}}/>
                      </View>
                      <TouchableOpacity onPress={() => updateProfilePicture()}>
                        <Image source={{uri: "https://i.ibb.co/Byzm55N/pencil.png"}} className="h-5 w-5"/>
                      </TouchableOpacity>
                    </View>
                    <View className="items-start space-y-7">
                      <View className="flex-row items-center">
                        <Text className="text-3xl font-bold mt-0.5">USERNAME:</Text>
                        <Text className="text-3xl font-extrabold"> {userData.username}</Text>
                      </View> 
                      <View className="flex-row items-center">
                        <Text className="text-3xl font-bold mt-0.5">EMAIL:</Text>
                        <Text className="text-3xl font-extrabold"> {userData.email}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-3xl font-bold mt-0.5 mr-3">PASSWORD:</Text>
                        {showPassword && (
                          <View className="flex-row items-center">
                            <Text className="text-3xl font-extrabold text-zinc-700"> {userData.password}</Text>
                            <TouchableOpacity className="" onPress={() => setPasswordVisavility(false)}>
                            <Image source={{uri:"https://i.ibb.co/hf9tmz6/eye.png"}} className="h-10 w-10 ml-6"/>
                            </TouchableOpacity>
                          </View>
                        )}
                        {!showPassword && (
                          <View className="items-center flex-row">
                            <View className="bg-zinc-700 rounded-lg py-0.5">
                              <Text selectable={false} className="text-3xl font-extrabold text-zinc-700"> {userData.password}</Text>
                            </View>
                            <TouchableOpacity className="" onPress={() => setPasswordVisavility(true)}>
                              <Image source={{uri: "https://i.ibb.co/JFMpwSG/close-eye.png"}} className="h-10 w-10 ml-6"/>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>  
                </View>
              )}
              {pageSelected === "S" && (
                <View>
                  <Text>SETTINGS</Text>
                </View>
              )}
          </View>
      </ImageBackground>
    </View>
  )
}

export default StudentHomeScreen