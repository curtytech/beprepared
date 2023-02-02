import {
  Text,
  View, TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Controller from "../Controller";

export default function User(props) {
  const [idUser, setUser] = useState(null);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem("userData");
      let json = JSON.parse(response);
      setUser(json.id);
    }
    getUser();
    console.log(idUser);
  }, []);

  useEffect(() => {
    fetch(`http://192.168.0.108:3000/readUser/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataUser(data);
        // console.log(data);
      })
      .catch((err) => console.error(err));
  }, [idUser]);



  useEffect(() => {
    async function getDataUser() {
      let response = await AsyncStorage.getItem("userData");
      let json = JSON.parse(response);
      setUser(json.id);
    }
    getDataUser();
    // console.log(idUser);
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Login');
  };
  return (

    <View className="flex-1 items-center bg-Gray-200 mt-3">
      <View className="w-11/12 bg-white rounded-lg p-2 my-5">
        <View className="flex-row justify-between items-center my-1 ">
          <Text className="text-black font-bold">Login: {dataUser.email}</Text>
        </View>
        <View className="flex-row justify-between items-center my-1 ">
          <Text className="text-black font-bold">Nome: {dataUser.firstName}</Text>
        </View>
        <View className="flex-row justify-between items-center my-1 ">
          <Text className="text-black font-bold">Sobrenome: {dataUser.lastName}</Text>
        </View>
        <View className="flex-row justify-between items-center my-1 ">
          <Text className="text-black font-bold">Criado Em: {dataUser.createdAt}</Text>
        </View>
        <View className="flex-row justify-between items-center my-1 ">
          <Text className="text-black font-bold">Possui Conta Google? {dataUser.idGoogle == null ? 'Não' : 'Sim'}</Text>
        </View>

      </View>
      <TouchableOpacity className="flex-row rounded-lg bg-red-800 p-3 ">
        <Text
          className="text-white font-bold"

          onPress={handleLogout}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
