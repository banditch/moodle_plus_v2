import { View, Text } from 'react-native'
import React from 'react'
import { Motion } from '@legendapp/motion'
import { useEffect } from 'react'

const DocumentCard = () => {
   
  return (
    <Motion.Pressable>
        <Motion.View
            initial={{x: -20}}
            animate={{x: 0}}
        >
            <Text>DOCUMENT</Text>
        </Motion.View>
    </Motion.Pressable>
  )
}

export default DocumentCard