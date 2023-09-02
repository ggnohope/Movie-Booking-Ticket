import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, FlatList, Image } from 'react-native';
import { getUpcomingMoviesList, getNowPlayingMoviesList, getPopularMoviesList, baseImagePath, getGenresList, genres, } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { getCurrNowPlayingMoviesList, setCurrNowPlayingMoviesList } from '../data/data';
import { AntDesign, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const UserAccountScreen = () => {
  return (
    <View style={styles.container}>

      <View style={styles.topContainer}>
        <View style={styles.closeButton}>
          <Ionicons style={{left:0.4, top: 0.3}} name="close-circle-outline" size={28} color="white" />
        </View>
        <View style={styles.HeaderContainer}>
          <Text style={{ ...styles.text, paddingHorizontal: 0, paddingVertical: 10 }}>My Profile</Text>
        </View>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.imageContainer}
          source={require('../../assets/avt.png')}
        />
        <View style={styles.nameContainer}>
          <Text style={{ ...styles.text, paddingHorizontal: 0, paddingVertical: 10 }}>User Name</Text>
        </View>

      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <FontAwesome style={{paddingVertical: 10 }} name="user-o" size={20} color="white" />
          </View>
          <View style={styles.infoDetail}>
            <Text style={{ ...styles.text, paddingHorizontal: 0, paddingVertical: 10 }}>Account</Text>
            <Text>Edit Profile</Text>
            <Text>Change Password</Text>
          </View>
          <TouchableOpacity style={styles.infoItemArrow}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <AntDesign style={{paddingVertical: 10 }} name="setting" size={22} color="white" />
          </View>
          <View style={styles.infoDetail}>
            <Text style={{ ...styles.text, paddingHorizontal: 0, paddingVertical: 10 }}>Setting</Text>
            <Text>Themes</Text>
            <Text>Permissions</Text>
          </View>
          <TouchableOpacity style={styles.infoItemArrow}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <FontAwesome style={{paddingVertical: 10 }} name="dollar" size={21} color="white" />
          </View>
          <View style={styles.infoDetail}>
            <Text style={{ ...styles.text, paddingHorizontal: 0, paddingVertical: 10 }}>Offers & Referrals</Text>
            <Text>Offers</Text>
            <Text>Referrals</Text>
          </View>
          <TouchableOpacity style={styles.infoItemArrow}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <AntDesign style={{paddingVertical: 10 }} name="infocirlceo" size={22} color="white" />
          </View>
          <View style={styles.infoDetail}>
            <Text style={{ ...styles.text, paddingHorizontal: 0, paddingVertical: 10 }}>About</Text>
            <Text>About Movies</Text>
            <Text>More</Text>
          </View>
          <TouchableOpacity style={styles.infoItemArrow}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
          </TouchableOpacity>
        </View>



      </View>

    </View>
  )
}

export default UserAccountScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  topContainer: {
    top: 79,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 46,
    backgroundColor: "#C37E07",
    justifyContent: 'center',
    alignItems: 'center',
    right: 78,
  },
  HeaderContainer: {
    right: 15,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 46,
  },
  nameContainer: {
    top: 10,
  },
  infoContainer: {
    flex: 2,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  infoItem: {
    // flex: 1,
    marginTop: 30,
    width: 400,
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  iconContainer: {
    flex: 2,
    alignItems: 'center',
  },
  infoDetail: {
    flex: 6,
    
  },
  infoItemArrow: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontFamily: 'nunito-bold',
    fontSize: 20,
    color: Colors.textColor,
    paddingHorizontal: 36,
    paddingVertical: 16,
    fontWeight: 'bold'
  },
});