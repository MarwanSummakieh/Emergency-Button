import React, { useEffect, useState } from "react";
import {
  Pressable,
  View,
  Dimensions,
  StyleSheet,
  Text,
  Modal,
  Alert,
  Animated,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from "expo-linear-gradient";
import EmergencyButtonUnpressed from "../assets/svgs/emergencyPage/EmergencyButtonUnpressed";
import EmergencyButtonPressed from "../assets/svgs/emergencyPage/EmergencyButtonPressed";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import * as Notifications from "expo-notifications";
import { userID } from "../consts";
import Constants from "expo-constants";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const mainGradient = ["rgba(52, 170, 252, 1)", "rgba(118, 10, 202, 1)"];

async function messagesentNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "your message has been sent",
      body: "we'll notify you when someone responds",
      data: { data: 'goes here' },
    },
    trigger: null
  });
}

export default function EmergencyButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const uid = SecureStore.getItemAsync(userID);
  console.log(uid);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const sendinglocation = () => {
    fetch("/post/data/here", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UID: uid,
        latitude: latitude,
        longitude: longitude,
      }),
    }).then((res) => {
      if(res.status === 200){
        messagesentNotification();
      }
    });
  };


  const showModalTimer = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 4000);
  };


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);
  // const renderTime = ({remainingTime}) => {
  //   if (remainingTime === 0) {
  //     return <div className="timer">Too lale...</div>;
  //   }

  //   return (
  //     <div className="timer">
  //       <div className="text">Remaining</div>
  //       <div className="value">{remainingTime}</div>
  //       <div className="text">seconds</div>
  //     </div>
  //   );
  // };

  // const renderTime = ({remainingTime}) => {
  //   CountdownCircleTimer: remainingTime === 0 ? <Text>Complete</Text>
  // }

  return (
    <View style={styles.container}>
      <LinearGradient colors={mainGradient} style={styles.background}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Emergency message was cancelled");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CountdownCircleTimer
                isPlaying
                duration={3}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[3, 2, 1, 0]}
                onComplete={() => ({ shouldRepeat: false })}
              >
                {({ remainingTime }) => (
                  <Animated.Text style={{ fontSize: 50 }}>
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
              <Text style={styles.modalText}>
                Emergency message is sending...
              </Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Text>If you're not sure click CANCEL</Text>
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.emergencyButton]}
          onPress={() => {
            showModalTimer();
          }}
        >
          <Text style={styles.emergencyMessage}>
            In case of emergency click the button
          </Text>

          <EmergencyButtonUnpressed />
        </Pressable>
      </LinearGradient>
    </View>

    /* // <View style={styles.container}>
    //   <LinearGradient colors={mainGradient} style={styles.background}>
    //     <Pressable style={styles.emergencyButton}>
    //       <EmergencyButtonUnpressed />
    //     </Pressable>
    //   </LinearGradient>
    // </View> */
  );

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    height: windowHeight,
    width: windowWidth,
  },
  text: {
    color: "#000000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  emergencyMessage: {
    padding: 10,
    flexDirection: "column",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  emergencyButtonView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
