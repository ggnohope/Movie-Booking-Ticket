import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, FlatList,} from 'react-native';
import { getUpcomingMoviesList, getNowPlayingMoviesList, getPopularMoviesList, baseImagePath, getGenresList, genres, } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { getCurrNowPlayingMoviesList, setCurrNowPlayingMoviesList } from '../data/data';

import Carousel from 'react-native-snap-carousel';
import PopularMovieCard from '../components/PopularMovieCard';
import ComingSoonMovieCard from '../components/ComingSoonMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState(null);
  const [popularMoviesList, setPopularMoviesList] = useState(null);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState(null);
  const [genresList, setGenresList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoaded(false);

      let nowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList(nowPlaying.results);
      setCurrNowPlayingMoviesList(nowPlaying.results);

      let popular = await getPopularMoviesList();
      setPopularMoviesList(popular.results);

      let upcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(upcoming.results);

      let genres = await getGenresList();
      setGenresList([{"id": 1, "name": "All"}, ...genres.genres]);

      setLoaded(true);
    }

    setLoaded(true);
    if (getCurrNowPlayingMoviesList() == null) fetchData();
  }, []);

  const pressGenreHandler = (index) => {
    setLoaded(false);

    setSelectedIndex(index);

    if (index != 0){
      const genreId = genresList[index].id;
      setNowPlayingMoviesList(getCurrNowPlayingMoviesList().filter(movie => movie.genre_ids.includes(genreId)));
    }
    else setNowPlayingMoviesList(getCurrNowPlayingMoviesList());

    setLoaded(true);
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

      <View style={styles.HeaderContainer}>
        <View style={styles.leftHeader}>
            <Text style={{...styles.text, paddingHorizontal: 0, paddingVertical: 10}}>Welcome, Hoa Lam</Text>
            {/* <Text style={styles.title}>{getCurrUser().name}</Text> */}
        </View>
        {/* <SearchBar searchFunction={searchMoviesFunction} /> */}
      </View>

      <View style={styles.genresSection}>
        <FlatList
          data={genresList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{gap: 10}}
          decelerationRate="fast"
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => pressGenreHandler(index)} style={[styles.genresButton, selectedIndex == index ? {backgroundColor: Colors.mainColor} : {}]}>
              <Text style={[styles.text, {fontSize: 12, paddingHorizontal: 0, paddingVertical: 0}]}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={styles.text}>Now Showing</Text>
      <Carousel
        data={nowPlayingMoviesList}
        renderItem={({item, index})=> {
          return (
            <MovieCard
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width * 0.8}
              title={item.original_title}
              voteRate={item.vote_average}
              voteCount={item.vote_count}
              genres={item.genre_ids}
              imagePath={baseImagePath('w780', item.poster_path)}
              genresList={genresList}
            />
          )
        }}
        layout={'stack'}
        inactiveSlideScale={0.85}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width*0.8}
        // slideStyle={{display: 'flex', alignItems: 'center'}}
      />
      <Text style={styles.text}>Popular</Text>
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{gap: 36}}
        decelerationRate="fast"
        snapToInterval={width/3 + 37}
        renderItem={({item, index}) => (
          <PopularMovieCard
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == popularMoviesList.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath('w342', item.poster_path)}
            isHorizontal={true}
          />
        )}
      />
      <Text style={styles.text}>Coming Soon</Text>
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 36}}
        decelerationRate="fast"
        renderItem={({item, index}) => (
          <ComingSoonMovieCard
            cardFunction={() => {
              navigation.push('MovieDetails', {movieid: item.id});
            }}
            cardWidth={width - 36*2}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList.length - 1 ? true : false}
            title={item.original_title}
            genres={item.genre_ids}
            imagePath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <View style={styles.footer}></View>
    </ScrollView>
  );
};

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
  HeaderContainer: {
    marginHorizontal: 20,
  },
  genresSection: {
    marginLeft: 10,
    marginTop: 20,
  },
  genresButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: 'gray',
  },
  text: {
    fontFamily: 'nunito-bold',
    fontSize: 20,
    color: Colors.textColor,
    paddingHorizontal: 36,
    paddingVertical: 16,
    fontWeight: 'bold'
  },
  footer: {
    height: 20
  }
});

export default HomeScreen;