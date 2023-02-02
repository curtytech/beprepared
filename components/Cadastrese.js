import { Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cadastrese(props) {
  const [display, setDisplay] = useState("hidden");
  const [notValidated, setnotValidated] = useState(null);
  const [firstName, setfirstName] = useState("none");
  const [lastName, setlastName] = useState("none");
  const [login, setLogin] = useState("none");
  const [password, setpassword] = useState("none");

  async function validate() {
    if (firstName == null || firstName == "") {
      setnotValidated(true);
    }
    if (lastName == null || lastName == "") {
      setnotValidated(true);
    }
    if (login == null || login == "") {
      setnotValidated(true);
    }
    if (password == null || password == "") {
      setnotValidated(true);
    }
  }

  // Enviar From Login
  async function sendFormCadastrese() {
    let response = await fetch("http://192.168.0.108:3000/createUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        login: login,
        password: password,
      }),
    });
    let json = await response.json();
    // console.log(json);
    validate();
    if (notValidated == true) {
      if (json === "error") {
       
      } else {
                
        console.log('foi');
        props.navigation.navigate("Login");
      }
    } else {
      setDisplay("");
      setTimeout(() => {
        setDisplay("hidden");
      }, 5000);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-sky-100">
      <Text className={`rounded-lg p-3 font-bold bg-red-400 text-black text-lg ${display} my-3`}>
        Preencha todos os campos!
      </Text>
      <TextInput
        onChangeText={(firstName) => setfirstName(firstName)}
        placeholder="Nome"
        type="text"
        className="text-center w-80 py-2 my-1 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>
      <TextInput
        onChangeText={(lastName) => setlastName(lastName)}
        placeholder="Sobrenome"
        type="text"
        className="text-center w-80 py-2 my-1 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>
      <TextInput
        onChangeText={(login) => setLogin(login)}
        placeholder="Email"
        type="email"
        autoComplete="email"
        className="text-center w-80 py-2 my-1 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>
      <TextInput
        onChangeText={(password) => setpassword(password)}
        placeholder="Senha"
        secureTextEntry={true}
        autoComplete="password"
        className="text-center w-80 py-2 my-1 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>

      <View className="flex-row justify-between items-center my-3">
        <TouchableOpacity className="flex-row w-80 justify-center rounded-full bg-sky-800 p-3 mt-3">
          <Text
            className="text-white font-bold"
            onPress={() => sendFormCadastrese()}
          >
            Enviar
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
