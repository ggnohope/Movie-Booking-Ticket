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

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
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

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flex: 1,
//     backgroundColor: Colors.backgroundColor,
//   },
//   topContainer: {
//     top: 79,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',

//   },
//   closeButton: {
//     width: 30,
//     height: 30,
//     borderRadius: 46,
//     backgroundColor: Colors.mainColor,
//     justifyContent: 'center',
//     alignItems: 'center',
//     right: 78,
//   },
//   HeaderContainer: {
//     right: 15,
//   },
//   avatarContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     top: 50,
//   },
//   imageContainer: {
//     width: 90,
//     height: 90,
//     borderRadius: 46,
//   },
//   nameContainer: {
//     top: 10,
//   },
//   infoContainer: {
//     flex: 2,
//     // justifyContent: 'center',
//     alignItems: 'center',
//   },
//   infoItem: {
//     // flex: 1,
//     marginTop: 30,
//     width: 400,
//     flexDirection: 'row',
//     // justifyContent: 'center',
//   },
//   iconContainer: {
//     flex: 2,
//     alignItems: 'center',
//   },
//   infoDetail: {
//     flex: 6,

//   },
//   infoItemArrow: {
//     flex: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   text: {
//     fontFamily: 'nunito-bold',
//     fontSize: 20,
//     color: Colors.textColor,
//     paddingHorizontal: 36,
//     paddingVertical: 16,
//     fontWeight: 'bold'
//   },
// });



{/* <View style={styles.container}>

<View style={styles.topContainer}>
  <View style={styles.closeButton}>
    <Ionicons style={{ left: 0.4, top: 0.3 }} name="close-circle-outline" size={28} color="white" />
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
      <FontAwesome style={{ paddingVertical: 10 }} name="user-o" size={20} color="white" />
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
      <AntDesign style={{ paddingVertical: 10 }} name="setting" size={22} color="white" />
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
      <FontAwesome style={{ paddingVertical: 10 }} name="dollar" size={21} color="white" />
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
      <AntDesign style={{ paddingVertical: 10 }} name="infocirlceo" size={22} color="white" />
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

</View> */}