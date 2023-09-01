import { Image, ImageBackground, StatusBar, ScrollView, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieDetails, getReviews, getCastList, baseImagePath } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const MovieDetailsScreen = ({navigation, route}) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [castList, setCastList] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);

      const movieDetails = await getMovieDetails(route.params.movieid)
      setMovieDetails(movieDetails);

      const reviews = await getReviews(route.params.movieid)
      setReviews(reviews);

      const castList = await getCastList(route.params.movieid)
      setCastList(castList);

      setLoaded(true);
    }

    fetchData();
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
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{uri: baseImagePath('w780', movieDetails.backdrop_path)}}
          style={styles.imageBG}
        >
          <LinearGradient colors={['rgba(0,0,0,0.1)', Colors.backgroundColor]} style={styles.linearGradient}>
            
            <View style={{flexDirection: 'row'}}>
              <BlurView 
                intensity={60} tint="dark" style={styles.blurContainer}
              >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.BackButton}>
                  <AntDesign name="arrowleft" size={24} color={Colors.mainColor} />
                </TouchableOpacity>
              </BlurView>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <BlurView 
                intensity={60} tint="dark" style={styles.blurContainer}
              >
                <TouchableOpacity onPress={() => {}} style={styles.BackButton}>
                  <AntDesign name="caretright" size={24} color={Colors.mainColor} />
                </TouchableOpacity>
              </BlurView>
            </View>

            <View style={{justifyContent: 'flex-end', alignItems: 'center', flex: 1, paddingBottom: 30}}>
              <TouchableOpacity style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.mainColor, paddingHorizontal: 20, paddingVertical: 10}}>
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={30} color="white" />
                <Text style={styles.text}>Get Tickets</Text>
              </TouchableOpacity>
            </View>

          </LinearGradient>
        </ImageBackground>
        {/* <View style={styles.imageBG}></View>
        <Image
          source={{uri: baseImagePath('w342', movieDetails.poster_path)}}
          style={styles.cardImage}
        /> */}
      </View>

    </ScrollView>
  )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.backgroundColor,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  BackButton: {
    padding: 10,
    borderRadius: 15,
  },
  blurContainer: {
    margin: 10,
    borderRadius: 30,
    overflow: 'hidden',
  },
  imageBG: {
    width: '100%',
    aspectRatio: 2 / 1.5,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  text: {
    color: Colors.textColor,
    fontFamily: 'nunito-bold',
  },
})