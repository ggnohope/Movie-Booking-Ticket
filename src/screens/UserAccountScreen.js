import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { getUpcomingMoviesList, getNowPlayingMoviesList, getPopularMoviesList, baseImagePath, getGenresList, genres, } from '../api/apicalls';
import { Colors } from '../../assets/theme';
import { getCurrNowPlayingMoviesList, setCurrNowPlayingMoviesList, getCurrUser, setCurrUser } from '../data/data';
import { AntDesign, Ionicons, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { user } from '../data/data';


const {width, height} = Dimensions.get('window');

const UserAccountScreen = () => {

  // const [user, setUser] = useState(getCurrUser());
  const CurrUser = user[0];
  const [modalName, setModalName] = useState(false);
  const [modalPhone, setModalPhone] = useState(false);
  const [modalEmail, setModalEmail] = useState(false);
  const [modalAddress, setModalAddress] = useState(false);
  const [modalBalance, setModalBalance] = useState(false);

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [balance, setBalance] = useState(user.balance);
  const [loading, setLoading] = useState(true);

  const handlePressCloseName = () => {
    setName(user.name);
    setModalName(!modalName);
  }
  const handlePressSaveName = async () => {
    CurrUser.name = name;
    setModalName(!modalName);
  }
  const handlePressClosePhone = () => {
    setPhone(user.phone);
    setModalPhone(!modalPhone);
  }
  const handlePressSavePhone = async () => {
    CurrUser.phone = phone;
    setModalPhone(!modalPhone);
  }
  const handlePressCloseEmail = () => {
    setEmail(user.email);
    setModalEmail(!modalEmail);
  }
  const handlePressSaveEmail = async () => {
    CurrUser.email = email
    setModalEmail(!modalEmail);

  }
  const handlePressCloseAddress = () => {
    setAddress(user.address);
    setModalAddress(!modalAddress);
  }
  const handlePressSaveAddress = async () => {
    CurrUser.address = address
    setModalAddress(!modalAddress);
  }

  const handlePressCloseBalance = () => {
    setBalance(user.balance);
    setModalBalance(!modalBalance);
  }
  const handlePressSaveBalance = async () => {
    CurrUser.balance = balance
    setModalBalance(!modalBalance);
  }

  if (!loading) return (
    <View style={{...styles.container, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={Colors.mainColor}/>
    </View>
  )
  else 
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalName}
        onRequestClose={() => {
          setModalName(!modalName);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your full name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => setName(name)}
                defaultValue={CurrUser.name}
                editable={true}
                maxLength={50}
                textAlign='center'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseName()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveName()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPhone}
        onRequestClose={() => {
          setModalPhone(!modalPhone);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your phone number:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(phone) => setPhone(phone)}
                defaultValue={CurrUser.phone}
                editable={true}
                maxLength={50}
                textAlign='center'
                keyboardType='numeric'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressClosePhone()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSavePhone()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEmail}
        onRequestClose={() => {
          setModalEmail(!modalEmail);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your email:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(email) => setEmail(email)}
                defaultValue={CurrUser.email}
                editable={true}
                maxLength={50}
                textAlign='center'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseEmail()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveEmail()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddress}
        onRequestClose={() => {
          setModalAddress(!modalAddress);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your Address:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(address) => setAddress(address)}
                defaultValue={CurrUser.address}
                editable={true}
                maxLength={50}
                textAlign='center'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseAddress()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveAddress()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalBalance}
        onRequestClose={() => {
          setModalBalance(!modalBalance);
        }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.title, fontSize: 20, }}>Change your Balance:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(balance) => setBalance(balance)}
                defaultValue={CurrUser.balance}
                editable={true}
                maxLength={50}
                textAlign='center'
              />
              <View style={{ flexDirection: 'row', gap: 20, paddingTop: 50 }}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePressCloseBalance()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: Colors.mainColor }}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={() => handlePressSaveBalance()}>
                  <Text style={{ ...styles.title, fontSize: 20, color: 'white' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>


      <View style={styles.infoSection}>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="user" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Full name</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user[0].name}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalName(!modalName)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="phone" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Phone number</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user[0].phone}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalPhone(!modalPhone)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="mail" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Email</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user[0].email}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalEmail(!modalEmail)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <AntDesign name="enviromento" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Address</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user[0].address}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalAddress(!modalAddress)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.icon}>
            <Feather name="dollar-sign" size={24} color={Colors.mainColor} />
          </View>
          <View style={styles.info}>
            <Text style={styles.details}>Balance</Text>
            <Text numberOfLines={3} style={{ ...styles.title, fontSize: 20, maxWidth: 250 }}>{user[0].balance}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalBalance(!modalBalance)} style={styles.editIcon}>
            <AntDesign name="edit" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default UserAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
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
  details: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'nunito-regular',
  },
  infoSection: {
    flex: 1,
    padding: 40,
    paddingHorizontal: 30,
    gap: 30,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    width: '100%',
  },
  icon: {
    padding: 12,
    backgroundColor: '#f7f8fb',
    borderRadius: 50,
  },
  info: {
    gap: 3,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    marginTop: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f7f8fb',
    width: width-100,
    fontFamily: 'nunito-regular',
    fontSize: 18,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 50
  },
  buttonSave: {
    backgroundColor: Colors.mainColor,
  },
  buttonClose: {
    backgroundColor: '#f7f8fb',
  },
})
