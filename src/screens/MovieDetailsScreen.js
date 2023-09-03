import { Dimensions, ImageBackground, StatusBar, ScrollView, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieDetails, getReviews, getCastList, baseImagePath } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { getCurrNowPlayingMoviesList } from '../data/data';

import CastCard from '../components/CastCard';
import CommentCard from '../components/CommentCard';

const {width, height} = Dimensions.get('window');

const MovieDetailsScreen = ({navigation, route}) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [castList, setCastList] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);

      const movieDetails = await getMovieDetails(route.params.movieid)
      setMovieDetails(movieDetails);

      const reviews = await getReviews(route.params.movieid)
      setReviews(reviews.results);

      const castList = await getCastList(route.params.movieid)
      setCastList(castList.cast.filter(cast => cast.known_for_department == "Acting"));

      const nowPlayingMoviesList = getCurrNowPlayingMoviesList();
      for (let i = 0; i < nowPlayingMoviesList.length; ++i) {
        if (nowPlayingMoviesList[i].id == route.params.movieid) {
          setAvailable(true);
          break;
        }
      }

      setLoaded(true);
    }

    fetchData();
  }, []);

  const renderGenres = () => {
    return (
      movieDetails.genres.map((genre, index) => {
          if (index < 3) return (
            <View style={styles.genreBox}>
              <Text style={styles.subText}>{genre.name}</Text>
            </View>
          )
        }
      )
    )
  }

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
              { available ?
              (<TouchableOpacity onPress={() => {navigation.navigate('SeatBooking', {movieDetails: movieDetails})}} style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.mainColor, paddingHorizontal: 20, paddingVertical: 10}}>
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={30} color="white" />
                <Text style={styles.text}>Get Tickets</Text>
              </TouchableOpacity>)
              :
              (<View style={{borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 10}}>
                <MaterialCommunityIcons name="ticket-confirmation-outline" size={30} color="white" />
                <Text style={styles.text}>Unavailable</Text>
              </View>)
              }
            </View>

          </LinearGradient>
        </ImageBackground>
      </View>
      
      <View style={{paddingHorizontal: 10}}>

        <View style={{paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            {renderGenres()}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginRight: 5}}>
            <AntDesign name="clockcircle" size={16} color={Colors.textColor} />
            <Text style={{...styles.subText, fontSize: 12}}>{movieDetails.runtime} minutes</Text>
          </View>
        </View>

        <View style={{paddingVertical: 20}}>
          <Text style={{...styles.text, fontSize: 24}}>{movieDetails.original_title}</Text>
        </View>

        <View>
          <Text numberOfLines={6} style={styles.subText}>{movieDetails.overview}</Text>
        </View>

        <View style={{paddingVertical: 20}}>
          <Text style={{...styles.text, fontSize: 20}}>Top Cast</Text>
        </View>

        <View>
          <FlatList
            data={castList}
            keyExtractor={(item) => item.id}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{gap: 5}}
            decelerationRate="fast"
            renderItem={({item, index}) => (
              <CastCard
                cardWidth={width/6}
                isFirst={index == 0 ? true : false}
                isLast={index == castList.length - 1 ? true : false}
                name={item.name}
                imagePath={baseImagePath('w342', item.profile_path)}
              />
            )}
          />
        </View>

        <View style={{paddingVertical: 20}}>
          <Text style={{...styles.text, fontSize: 20}}>Reviews</Text>
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.subText}>{reviews.length} Comments</Text>
          <View style={styles.voteContainer}>
            <AntDesign name="star" size={18} color={Colors.mainColor} />
            <Text style={styles.subText}>{movieDetails.vote_average} ({movieDetails.vote_count})</Text>
          </View>
        </View>

        <View>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 0}}
            decelerationRate="fast"
            renderItem={({item, index}) => (
              <CommentCard
                cardWidth={width}
                name={item.author}
                rating={item.author_details.rating}
                imagePath={item.author_details.avatar_path}
                content={item.content}
              />
            )}
          />
        </View>

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
  genreBox: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#484747',
    marginHorizontal: 5,
  },
  subText: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: Colors.textColor,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
})