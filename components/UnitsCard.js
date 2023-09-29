import { View, Text, Image } from 'react-native'
import React from 'react'
import { Motion } from '@legendapp/motion'
import { useState } from 'react'
import DocumentCard from './DocumentCard'
import { useEffect } from 'react'
import uuid from 'react-uuid'

const UnitsCard = ({title, contents, color}) => {

    const [deployed, setDeployed] = useState(false)
    const [hover, setHover] = useState(0)
    
    useEffect(() => {
      console.log("a")
    }, [""])
    
    
    
  return (
    <Motion.View className='w-full items-start ml-20 py-5'>
        <Motion.Pressable className='w-[70%] px-2' onPress={() => setDeployed(!deployed)} onHoverIn={() => setHover(1)} onHoverOut={() => setHover(0)}>
            <Motion.View className='bg-white px-5 py-4 rounded-lg shadow-lg'
                initial={{rotate: "0deg"}}
                whileHover={{rotate: "-1deg"}}
                transformOrigin={{x: -5, y:0}}
                transition={{type: "spring", mass: 1, stiffness: 500}}
            >
                <View className='flex-row justify-between items-center'>
                    <Text className='text-2xl' style={{fontFamily: "outfit", fontWeight: 700}}>{title}</Text>
                    <View className="flex-row items-center justify-center">
                        <Motion.View className="items-center justify-center rounded-full w-10 h-10 p-1"
                            style={{backgroundColor: color}}
                            animate={{scaleX: 1 + 0.1 * hover}}
                            transition={{type: "spring", mass: 0.6, stiffness: 200}}
                        >
                        </Motion.View>
                        <Text className='font-extrabold text-xl absolute'>{contents.length}</Text>
                        {deployed && (
                            <Motion.Pressable className='absolute -mt-14 -ml-14' style={{zIndex: -10}}>
                                <Motion.View className='absolute'
                                    initial={{x: 0, opacity: 0}}
                                    animate={{opacity: 1, x: -50}}
                                >
                                    <Image className='absolute' source={{uri: "https://i.ibb.co/dWPh4sM/Plus-small.png"}} style={{height: 60, width: 60, tintColor: "black"}}/>
                                </Motion.View>
                            </Motion.Pressable>
                        )}
                    </View>
                </View>
            </Motion.View>
        </Motion.Pressable>
        {(hover === 1 && !deployed) && (
            <View className='w-full ml-3'  style={{zIndex: -1}}>
                <Motion.View className='py-2  bg-slate-50 shadow-lg rounded-lg w-[68.5%] rotate-[-0.5deg]'
                    initial={{marginTop: "-5rem", opacity: 0}}
                    animate={{marginTop: "-3rem", opacity: 1}}
                    transition={{easing: "easeOut"}}
                >
                    <View className='flex-row justify-between items-center' style={{opacity: 0}}>
                        <Text className='text-2xl' style={{fontFamily: "outfit", fontWeight: 700}}>{title}</Text>
                        <View className=" items-center justify-center">
                            <View className="items-center justify-center rounded-full w-10 h-10 p-1">
                            </View>
                            <Text className='font-extrabold text-xl absolute'>{contents.length}</Text>
                        </View>
                    </View>
                </Motion.View>
                <Motion.View className='py-2 bg-slate-100 shadow-lg rounded-lg w-[68.5%] rotate-[-0.3deg]'  
                    style={{zIndex: -2}}
                    initial={{marginTop: "-5rem", opacity: 0}}
                    animate={{marginTop: "-2.5rem", opacity: 1}}
                    transition={{easing: "easeOut"}}
                >
                    <View className='flex-row justify-between items-center' style={{opacity: 0}}>
                        <Text className='text-2xl' style={{fontFamily: "outfit", fontWeight: 700}}>{title}</Text>
                        <View className=" items-center justify-center">
                            <View className="items-center justify-center rounded-full w-10 h-10 p-1">
                            </View>
                            <Text className='font-extrabold text-xl absolute'>{contents.length}</Text>
                        </View>
                    </View>
                </Motion.View>
            </View>
        )}
        {deployed && (
            <View 
                className='flex-row ml-7 mt-5' style={{zIndex: -4}}
                key={uuid()}
            >
                    <View>
                        <Motion.View 
                            className='bg-zinc-500 h-max w-1 rounded-xl'
                            initial={{y: -10}}
                            animate={{y: 0}}
                            style={{zIndex: -3}}
                        ></Motion.View>
                        <View className='' >
                            {contents.map((document) => (
                                <Motion.Pressable
                                    key={uuid()}
                                >
                                    <Motion.View
                                        initial={{x: -20}}
                                        animate={{x: 0}}
                                    >
                                        <Text>DOCUMENT</Text>
                                    </Motion.View>
                                </Motion.Pressable>  
                            ))}
                        </View>
                    </View>
            </View>  
        )}
    </Motion.View>
  )
}

export default UnitsCard