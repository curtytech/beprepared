import { Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as AuthSession from "expo-auth-session";

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
      props.navigation.navigate("Home");
    }
  }

  // type AuthResponse = {
  //   type: string,
  //   params: {
  //     access_token: string,
  //   },
  // };

  // async function handleSingInWithGoogle() {
  //   const CLIENT_ID =
  //     "901813923355-u3k7kg3171l3bqtetbgepo7tfev424ga.apps.googleusercontent.com";
  //   const REDIRECT_URI = "https://auth.expo.io/@phelipecurty/organiza";
  //   const RESPONSE_TYPE = "token";
  //   const SCOPE = encodeURI("profile email");

  //   const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  //   const response = await AuthSession.startAsync({ authUrl });
  //   const {type, params} = await AuthSession;
  //   // .startAsync({authUrl}) as AuthResponse;
  //   console.log(response);
  // }

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
        <TouchableOpacity className="flex-row w-64 justify-center rounded-lg bg-sky-800 p-3 mt-3">
          <Text className="text-white font-bold" onPress={() => sendForm()}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center">
        <TouchableOpacity className="flex-row w-64 justify-center rounded-lg bg-sky-800 p-3 mt-1">
          <Text
            className="text-white font-bold"
            onPress={() => props.navigation.navigate("Cadastrese")}
          >
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center">
        <TouchableOpacity className="flex-row w-64 justify-center rounded-lg bg-red-600 p-3 mt-3">
          <FontAwesome
            size={30}
            color={"#fff"}
            onPress={() => {
              doCompleted({ id });
            }}
            name={"google-plus-square"}
          />
          <Text
            className="text-white  font-bold ml-3 py-1"
            onPress={() => handleSingInWithGoogle()}
          >
            Entrar com o google
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mt-4">
        <TouchableOpacity className="flex-row justify-center">
          <Text className="text-black font-bold">Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
