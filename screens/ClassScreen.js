import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Motion } from '@legendapp/motion'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { useSelector } from 'react-redux'
import { getUserData } from '../features/UserDataSlice'
import UnitsCard from '../components/UnitsCard'
import uuid from 'react-uuid'

const ClassScreen = ({route, navigation}) => {

  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/Fonts/Outfit-VariableFont_wght.ttf'),
  });

  const units = [{title: "T1 GRAVITACIÓ UNIVERSAL", contents: [{title: "APUNTS T1", url: "test.com", type: "PDF"}, {title: "EXERCICIS T1", url: "test.com", type: "PDF"}, {title: "SOLUCINS T1", url: "test.com", type: "PDF"}], id: uuid()}]
  const {id, title, owner, users, color} = route.params

  const userData = useSelector(getUserData)

  useEffect(() => {
    console.log({id, title, owner, users})
  }, [""])
  
  return (
    <View className="bg-transparent max-h-screen h-screen justify-end">
      <View 
        className="h-[95%] bg-gray-100 rounded-t-[2%] p-4 max-h-screen"
      >
        <View className="flex-row justify-between">
          <Motion.Pressable className="m-3 bg-white shadow-lg rounded-lg p-4">
            <Motion.View
              className="items-center"
              transition={{type: "spring", stiffness: 400, mass: 1}}
              initial={{scale: 1, marginLeft: 0, marginRight: 0}}
              whileHover={{scale: 1.05, marginLeft: 50, marginRight: 50}}
            >
              <Text style={{fontFamily: "outfit", fontWeight: 900}} className="text-5xl" selectable={false} >{title}</Text>
            </Motion.View>
          </Motion.Pressable>
          <Motion.Pressable className="" onPress={() => navigation.goBack()}>
            <Motion.View
              className=""
              transition={{type: "spring", stiffness: 300, mass: 2}}
              initial={{rotate: "0deg"}}
              whileHover={{rotate: "90deg"}}
            >
              <Image source={{uri: "https://i.ibb.co/dWPh4sM/Plus-small.png"}} style={{tintColor: "#f54260"}} className="w-14 h-14 rotate-45"/>
            </Motion.View>
          </Motion.Pressable>
        </View>
        <View className="h-[90%] mr-10">
          <View className="items-center justify-center h-full w-full">
            {units.length > 0 && (
              <ScrollView className="mx-20 w-full" style={{maxHeight: "69%"}} showsHorizontalScrollIndicator={false}>
                {units.map((unit) => (
                  <UnitsCard
                    title={unit.title}
                    contents={unit.contents}
                    key={unit.id}
                    color={color}
                  />
                ))}
              </ScrollView>
            )}
            {(userData.type === "S" && units.length <= 0) &&(
              <Text>You will soon see the documents here</Text>
            )}
            {(userData.type === "T" && units.length <= 0)  &&(
              <View className="w-full h-[60%] items-center justify-between">
                <Text>Add the first unit with the button below</Text>
                <Motion.View initial={{y: 150, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{type: "spring", stiffness: 200}}  className="w-full justify-end items-center m-3">
                  <Motion.Pressable onPress={() => console.log("add")}>
                    <Motion.View initial={{backgroundColor: "#a1a1aa"}} whileHover={{rotateZ: "270deg", backgroundColor: "#d7d7db"}} whileTap={{scale: 1.1}} className="rounded-full">
                      <Image source={{uri: "https://i.ibb.co/dWPh4sM/Plus-small.png"}} style={{height: 60, width: 60, tintColor: "black"}}/>
                    </Motion.View>
                    <Motion.Text selectable={false} className="mt-2" style={{fontFamily: 'outfit', fontWeight: '400'}} initial={{opacity: 0, x: 30}} whileHover={{opacity: 1, x: 0}}>Add Class</Motion.Text>
                  </Motion.Pressable>
                </Motion.View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}

export default ClassScreen