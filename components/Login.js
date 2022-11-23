import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function Home(props) {
  return (
    <View className="flex-1 items-center justify-center bg-sky-100">
      <Text className="font-bold text-md text-slate-700 pb-2 float-left">
        Email
      </Text>
      <TextInput
        type="email"
        autoComplete="email"
        className="text-center w-80 py-3 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>

      <Text className="font-bold text-md text-slate-700 pb-2 float-left mt-4">
        Senha
      </Text>
      <TextInput
        secureTextEntry={true}
        autoComplete="password"
        className="text-center w-80 py-3 border border-slate-200 rounded-lg px-3 focus:outline-none bg-white focus:border-slate-500 "
      ></TextInput>

      <View className="flex-row justify-between items-center my-3">
        <TouchableOpacity className="flex-row justify-center rounded-full bg-sky-800 p-4 mt-3">
          <Text
            className="text-white font-bold"
            onPress={() => props.navigation.navigate("Home")}
          >
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <TouchableOpacity className="flex-row justify-center">
          <Text
            className="text-black font-bold"
            onPress={() => props.navigation.navigate("Login")}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}
