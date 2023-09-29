import { View, Text, ImageBackground, ScrollView, TextInput } from 'react-native'
import React from 'react'
import UserCard from '../components/UserCard'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, resetUsers } from '../features/AdminSlice'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { setUserData } from '../features/UserDataSlice'


firebase.initializeApp({
    apiKey: "AIzaSyB9gXLdelwgbgwSWKY0xTmlPW2QEpEhozI",
    authDomain: "moodle-plus-v2.firebaseapp.com",
    projectId: "moodle-plus-v2",
    storageBucket: "moodle-plus-v2.appspot.com",
    messagingSenderId: "106332284917",
    appId: "1:106332284917:web:7123b9bfe2e7b1dabfa2bc",
    measurementId: "G-01PXS21XWE"
})

const AdminUserManagment = () => {

    const auth = firebase.auth()
    const firestore = firebase.firestore()

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [userEmail, setUserEmail] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const [account_type, setType] = useState("S")

    const userList = useSelector(state => state.adminData.user_list)
    

    const [emptyMsg, setEmptyMsg] = useState("")

    useEffect(() => {
        dispatch(setUserData(1))
        getUserList()
        if(userList.length = 0 ) {
            setEmptyMsg("The School looks empty, add a user down below")
        }
            
    }, [""])
    
    const deleteUser = (email, username) => {
        firebase.auth().signInWithEmailAndPassword(email, username+"2023")
        .then((user_data) => {
          console.log(user_data.user)
          firebase.firestore().collection("users").doc(user_data.user.uid).delete()
          user_data.user.delete()
          getUserList()
        })
      }
      

    const getUserList = () => {
        firestore.collection("users").get()
        .then((fetch_data) => {
            dispatch(resetUsers())
            fetch_data.forEach((doc) => {
                dispatch(addUser(doc.data()))
            })
            if(fetch_data.docs.length > 0) {
                setEmptyMsg("")
            }
            else{
                setEmptyMsg("The School looks empty, add a user down below")
            }
        })
    }
    
    const createUser = () => {
        setEmptyMsg("")
    
        let password = ""
        let username = ""
        for (let i = 0; i < userEmail.length; i++) {
            if(userEmail[i] !== "@"){
                password += userEmail[i]
                username += userEmail[i]
            }
            else{
                password += new Date().getFullYear().toString()
                break
            }
        }
        auth.createUserWithEmailAndPassword(userEmail, password)
        .then((user_data) => {
            if(account_type === "S"){
                const ud = user_data.user
                firestore.collection("users").doc(ud.uid).set({uid: ud.uid, email: ud.email, username: username, pp_url: "https://i.ibb.co/C8qXJTY/user.png", type: account_type, password,  classes: [], notifications: [], conversations: []})
                .then((doc) => {
                    console.log("doc written")
                })
                .catch((error) => {
                    console.log(error.code)
                })
            }
            if(account_type === "T"){
                const ud = user_data.user
                firestore.collection("users").doc(ud.uid).set({uid: ud.uid, email: ud.email, username: username, pp_url: "https://i.ibb.co/VNBW7K3/Teacher.png", classes: [], type: account_type, password})
                .then((doc) => {
                    console.log("doc written")
                })
                .catch((error) => {
                    console.log(error.code)
                })
            }
            
            getUserList()  
        })
        .catch(error => {
            setError(error.code.slice(5))
        })
    }
    
    const goToLogin = () => {
        dispatch(setUserData(0))
        window.location.reload()
    }

    const handlePress = (event) => {
        if(event.key === "Enter"){
            console.log("enter")
        }
    }

  return (
    <ImageBackground className="flex-1 justify-center items-center flex-col space-y-5" source={{uri: "https://i.ibb.co/qJW2607/BG-IMAGE-5.jpg"}} resizeMode="cover" blurRadius={10}>
    <View>
        {error.toString().length > 0 && (
            <View className="absolute -mt-5 self-center bg-white px-5 pb-5 pt-1 w-96 items-center rounded-lg">
                <View className="self-start -ml-2">
                    <TouchableOpacity onPress={() => setError("")}>
                        <Text className="font-bold">x</Text>
                    </TouchableOpacity>
                </View>
                <Text className="font-bold text-rose-500">{error}</Text>
            </View>
        )}
        {message.toString().length > 0 && (
            <View className="absolute -mt-5 self-center bg-white px-5 pb-5 pt-1 w-96 items-center rounded-lg">
                <View className="self-start -ml-2">
                    <TouchableOpacity onPress={() => setMessage("")}>
                        <Text className="font-bold">x</Text>
                    </TouchableOpacity>
                </View>
                <Text className="font-bold">{message}</Text>
            </View>
        )}
    </View>
    <View className="w-9/12 rounded-2xl h-4/6 bg-white/30 shadow-2xl">
        {userList.length <= 0 && (
            <View className="items-center justify-center h-full">
                <Text selectable={false} className="text-2xl font-bold">{emptyMsg}</Text>
            </View>
        )}
        {userList.length > 0 && (
            <ScrollView className="space-y-4 h-[550px] pr-5" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={{flexGrow: 0}}>
                {userList.map((user) => (
                    <UserCard
                        key={user.uid}
                        uid={user.uid}
                        username={user.username}
                        email={user.email}
                        pp_url={user.pp_url}
                        classes={user.classes}
                        type={user.type}
                        removeUsers={() => deleteUser(user.email, user.username) }
                    /> 
                ))}
            </ScrollView>
        )}
    </View>
    <View className="w-9/12 h-20 rounded-2xl  bg-white/30 shadow-2xl flex-row items-center justify-center mx-10">
        <View className="items-center justify-center flex-row space-x-14 w-full">
            <View className="bg-white px-4 py-2 justify-center rounded-xl h-14 ml-10 w-7/12">
                <TextInput
                    className="text-2xl"
                    style={{
                        outlineStyle: 'none',
                    }}
                    placeholder='Email'
                    placeholderTextColor={"rgb(100, 100, 100)"}
                    onChangeText={setUserEmail}
                    value={userEmail}
                    secureTextEntry={false}
                    onKeyPress={event => handlePress(event)}
                />
            </View>
            <View>
                {account_type === "S" && (
                    <View className="flex-row bg-white rounded-lg">
                        <TouchableOpacity className="bg-teal-300 p-2 rounded-l-lg">
                            <Image
                                source={{uri: "https://i.ibb.co/Csyj9gn/student.png"}}
                                className="w-10 h-10"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-white p-2 rounded-r-lg" onPress={() =>setType("T")}>
                            <Image
                                source={{uri: "https://i.ibb.co/VNBW7K3/Teacher.png"}}
                                className="w-10 h-10"
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {account_type === "T" && (
                    <View className="flex-row bg-white rounded-lg">
                        <TouchableOpacity className="bg-white p-2 rounded-l-lg" onPress={() => setType("S")}>
                            <Image
                                source={{uri: "https://i.ibb.co/Csyj9gn/student.png"}}
                                className="w-10 h-10"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-teal-300 p-2 rounded-r-lg">
                            <Image
                                source={{uri: "https://i.ibb.co/VNBW7K3/Teacher.png"}}
                                className="w-10 h-10"
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <TouchableOpacity className="bg-teal-300 p-3 rounded-lg" onPress={() => createUser()}>
                <Text className="font-extrabold">Add</Text>
            </TouchableOpacity>
            <TouchableOpacity className="" onPress={() => goToLogin()}>
                <Image style={{tintColor: "#f54260"}} className="w-10 h-10" source={{uri:"https://i.ibb.co/TmfMYLC/enter-wh.png"}}/>
            </TouchableOpacity>
        </View>        
    </View>
    </ImageBackground>
  )
}

export default AdminUserManagment