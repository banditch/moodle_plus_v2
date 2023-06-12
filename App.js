import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native'
import StudentHomeScreen from './screens/StudentHomeScreen'
import AdminUserManagment from './screens/AdminUserManagment'
import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'


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
              <Stack.Screen name='HomeScreenS' component={StudentHomeScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </TailwindProvider>
      </PersistGate>
    </Provider>
  )
}

