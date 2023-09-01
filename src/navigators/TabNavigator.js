import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Colors } from '../../assets/theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style = {{backgroundColor: Colors.backgroundColor, flex: 1,}}>
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderColor: 'gray',
          borderWidth: 1,
          height: 100,
          borderRadius: 75,
          marginHorizontal: 0,
          marginBottom: '-7%',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? {
                  shadowColor: '#7F5DF0',
                  shadowOffset: {
                      width: 5,
                      height: 5,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 3.5,
                  } : {},
                ]}>
                {!focused ? <AntDesign name="videocamera" size={30} color="white" /> :
                            <AntDesign name="videocamera" size={30} color={Colors.mainColor} />}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
              style={[
                styles.activeTabBackground,
                focused ? {
                shadowColor: '#7F5DF0',
                shadowOffset: {
                    width: 5,
                    height: 5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.5,
                } : {},
              ]}>
                {!focused ? <AntDesign name="search1" size={30} color="white" /> :
                            <AntDesign name="search1" size={30} color={Colors.mainColor} />}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
              style={[
                styles.activeTabBackground,
                focused ? {
                shadowColor: '#7F5DF0',
                shadowOffset: {
                    width: 5,
                    height: 5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.5,
                } : {},
              ]}>
                {!focused? <MaterialCommunityIcons name="ticket-confirmation-outline" size={30} color="white" /> :
                           <MaterialCommunityIcons name="ticket-confirmation-outline" size={30} color={Colors.mainColor} />}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
              style={[
                styles.activeTabBackground,
                focused ? {
                shadowColor: '#7F5DF0',
                shadowOffset: {
                    width: 5,
                    height: 5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.5,
                } : {},
              ]}>
                {!focused ? <AntDesign name="user" size={30} color="white" /> :
                            <AntDesign name="user" size={30} color={Colors.mainColor} />}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    padding: 18,
    borderRadius: 180,
  },
});

export default TabNavigator;