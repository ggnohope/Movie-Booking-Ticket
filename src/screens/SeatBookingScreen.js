import { Dimensions, TouchableOpacity, ImageBackground, StatusBar, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { baseImagePath } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { useEffect } from 'react';

import React, { useState } from 'react';

const {width, height} = Dimensions.get('window');

const initializeSeatDetails = () => {
  const seatDetails = [];
  for (let i = 0; i < 9; ++i) {
    const row = [];
    for (let j = 0; j < 12; ++j) {
      row.push('available');
    }
    seatDetails.push(row);
  }
  return seatDetails;
};

const SeatBookingScreen = ({navigation, route}) => {
  const [seatDetails, setSeatDetails] = useState(initializeSeatDetails());
  const [dates, setDates] = useState([]);
  const [hours, setHours] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedHour, setSelectedHour] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const arrayCol = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const arrayRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const scheduleHours = [7 * 60 + 30, 10 * 60 + 30, 13 * 60 + 30, 16 * 60 + 30, 19 * 60 + 30, 22 * 60 + 30];
  const dayOfWeekNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const normalPrice = 3;
  const specialPrice = 4.5;

  const handlePressSeat = (rowIndex, cellIndex) => {
    const updatedSeatDetails = [...seatDetails];

    if (seatDetails[rowIndex][cellIndex] === 'available') {
      updatedSeatDetails[rowIndex][cellIndex] = 'selected';
      if (rowIndex >= 3 && rowIndex <= 5 && cellIndex >= 3 && cellIndex <= 8) {
        setTotalPrice(totalPrice + specialPrice);
      }
      else setTotalPrice(totalPrice + normalPrice);
    } 
    else if (seatDetails[rowIndex][cellIndex] === 'selected') {
      updatedSeatDetails[rowIndex][cellIndex] = 'available';
      if (rowIndex >= 3 && rowIndex <= 5 && cellIndex >= 3 && cellIndex <= 8) {
        setTotalPrice(totalPrice - specialPrice);
      }
      else setTotalPrice(totalPrice - normalPrice);
    }

    setSeatDetails(updatedSeatDetails);
  }

  const renderSeats = () => {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 20}}>
        {seatDetails.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', paddingHorizontal: 2}}>
            {row.map((cell, cellIndex) => {
              if (cellIndex > 3 && cellIndex < 8 && rowIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderTopWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (cellIndex > 3 && cellIndex < 8 && rowIndex == 5) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderBottomWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 4 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 4 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 4 && cellIndex == 8) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderRightWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 3 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderTopWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 3 && cellIndex == 8) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderRightWidth: 1, borderTopWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 5 && cellIndex == 3) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 5 && cellIndex == 8) return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2, borderRightWidth: 1, borderBottomWidth: 1, borderColor: Colors.mainColor}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
              if (rowIndex == 0 && cellIndex != 0) return (
                <View style={{alignItems: 'center'}}>
                  <View>
                    <Text style={styles.text}>{arrayCol[cellIndex]}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                    <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                  </TouchableOpacity>
                </View>
              )
              if (rowIndex != 0 && cellIndex == 0) return (
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <View style={{width: 12}}>
                    <Text style={styles.text}>{arrayRow[rowIndex]}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                    <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                  </TouchableOpacity>
                </View>
              )
              if (rowIndex == 0 && cellIndex == 0) return (
                <View>
                  <View style={{paddingLeft: 25}}>
                    <Text style={styles.text}>{arrayCol[cellIndex]}</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <View style={{width: 12}}>
                      <Text style={styles.text}>{arrayRow[rowIndex]}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                      <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                    </TouchableOpacity>
                  </View>
                </View>
              )
              else return (
                <TouchableOpacity onPress={() => handlePressSeat(rowIndex, cellIndex)} style={{padding: 2}}>
                  <MaterialCommunityIcons key={cellIndex} name="seat" size={26} color={cell == 'available' ? 'white' : cell == 'taken' ? 'gray' : Colors.mainColor}/>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>
    );
  }

  const renderDates = () => {
    return (
      <View style={{paddingTop: 20, flexDirection: 'row', justifyContent: 'center', gap: 20}}>
        {
          dates.map((date, index) => (
            <TouchableOpacity onPress={() => setSelectedDate(index)} style={{ alignItems: 'center', justifyContent:'center', padding: 10, width: 60, height: 80, borderRadius: 25, backgroundColor: index != selectedDate ? '#0b0b0b' : Colors.mainColor}}>
              <Text style={{...styles.text, fontSize: 16}}>{date}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  const renderHours = () => {
    return (
      <View style={{paddingTop: 10, flexDirection: 'row', justifyContent: 'center', gap: 8}}>
        {
          hours.map((hour, index) => (
            <TouchableOpacity onPress={() => setSelectedHour(index)} style={{ alignItems: 'center', justifyContent:'center', padding: 10, borderRadius: 25, backgroundColor: index != selectedHour ? '#0b0b0b' : Colors.mainColor}}>
              <Text style={{...styles.text, fontSize: 12}}>{hour}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  useEffect(() => {
    //dates
    const currentDate = new Date();
    const datesArray = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      const dayOfWeek = dayOfWeekNames[date.getDay()]; // Lấy ngày trong tuần dưới dạng "SUN", "MON", vv.
      datesArray.push(`${date.getDate().toString().padStart(2, '0')} ${dayOfWeek}`);
    }
    //hours
    const currentTime = new Date();
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const hoursArray = scheduleHours.filter((time) => time > currentMinutes);
    const formattedHours = hoursArray.map((minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    });

    setDates(datesArray);
    setHours(formattedHours);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{uri: baseImagePath('w780', route.params.movieDetails.backdrop_path)}}
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

            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
              <Text style={{...styles.text, color: 'gray'}}>screen this side</Text>
            </View>

            </LinearGradient>

        </ImageBackground>
      </View>

      { hours.length != 0 ? renderSeats() : 
      (<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20, height: 300}}>
        <Text style={styles.text}>Showtime is over</Text>
      </View>)}

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <MaterialCommunityIcons name="circle-slice-8" size={24} color="white" />
          <Text style={styles.text}>Available</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <MaterialCommunityIcons name="circle-slice-8" size={24} color="gray" />
          <Text style={styles.text}>Taken</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <MaterialCommunityIcons name="circle-slice-8" size={24} color={Colors.mainColor} />
          <Text style={styles.text}>Selected</Text>
        </View>
      </View>

      {renderDates()}
      {renderHours()}

      <View style={{paddingBottom: 20, paddingHorizontal: 50, paddingTop: 40, flexDirection: 'row', justifyContent: 'space-between', gap: 20}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{...styles.text, fontSize: 12, color: 'gray'}}>Total Price</Text>
          <Text style={{...styles.text, fontSize: 20}}>$ {(totalPrice).toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={{borderRadius: 25, backgroundColor: Colors.mainColor, paddingVertical: 10, paddingHorizontal: 20}}>
          <Text style={styles.text}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

export default SeatBookingScreen

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
  text: {
    color: Colors.textColor,
    fontFamily: 'nunito-bold',
  },
})