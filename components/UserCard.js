import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useState } from 'react'

const UserCard = ({username, email, pp_url, uid, classes, type}) => {

  const deleteUser = () => {
    firebase.auth().signInWithEmailAndPassword(email, username+"2023")
    .then((user_data) => {
      console.log(user_data.user)
      firebase.firestore().collection("users").doc(user_data.user.uid).delete()
      user_data.user.delete()
      setOpacity(0)
    })
  }
  
  const [opacity, setOpacity] = useState(1)
  const [height, setHeight] = useState("full")

  return (
    <View className="mx-10 my-2 p-3 bg-white rounded-lg flex-row items-center justify-between" style={{opacity, height}}>
      <View className="flex-row items-center space-x-2">
        <Image source={{uri: pp_url}} className="w-6 h-6 rounded-full"/>
        <View>
          {type === "S" && (
            <View className="bg-sky-300 rounded-full h-2 w-2 mt-1"></View>
          )}
          {type === "T" && (
          <View className="bg-emerald-500 rounded-full h-2 w-2 mt-1"></View>
          )}
        </View>
        <Text className="font-bold text-xl">{username}</Text>
        <Text className="font-bold text-xl text-zinc-200">({email})</Text>
      </View>
      <TouchableOpacity onPress={() => deleteUser()}>
        <Image source={{uri: "https://i.ibb.co/FXKyNKj/circle-xmark-1.png"}} className="h-5 w-5"></Image>
      </TouchableOpacity>
    </View>
  )
}

export default UserCard