import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Button } from "react-native";
import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Entypo from "react-native-vector-icons/Entypo";
// import { SelectList } from "react-native-dropdown-select-list";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import Home from "./components/Home";
import TomorrowTasks from "./components/TomorrowTasks";
import PastTasks from "./components/PastTasks";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
import Cadastrese from "./components/Cadastrese";

export default function App(props) {
  const Stack = createNativeStackNavigator();
  // const [selected, setSelected] = React.useState("");

  // const dataSelect = [
  //   { key: "1", value: "Perfil" },
  //   { key: "2", value: "Logout" },
  // ];

  // console.log(selected);
  // useEffect(() => {
  //   if (selected == 1) {
  //     // navigate("PastTasks");
  //   } else if (selected == 2) {
  //     // AsyncStorage.clear();
  //     // navigation.push("Login");
  //     // navigation.navigate('Login');
  //     // console.log(selected);
  //   }

  // }, [selected]);
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Tarefas de Hoje",
            // headerRight: () => (         
            //   // <SelectList
            //   //   setSelected={(val) => setSelected(val)}
            //   //   data={dataSelect}
            //   //   // save="value"
            //   //   label=""
            //   //   boxStyles={{ width: 60, height: 40, borderWidth: 0 }}
            //   //   dropdownStyles={{ borderWidth: 0, marginTop: -15 }}
            //   //   placeholder={<Entypo name="menu" size={20} />}
            //   //   search={false}             
            //   // />
            // ),
          }}
        />
        <Stack.Screen
          name="TomorrowTasks"
          options={{ title: "Tarefas de Amanhã" }}
          component={TomorrowTasks}
        />
        <Stack.Screen
          name="PastTasks"
          options={{ title: "Buscar Tarefas" }}
          component={PastTasks}
        />
        <Stack.Screen
          name="Login"
          options={{ title: "Login", headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Cadastrese"
          options={{ title: "Cadastre-se", headerShown: true }}
          component={Cadastrese}
        />
        <Stack.Screen
          name="Users"
          options={{ title: "Users", headerShown: true }}
          component={Users}
        />
        <Stack.Screen
          name="User"
          options={{ title: "Perfil", headerShown: true }}
          component={User}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
