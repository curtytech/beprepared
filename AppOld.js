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

import TodayTasks from "./components/TodayTasks";

export default function App(props) {
  const Stack = createNativeStackNavigator();

  return (    
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator> */}
      
      <View className="flex-1 items-center justify-center bg-sky-100">
        <TodayTasks></TodayTasks>

        <View className="flex-row justify-between items-center my-1">
          <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-3 mt-5 mr-14">
            <Text className="text-white font-bold">Tarefas Passadas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-3 mt-5">
            <Text className="text-white font-bold" onPress={()=>props.navigation.navigate('Home')}>Lista de Amanhã</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center my-1">
          <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-4 mt-3">
            <Text className="text-white font-bold">Nova Tarefa</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}
