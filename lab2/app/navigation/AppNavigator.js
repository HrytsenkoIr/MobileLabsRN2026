import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          title: 'Стрічка новин',
          headerLeft: () => (
            <Button
              onPress={() => navigation.openDrawer()}
              title="☰"
              color="#007AFF"
            />
          ),
          headerLeftContainerStyle: { paddingLeft: 15 }
        })}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Деталі'
        })}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: 'Новини',
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: 'Контакти' }}
      />
    </Drawer.Navigator>
  );
}