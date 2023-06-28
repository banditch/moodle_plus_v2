import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ClassCard = ({id, title, owner, users, color}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity className="bg-white rounded-lg w-full my-2" onPress={() => console.log("MESSI")}>
      <View className="">
        <View className="flex-row justify-between">
            <View className="flex-row items-center">
                <Text className="font-bold text-2xl mx-3">{title}</Text>
                <Text className="mx-3">({id})</Text>
            </View>
            <View className="h-5 w-5 rounded-tr-lg rounded-bl-lg" style={{backgroundColor: color}}></View>
        </View>
        <View className="flex-row my-2 mx-10">
            <Text className="">by</Text>
            <TouchableOpacity className="" onPress={() => console.log("RONALDO")}>
                <Text className="font-bold" style={{color: color}}> {owner.username}</Text>
            </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ClassCard