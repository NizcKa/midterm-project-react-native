import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationFormScreen from '../screens/ApplicationFormScreen';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import { useGlobalContext } from '../context/globalContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { theme } = useGlobalContext();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.headerBackground }, headerTintColor: theme.text }}>
                <Stack.Screen name="Job Finder" component={JobFinderScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Saved Jobs" component={SavedJobsScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Application Form" component={ApplicationFormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;