import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";

import TodayTasks from "./TodayTasks";

export default function Home(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem("userData");
      let json = JSON.parse(response);
      setUser(json.login);
    }
    getUser();
  }, []);

  return (
    <View className="flex-1 items-center bg-Gray-200 mt-3">
        <TodayTasks></TodayTasks>
      <View className="flex-row justify-between items-center my-1">
        <TouchableOpacity className="flex-row justify-center rounded-lg bg-sky-800 p-3 mr-14">
          <Text
            className="text-white font-bold"
            onPress={() => props.navigation.navigate("PastTasks")}
          >
            Tarefas Passadas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-center rounded-lg bg-sky-800 p-3 ">
          <Text
            className="text-white font-bold"
            onPress={() => props.navigation.navigate("TomorrowTasks")}
          >
            Lista de Amanhã
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center my-1">
        <TouchableOpacity className="flex-row justify-center rounded-lg bg-sky-800 p-3 mt-3">
          <Text
            className="text-white font-bold"
            onPress={() => props.navigation.navigate("Login")}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View className="flex-row justify-between items-center my-1">
        <TouchableOpacity className="flex-row justify-center rounded-lg bg-sky-800 p-4 mt-3">
          <Text
            className="text-white font-bold"
            onPress={() => props.navigation.navigate("Users")}
          >
            Users
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
