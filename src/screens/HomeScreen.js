import React, {useEffect, useRef, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, StatusBar, FlatList,} from 'react-native';
import { getUpcomingMoviesList, getNowPlayingMoviesList, getPopularMoviesList, baseImagePath, getGenresList, genres, } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { getCurrNowShowingMoviesList, setCurrNowShowingMoviesList } from '../data/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

import Carousel from 'react-native-snap-carousel';
import PopularMovieCard from '../components/PopularMovieCard';
import ComingSoonMovieCard from '../components/ComingSoonMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [nowShowingMoviesList, setNowShowingMoviesList] = useState(null);
  const [popularMoviesList, setPopularMoviesList] = useState(null);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState(null);
  const [genresList, setGenresList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loaded, setLoaded] = useState(true);

  const schedules = ['07:30', '10:30', '13:30', '16:30', '19:30', '22:30'];

  useEffect(() => {
    async function createSchedule() {
      const colRef = collection(FIRESTORE_DB, 'Schedule');
      const idNowShowingMoviesList = getCurrNowShowingMoviesList().map(movie => movie.id.toString());

      try {
        const querySnapshot = await getDocs(colRef);
        if (querySnapshot.empty) {
          getCurrNowShowingMoviesList().forEach(async (movie, index) => {
            const lichChieu = { P1: null, P2: null, P3: null, P4: null, P5: null, P6: null };
            const keys = Object.keys(lichChieu);

            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              lichChieu[key] = schedules[(i + index) % schedules.length];
            }

            const docRef = doc(colRef, movie.id.toString());
            await setDoc(docRef, lichChieu);
          });
        }
        else {
          let idQuerySnapshotList = querySnapshot.docs.map(doc => doc.id);
          console.log('QueryList:', idQuerySnapshotList);
          console.log('NowShowingList:', idNowShowingMoviesList);
          querySnapshot.docs.forEach(async (document) => {
            if (!idNowShowingMoviesList.includes(document.id)) {
              const tempId = document.id;
              const tempData = document.data();

              let newId = "";
              for (let i = 0; i < idNowShowingMoviesList.length; ++i) {
                if (!idQuerySnapshotList.includes(idNowShowingMoviesList[i])) newId = idNowShowingMoviesList[i];
              }

              idQuerySnapshotList = idQuerySnapshotList.map((id) => {
                if (id == tempId) return newId;
                return id;
              })

              console.log('Delete id:', tempId);
              console.log('Add id:', newId);

              await deleteDoc(doc(colRef, tempId));

              const docRef = doc(colRef, newId);
              await setDoc(docRef, tempData);
            }
          });
        }
        
      } catch(error) {
        console.error('Error in createSchedule: ', error);
      };
    }

    async function fetchData() {
      setLoaded(false);

      let nowPlaying = await getNowPlayingMoviesList();
      setNowShowingMoviesList(nowPlaying.results.slice(0, 6));
      setCurrNowShowingMoviesList(nowPlaying.results.slice(0, 6));

      let popular = await getPopularMoviesList();
      setPopularMoviesList(popular.results);

      let upcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(upcoming.results);

      let genres = await getGenresList();
      setGenresList([{"id": 1, "name": "All"}, ...genres.genres]);

      await createSchedule();
    }

    if (getCurrNowShowingMoviesList() == null) fetchData();
    setLoaded(true);
  }, []);

  const pressGenreHandler = (index) => {
    setLoaded(false);

    setSelectedIndex(index);

    if (index != 0){
      const genreId = genresList[index].id;
      setNowShowingMoviesList(getCurrNowShowingMoviesList().filter(movie => movie.genre_ids.includes(genreId)));
    }
    else setNowShowingMoviesList(getCurrNowShowingMoviesList());

    setLoaded(true);
  }

  if (!loaded) {
    return (
      <ScrollView
        style={{...styles.container, paddingTop: insets.top}}
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
    <ScrollView style={{...styles.container, paddingTop: insets.top}}>
      <StatusBar hidden />

      <View style={styles.HeaderContainer}>
        <View style={styles.leftHeader}>
            <Text style={{...styles.text, paddingHorizontal: 0, paddingVertical: 10}}>Welcome, Hoa Lam</Text>
            {/* <Text style={styles.title}>{getCurrUser().name}</Text> */}
        </View>
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
        data={nowShowingMoviesList}
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