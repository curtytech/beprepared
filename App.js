import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entypo from "react-native-vector-icons/Entypo";

import Home from "./components/Home";
import TomorrowTasks from "./components/TomorrowTasks";
import PastTasks from "./components/PastTasks";
import Login from "./components/Login";
import Users from "./components/Users";
import Cadastrese from "./components/Cadastrese";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Tarefas de Hoje",
            headerRight: () => (
              <Entypo 
              name="user" size={30} />
            ),
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
