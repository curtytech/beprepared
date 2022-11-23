import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function TomorrowTasks() {
  return (
    <View className="flex-1 items-center justify-center bg-sky-100">
      <View className="w-80 bg-white dark:bg-gray-50/10 rounded-3xl p-5 my-5">
        <View className="items-center justify-center">
          <Text className="text-black font-bold text-lg">Tarefas de Amanhã</Text>
        </View>

        <View className="flex-row justify-between items-center my-1 ">
          <View className="columns-1 ">
            <Text className="text-black font-bold">Id </Text>
          </View>
          <View className="columns-3 ">
            <Text className="text-black font-bold">Status </Text>
          </View>
          <View className="columns-3 ">
            <Text className="text-black font-bold">Tarefa </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center my-1">
          <View className="columns-3 ">
            <Text className="text-black font-bold">1 </Text>
          </View>
          <View className="columns-3 ">
            <Text className="text-black font-bold">OK </Text>
          </View>
          <View className="columns-3 ">
            <Text className="text-black font-bold">Lavar Carro </Text>
          </View>
        </View>
      </View>   
      <View className="flex-row justify-between items-center my-1">
        <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-4 mt-3">
          <Text className="text-white font-bold">Nova Tarefa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
