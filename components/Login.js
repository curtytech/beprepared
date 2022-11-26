import {  
  Text,
  TextInput,
  View,
  TouchableOpacity,  
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props) {
  const [display, setDisplay] = useState("hidden");
  const [user, setUser] = useState("none");
  const [login, setLogin] = useState("none");
  const [password, setPassword] = useState("none");

  // Enviar From Login
  async function sendForm() {
    let response = await fetch("http://192.168.0.110:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    });
    let json = await response.json();
    // console.log(json);
    if (json === "error") {
      setDisplay("");
      setTimeout(() => {
        setDisplay("hidden");
      }, 5000);
      await AsyncStorage.clear();
    } else {
      let userData = await AsyncStorage.setItem(
        "userData",
        JSON.stringify(json)
      );
      // let resData = await AsyncStorage.getItem("userData");
      // console.log(JSON.parse(resData));
      props.navigation.navigate("Home")
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-sky-100">
      <Text className={`font-bold text-red-600 text-lg ${display}`}>
        Usuario ou Senha Inválidos
      </Text>
      <Text className="font-bold text-lg text-slate-700 pb-2 float-left">
        Email
      </Text>
      <TextInput
        onChangeText={(login) => setLogin(login)}
        type="email"
        autoComplete="email"
        className="text-center w-80 py-2 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>

      <Text className="font-bold text-lg text-slate-700 pb-2 float-left mt-4">
        Senha
      </Text>
      <TextInput
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        autoComplete="password"
        className="text-center w-80 py-2 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>

      <View className="flex-row justify-between items-center my-3">
        <TouchableOpacity className="flex-row w-80 justify-center rounded-full bg-sky-800 p-3 mt-3">
          <Text className="text-white font-bold" onPress={() => sendForm()}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <TouchableOpacity className="flex-row justify-center">
          <Text className="text-black font-bold">Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
