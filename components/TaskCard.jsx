import React from "react";
import {
  Text,
  View
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";

export default function TaskCard(props) {

  const [idToEdit, setIdToEdit] = useState(null);
  const [descriptionToEdit, setDescriptionToEdit] = useState(null);

  props.childRef.current = {
    valueEdit: idToEdit,
    description: descriptionToEdit,
  }
  // console.log(props.childRef.current);
  // console.log(props);

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
    let json = await response;
    // console.log(json);
    if (json === "error") {
      console.log("erro");
    } else {
      console.log("200");
      props.readTasks();
    }
  }

  async function doCompleted({ id }) {
    let response = await fetch(
      "http://192.168.0.110:3000/updateTaskCompleted",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );
    console.log(id);    

    let json = await response;
    // console.log(json);    
    if (json === "error") {
      console.log("erro");
    } else {
      console.log("200");
      props.readTasks();
    }
  }
  let id = props.id;
  let description = props.description;
  
  return (
    <View className="flex-row w-full my-2 items-center  grid grid-cols-3 gap-1">
      <View className="w-1/12 ">
        <Text className="text-center">{ id }
          <FontAwesome
            size={20}
            onPress={() => { doCompleted({ id }); }}
            name={props.completed === true ? "check-square-o" : "window-close-o"}
          />
        </Text>
      </View>
      <View className="w-10/12 bg-gray-200 mr-2 rounded-full p-1 px-5 text-left">
        <Text
          className="text-black font-bold text-left"
          onPress={
            () => { setIdToEdit({ id }); setDescriptionToEdit({ description }); props.pegaParametrosDoTaskCard(); }
            // () => { setIdToEdit({ id }); }
          }>
          {description}
        </Text>
      </View>
      <View className="w-1/12 ">
        <Text className="text-center">
          <FontAwesome5
            name="trash"
            size={20}
            onPress={() => { doRemove({ id }); }}
          />
        </Text>
      </View>
    </View>

  );
}
