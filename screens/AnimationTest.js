import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Motion } from '@legendapp/motion';

const AnimationTest = () => {
    const [value, setValue] = useState(1);
    const [animationValue, setAnimationValue] = useState(0)


    useEffect(() => {
        const interval = setInterval(() => {
        setValue((prevValue) => (prevValue === 1 ? 0 : 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);
  return (
    <Motion.Pressable
        className="m-10"
        onPress={() => { setAnimationValue(0), setAnimationValue(1) }}
    >
        <Motion.View
            animate={{x: animationValue * 100}}
            className="bg-zinc-700 h-20 w-20 rounded-lg"
        />
    </Motion.Pressable>
  )
}

export default AnimationTest