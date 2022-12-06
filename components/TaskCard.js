import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";

export default function TaskList({ id, description, completed  }) {
  const [idToEdit, setIdToEdit] = useState(null);
  const [descriptionToEdit, setDescriptionToEdit] = useState(null);

  async function doRemove({ id }) {
    let response = await fetch("http://192.168.0.110:3000/deleteTask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let json = await response.json();
    // console.log(json);
    if (json === "error") {
      console.log("erro");
    } else {
      console.log("200");
      // onRefresh = { onRefresh };
    }
  }

  async function doCompleted({ id }) {
    let response = await fetch("http://192.168.0.110:3000/updateTaskCompleted", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let json = await response.json();
    // console.log(json);
    if (json === "error") {
      console.log("erro");
    } else {
      console.log("200");
      // onRefresh = { onRefresh };
    }
  }

  return (
    <ScrollView>
      
    <View className="flex-row  justify-between items-center my-1">
      <View className="w-1/8 ">
        <Text className="text-center">
          <FontAwesome
            size={20}
            onPress={() => doCompleted({ id })}
            name={completed === true ? "check-square-o" : "window-close-o"}
          />
        </Text>
      </View>
      <View className="w-6/8 ">
        <Text
          // onPress={() => setselectedDescription({description})}
          className="text-black font-bold bg-gray-200 mr-2 rounded-full p-1"
          onPress={() => setIdToEdit({ id })}
        >
          {description}
        </Text>
      </View>
      <View className="w-1/8 ">
        <Text className="text-center">
          <FontAwesome5
            name="trash"
            size={20}
            onPress={() => doRemove({ id })}
          />
        </Text>
      </View>
    </View>
    </ScrollView>
  );
}
