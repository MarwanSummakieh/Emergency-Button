import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import { mainGradient, registerPageStyles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import UserIcon from "../assets/image_components/registerPage/RegisterPageUserIcon";
import MailIcon from "../assets/image_components/registerPage/RegisterPageMailIcon";
import { KeyboardType } from "react-native";
import { styles } from "../css/styles";
import { firebaseApp, firebaseAuth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
  const [mail, onChangeMail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  function InputField(
    icon: JSX.Element,
    onChangeFunc: React.Dispatch<React.SetStateAction<string>>,
    value: any,
    placeholder: string,
    keyboardType: KeyboardType
  ) {
    return (
      <View style={styles.inputField}>
        {icon}
        <TextInput
          style={styles.inputFieldText}
          onChangeText={onChangeFunc}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    );
  }

  function signUp() {
    if (password != "" && mail != "") {
      createUserWithEmailAndPassword(firebaseAuth, mail, password).then(
        (response) => console.log(response)
      );
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={mainGradient}
        style={styles.background}
      >
        <View style={styles.inputsContainer}>
          {InputField(
            <MailIcon />,
            onChangeMail,
            mail,
            "Your Email",
            "email-address"
          )}

          {InputField(
            <UserIcon />,
            onChangePassword,
            password,
            "Your Password",
            "default"
          )}
          <Pressable
            onPress={() => {
              alert("Sign in Successful");
            }}
            style={registerPageStyles.signinButton}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Sign in</Text>
            </View>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}
