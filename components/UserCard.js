import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { useState } from 'react'
import { Motion } from '@legendapp/motion'

const UserCard = ({username, email, pp_url, uid, classes, type, removeUsers}) => {

  return (
    <Motion.Pressable>
      <Motion.View className="mx-10 my-2 p-3 bg-white rounded-lg flex-row items-center justify-between"
        initial={{skewX: "0deg", scale: 1}}       
        whileHover={{skewX: "-15deg"}}  
        whileTap={{scale: 1.1}}     
      >
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
        <Motion.Pressable onPress={() => removeUsers()}>
          <Motion.View
            initial={{rotate: "0deg", scale: 1}}
            whileHover={{rotate: "90deg", scale: 1.05}}
            whileTap={{scale: 0.8}}
            transition={{type: "spring", stiffness: 200, mass: 0.5}}
          >
            <Image source={{uri: "https://i.ibb.co/FXKyNKj/circle-xmark-1.png"}} className="h-5 w-5"></Image>
          </Motion.View>
        </Motion.Pressable>
      </Motion.View>
    </Motion.Pressable>
  )
}

export default UserCard