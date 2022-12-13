import React from "react";
import {
  Text,
  View
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";

export default function TaskCard(props) {
  // props.id = id;
  id = props.id;
  const [idToEdit, setIdToEdit] = useState(null);  
  
  props.childRef.current = {
    value: idToEdit
  }
 
  // function readTasks() {
  //   fetch("http://192.168.0.110:3000/readTasks", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setTasks(data);
  //     })
  //     .catch((err) => console.error(err));
  // }

  // const TaskCard = props => {
  //   props.handleResult(idToEdit);
  // }

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
    props.navigation.navigate("Users")
    console.log(req.body+'json');
    // let json = await response.json();
    // console.log('json'+json);
    // if (json === "error") {
    //   console.log("erro");
    // } else {
    //   console.log("200");
    //   // onRefresh = { onRefresh };
    // }
    // readTasks();

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

    let json = await response.json();
    console.log('json'+json);
    if (json == "error") {
      console.log("erro");
    } else {
      console.log("200");      
    }
    // readTasks();
  }

  // console.log(props.id);
  return (
    <View className="flex-row w-full my-2 items-center  grid grid-cols-3 gap-1">
      <View className="w-1/12 ">
        <Text className="text-center">
          <FontAwesome
            size={20}
            onPress={() => doCompleted({ id })}
            name={props.completed === true ? "check-square-o" : "window-close-o"}
          />
        </Text>
      </View>
      <View className="w-10/12 bg-gray-200 mr-2 rounded-full p-1 px-5 text-left">
        <Text
          // onPress={() => setDescriptionToEdit({description})}
          className="text-black font-bold text-left"
          onPress={() => setIdToEdit({ id })}
        >
          {props.description}
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
