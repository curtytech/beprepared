import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./components/Home";
import TomorrowTasks from "./components/TomorrowTasks";
import PastTasks from "./components/PastTasks";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import { useState } from "react";

// const App2 = () => {
//   const [task,  setTasks] = useState([
//     {
//       id: "1",
//       title: "Estudar React",
//       completed: false,
//     },
//     {
//       id: "2",
//       title: "Estudar Native Wind",
//       completed: false,
//     },
//   ]);

//   setTasks([])

//   return (
//     <>
//       <View>
//         <Tasks task={task} />
//       </View>
//     </>
//   )

// };

// export default App2;


export default function App() {
  const Stack = createNativeStackNavigator();  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: "Tarefas de Hoje" }}
          component={Home}
        />
        <Stack.Screen
          name="TomorrowTasks"
          options={{ title: "Tarefas de Amanhã" }}
          component={TomorrowTasks}
        />
        <Stack.Screen
          name="PastTasks"
          options={{ title: "Tarefas Passadas" }}
          component={PastTasks}
        />
        <Stack.Screen
          name="Login"
          options={{ title: "Login", headerShown: false }}
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
