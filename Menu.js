import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ALTAS from './Altas';
import LISTAS from './Listas';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Menu() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Altas') {
              iconName = focused ? 'person-add' : 'person-add-outline';
            } else if (route.name === 'Listas') {
              iconName = focused ? 'list' : 'list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="Altas" component={ALTAS} />
        <Tab.Screen name="Listas" component={LISTAS} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}