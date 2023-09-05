import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, FlatList, Image } from 'react-native';
import { getNowPlayingMoviesList, baseImagePath } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import Carousel from 'react-native-snap-carousel';
import { TicketBooked } from '../data/data';
import TicketCard from '../components/TicketCard';
import LoginScreen from '../screens/LoginScreen';
import LoginNavigator from '../navigators/LoginNavigator'

const { width, height } = Dimensions.get('window');

const TicketScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>My Tickets</Text>
      </View>
      <Carousel
        data={TicketBooked}
        renderItem={({ item, index }) => {
          return (
            <TicketCard
              cardWidth={width * 0.7}
              title={item.title}
              imagePath={item.imgPath}
              date={item.date}
              position={item.position}
            />
          )
        }}
        layout={'stack'}
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.8}
        style={styles.ticketContainer}
      />
    </View>
  )
}

export default TicketScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  ticketContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  title: {
    fontFamily: 'nunito-bold',
    fontSize: 26,
    color: Colors.mainColor
  },
})