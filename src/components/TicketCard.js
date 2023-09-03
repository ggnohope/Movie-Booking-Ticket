import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { getGenresList } from '../api/apicalls';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { Colors } from '../../assets/theme';


const TicketCard = (props) => {
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }


  return (
    <View style={[
      styles.container,
      { maxWidth: props.cardWidth },
    ]}>
      <Image
        style={[styles.cardImage, { width: props.cardWidth }]}
        source={{ uri: props.imagePath }}
      />
      <View style={styles.detailContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.textTitle}>
            {props.title}
          </Text>
        </View>
        <View style={[styles.detailDateContainer, {flexDirection: 'row'}]}>
          <View style={styles.detailDate}>
            <Text style={styles.textDate}>{getMonthName(props.date.getMonth()).substring(0, 3)}</Text>
            <Text style={styles.textDate2}>{props.date.getDate()}</Text>
          </View>
          <View style={[styles.detailTime]}>
          <EvilIcons style={{paddingBottom: 5}} name="clock" size={34} color="white" />
          <Text style={styles.textDate2}>{props.date.getHours() + ':' + props.date.getMinutes()}</Text>
          </View>
        </View>
        <View style={styles.detailPositionContainer}>
          <View style={styles.detailPosition}>
            <Text style={styles.textDate}>Hall</Text>
            <Text style={styles.textDate2}>{props.position.hall}</Text>
          </View>
          <View style={styles.detailPosition}>
            <Text style={styles.textDate}>Row</Text>
            <Text style={styles.textDate2}>{props.position.row}</Text>
          </View>
          <View style={styles.detailPosition}>
            <Text style={styles.textDate}>Seat</Text>
            <Text style={styles.textDate2}>{props.position.seat}</Text>
          </View>
        </View>
        <View style={styles.detailBarcodeContainer}>
        <Image
        style={{width: 250, height: 70}}
        source={require('../../assets/barcode.png')}
      />
        </View>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 40,
    left: 25,
    display: 'flex',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 30,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 20,
    // height: 300,
  },
  textTitle: {
    fontFamily: 'nunito-regular',
    fontSize: 25,
    color: Colors.textColor,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  textDate: {
    fontFamily: 'nunito-regular',
    fontSize: 20,
    color: Colors.textColor,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  textDate2: {
    fontFamily: 'nunito-regular',
    fontSize: 17,
    color: Colors.textColor,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  detailDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTime: {
    flex: 1,
    alignItems: 'center',
  },
  detailPositionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailPosition: {
    alignItems: 'center',
  },
  detailBarcodeContainer: {
    alignItems: 'center',
  },
});

export default TicketCard;