import React from "react";
import {
  Text,
  StyleSheet,
  View
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
// import { useState } from "react";

export default function TaskCard(props) {

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
    // console.log(id);    

    let json = await response;
    // console.log(json);    
    if (json === "error") {
      console.log("erro");
    } else {
      // console.log("200");
      props.readTasks();
    }
  }
  let id = props.id;
  let description = props.description;

  return (
    <View className="flex-row w-full my-2 items-center  grid grid-cols-3 gap-1">
      <View className="w-1/12 ">
        <FontAwesome
          size={25}
          onPress={() => { doCompleted({ id }); }}
          name={props.completed === true ? "check-square-o" : "square-o"}
        />
      </View>
      <View className="w-10/12 border mr-2 rounded-lg p-1 px-3 text-left">
        <Text
          className="text-black font-bold text-left"
          onPress={
            () => { props.pegaParametrosDoTaskCard(id, description); }
          }>
          {description}
        </Text>
      </View>
      <View className="w-1/12 rounded-md" style={{backgroundColor: "#dc2626"}}>       
        <Text className="text-center py-1 px-1">
          <Entypo
            color="#fff" 
            name="trash"
            size={20}
            onPress={() => { doRemove({ id }); }}
          />
        </Text>
      </View>
    </View>

  );
}
