import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, FlatList, Image } from 'react-native';
import { getNowPlayingMoviesList, baseImagePath } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import Carousel from 'react-native-snap-carousel';
import { getCurrNowPlayingMoviesList, setCurrNowPlayingMoviesList, TicketBooked } from '../data/data';
import TicketCard from '../components/TicketCard';
const { width, height } = Dimensions.get('window');

const TicketScreen = () => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState(null);
  const [loaded, setLoaded] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setLoaded(false);

      let nowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList(nowPlaying.results);
      setCurrNowPlayingMoviesList(nowPlaying.results);
      setLoaded(true);
    }

    setLoaded(true);
    if (getCurrNowPlayingMoviesList() == null) fetchData();
  }, []);

  if (!loaded) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Colors.mainColor} />
        </View>
      </ScrollView>
    );
  }
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