import { View, Text } from 'react-native'
import React from 'react'
import { Motion } from '@legendapp/motion'
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const ClassCard = ({id, title, owner, users, color}) => {
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
  });

  const navigation = useNavigation()

  return (
    <Motion.Pressable onPress={() => navigation.navigate("ClassScreen", {id, title, owner, users, color})}>
      <Motion.View 
        className="bg-white rounded-lg my-3" 
        whileHover={{scale: 0.95}}
        whileTap={{scaleX: 0.9}}
      >
        <View className="flex-row justify-between">
          <View className="flex-row items-center space-x-4 p-5">
            <Text className="text-2xl" style={{fontFamily: "outfit", fontWeight: 700}}>{title}</Text>
            <View className="h-2 w-2 rounded-full bg-zinc-400"></View>
            <Text style={{fontFamily: "outfit", fontWeight: 500}} className="text-lg text-zinc-600">{owner.username}</Text>
            <Text style={{fontFamily: "outfit", fontWeight: 300}} className="text-xs text-zinc-400">({owner.uid})</Text>
          </View>
          <Motion.Pressable onPress={() => navigation.navigate("ClassScreen", {id, title, owner, users, color})}>
            <Motion.View 
              className="rounded-tr-lg rounded-bl-lg w-8 h-8" 
              style={{backgroundColor: color != null ? color : "#4bebcd"}}
              whileHover={{scaleX: 1.2, scaleY: 1.3}}         
            ></Motion.View>
          </Motion.Pressable>
        </View>
        <View></View>
      </Motion.View>
    </Motion.Pressable>
  )
}

export default ClassCard