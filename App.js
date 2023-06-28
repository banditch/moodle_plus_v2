import React, { useEffect } from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native'
import HomeScreen from './screens/HomeScreen'
import AdminUserManagment from './screens/AdminUserManagment'
import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import ClassScreen from './screens/ClassScreen'


export default function App() {

  const Stack = createStackNavigator()

  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <TailwindProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
              <Stack.Screen name='AdminScreen' component={AdminUserManagment} options={{headerShown:false}}/>
              <Stack.Screen name='HomeScreenS' component={HomeScreen} options={{headerShown:false}}/>
              <Stack.Screen name='ClassScreen' component={ClassScreen} options={{headerShown:false, ...TransitionPresets.ModalSlideFromBottomIOS, animationEnabled: true}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </TailwindProvider>
      </PersistGate>
    </Provider>
  )
}

