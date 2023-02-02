import {
  Text,
  View,
} from "react-native";

export default function UserList({login, email}) {
  
  return (    

      <View className="flex-row justify-between items-center my-1">
        <View className="columns-3 ">
          <Text className="text-black font-bold"> {login}</Text>
        </View>
        <View className="columns-3 ">
          <Text className="text-black font-bold">{email} </Text>
        </View>
        
      </View>
  );
}
