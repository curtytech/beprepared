import React from "react";
import {
  Text,
  View
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";

export default function TaskCard({ id, description, completed }, props) {
  const [idToEdit, setIdToEdit] = useState(null);
  // const [descriptionToEdit, setDescriptionToEdit] = useState(null);

  // function handleEdit(){
  //   props.handleResult(idToEdit);
  // }
  // props.handleResult = '1';

  const handleEdit = e => {
    const test = '22'
    props.handleResult()
  }

  // const TaskCard = props => {
  //   props.handleResult(idToEdit);
  // }

  props = idToEdit;

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
    <View className="flex-row w-full my-2 items-center  grid grid-cols-3 gap-1">
      <View className="w-1/12 ">
        <Text className="text-center">
          <FontAwesome
            size={20}
            onPress={() => doCompleted({ id })}
            name={completed === true ? "check-square-o" : "window-close-o"}
          />
        </Text>
      </View>
      <View className="w-10/12 bg-gray-200 mr-2 rounded-full p-1 px-5 text-left">
        <Text
          // onPress={() => setDescriptionToEdit({description})}
          className="text-black font-bold text-left"
          // onPress={() => handleEdit({ id })}
        >
          {description}
        </Text>
      </View>
      <View className="w-1/12 ">
        <Text className="text-center">
          <FontAwesome5
            name="trash"
            size={20}
            onPress={() => doRemove({ id })}
          />
        </Text>
      </View>
    </View>
    
  );
}
