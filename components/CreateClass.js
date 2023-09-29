import { View, Text, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import * as DocumentPicker from 'expo-document-picker';
import { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { getUserData } from '../features/UserDataSlice';
import { useState } from 'react';
import { Motion } from '@legendapp/motion';
import { TextInput } from 'react-native-gesture-handler';
import uuid from 'react-uuid';

const CreateClass = ({goToClass}) => {

    const userData = useSelector(getUserData)

    useEffect(() => {
        const keyDownHandler = event => {
          if (event.key === 'Escape') {
            goToClass()
          }     
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const [classCreationColor, setClassCreationColor] = useState("#4bebcd")
  
 //CREATE CLASS
    const createNewClass = () => {
        if (classTitle.length < 31 && classTitle != " " && classTitle != ""){
            firebase.firestore().collection("users").doc(userData.uid).collection("classes").add({id: uuid(), title: classTitle, owner: userData, users: [], color: classCreationColor})
            .then((docData) => {
                console.log(docData)
            })
        }
    }
 const [classTitle, setClassTitle] = useState("")


  return (
    <View className="w-full h-full justify-between">
        <View className="my-4 mx-6">
        <Motion.Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="font-extrabold text-5xl">Classes</Motion.Text>
        </View>
        <Motion.View className="bg-zinc-500 w- h-[75%] rounded-b-lg rounded-t-2xl px-8 py-3" initial={{y: 500, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{type: "tween"}}>
        <View className="flex-row justify-between items-center">
            <Motion.Text selectable={false} style={{fontFamily: 'outfit', fontWeight: '700'}} className="text-3xl" initial={{scale: 0.3}} animate={{scale: 1}} transition={{type: "spring", stiffness: 70}} >Create New Class</Motion.Text>
            <Motion.Pressable onPress={() => goToClass()}>
                <Motion.View whileHover={{rotateZ: "180deg", scale: 1.4}} whileTap={{scale: 1}}>
                    <Image source={{uri: "https://i.ibb.co/dWPh4sM/Plus-small.png"}} style={{height: 50, width: 50, tintColor: "#ff4d58", transform: [{rotateZ: "45deg"}]}}/>
                </Motion.View>
            </Motion.Pressable>
        </View>
        <View>
            <View className=" items-center space-y-8">
            <Motion.View className="bg-white rounded-lg p-4 flex-1" initial={{rotateZ: "-10deg"}} transition={{delay: 200, type: "spring", stiffness: 600}} animate={{rotateZ: "0deg"}}>
                <TextInput
                className="text-2xl"
                style={{
                    outlineStyle: 'none',
                }}
                placeholder='Class Name'
                placeholderTextColor={"rgb(100, 100, 100)"}
                onChangeText={(i) => setClassTitle(i.toUpperCase()) }
                value={classTitle}
                />
            </Motion.View>
            <View className="flex-row space-x-4 p-6 bg-white/25 rounded-lg">
                <Motion.Pressable onPress={() => setClassCreationColor("#4b96eb")}>
                    <Motion.View
                        style={{borderStyle: "solid", borderColor: "#252525" ,borderWidth: classCreationColor == "#4b96eb" ? 5 : 0}}
                        className="w-10 h-10 bg-[#4b96eb] rounded-full"
                        transition={{type: "spring", stiffness: 400}}
                        whileHover={{scaleY: 1.3}}
                        whileTap={{scaleX: 1.2}}
                    >
                    </Motion.View>
                </Motion.Pressable>
                <Motion.Pressable onPress={() => setClassCreationColor("#cb5dea")}>
                    <Motion.View
                        style={{borderStyle: "solid", borderColor: "#252525" ,borderWidth: classCreationColor == "#cb5dea" ? 5 : 0}}
                        className="w-10 h-10 bg-[#cb5dea] rounded-full"
                        transition={{type: "spring", stiffness: 400}}
                        whileHover={{scaleY: 1.3}}
                        whileTap={{scaleX: 1.2}}
                    >
                    </Motion.View>
                </Motion.Pressable>
                <Motion.Pressable onPress={() => setClassCreationColor("#ea5d7e")}>
                    <Motion.View
                        style={{borderStyle: "solid", borderColor: "#252525" ,borderWidth: classCreationColor == "#ea5d7e" ? 5 : 0}}
                        className="w-10 h-10 bg-[#e15d5d] rounded-full"
                        transition={{type: "spring", stiffness: 400}}
                        whileHover={{scaleY: 1.3}}
                        whileTap={{scaleX: 1.2}}
                    >
                    </Motion.View>
                </Motion.Pressable>
                <Motion.Pressable onPress={() => setClassCreationColor("#4bebcd")}>
                    <Motion.View
                        style={{borderStyle: "solid", borderColor: "#252525" ,borderWidth: classCreationColor == "#4bebcd" ? 5 : 0}}
                        className="w-10 h-10 bg-[#4bebcd] rounded-full"
                        transition={{type: "spring", stiffness: 400}}
                        whileHover={{scaleY: 1.3}}
                        whileTap={{scaleX: 1.2}}
                    >
                    </Motion.View>
                </Motion.Pressable>
                <Motion.Pressable onPress={() => setClassCreationColor("#e0c953")}>
                    <Motion.View
                        style={{borderStyle: "solid", borderColor: "#252525" ,borderWidth: classCreationColor == "#e0c953" ? 5 : 0}}
                        className="w-10 h-10 bg-[#e0c953] rounded-full"
                        transition={{type: "spring", stiffness: 400}}
                        whileHover={{scaleY: 1.3}}
                        whileTap={{scaleX: 1.2}}
                    >
                    </Motion.View>
                </Motion.Pressable>
                <Motion.Pressable onPress={() => setClassCreationColor("#82e053")}>
                    <Motion.View
                        style={{borderStyle: "solid", borderColor: "#252525" ,borderWidth: classCreationColor == "#82e053" ? 5 : 0}}
                        className="w-10 h-10 bg-[#82e053] rounded-full"
                        transition={{type: "spring", stiffness: 400}}
                        whileHover={{scaleY: 1.3}}
                        whileTap={{scaleX: 1.2}}
                    >
                    </Motion.View>
                </Motion.Pressable>
                <Motion.Pressable onPress={() => setClassCreationColor("#342f7f")}>
                    <Motion.View
                        style={{borderStyle: "solid", borderColor: "#252525" ,borderWidth: classCreationColor == "#342f7f" ? 5 : 0}}
                        className="w-10 h-10 bg-[#342f7f] rounded-full"
                        transition={{type: "spring", stiffness: 400}}
                        whileHover={{scaleY: 1.3}}
                        whileTap={{scaleX: 1.2}}
                    >
                    </Motion.View>
                </Motion.Pressable>
            </View>
            <Motion.Pressable onPress={() => {createNewClass()}} className="">
                <Motion.View
                transition={{type: "spring", stiffness: 400}}
                whileHover={{rotateZ: "-90deg"}}
                whileTap={{scaleY: 0.8, scaleX: 1.2}}
                initial={{rotateZ: "0deg"}}
                >
                <Image source={{uri: "https://i.ibb.co/K9xRs8d/magic-wand.png"}} className="h-10 w-10"/>
                </Motion.View>
            </Motion.Pressable>                        
            </View>
        </View>
        </Motion.View>
    </View>
  )
}

export default CreateClass
