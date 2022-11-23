import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";

import TodayTasks from "./TodayTasks";

export default function Home(props) {
  return (
      <View className="flex-1 items-center justify-center bg-sky-100">
        <TodayTasks></TodayTasks>

        <View className="flex-row justify-between items-center my-1">
          <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-3 mt-5 mr-14">
            <Text className="text-white font-bold"
            onPress={() => props.navigation.navigate("PastTasks")}
            >Tarefas Passadas</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-3 mt-5">
            <Text
              className="text-white font-bold"
              onPress={() => props.navigation.navigate("TomorrowTasks")}
            >
              Lista de Amanhã
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center my-1">
          <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-4 mt-3">
            <Text className="text-white font-bold">Nova Tarefa</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between items-center my-1">
          <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-4 mt-3">
            <Text className="text-white font-bold"
            onPress={() => props.navigation.navigate("Login")}
            >Login</Text>
          </TouchableOpacity>
        </View>

        

      </View>

     
  );
}
