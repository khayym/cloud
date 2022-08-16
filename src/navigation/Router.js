import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from "../screens/welcome-screen";

const Router = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            {
                <Stack.Navigator screenOptions={{ headerShown: true }}>
                    <Stack.Screen
                        name="MainScreen"
                        component={MainScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

export default Router