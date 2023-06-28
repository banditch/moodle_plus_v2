import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ClassScreen = ({id, title, owner, users, color}) => {
  const navigation = useNavigation()

  return (
    <View className="">
      <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
        <Text>GET OUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ClassScreen