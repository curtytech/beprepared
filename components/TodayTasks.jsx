import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import TaskCard from "./TaskCard";
// import TaskService from "../services/Tasks.service";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodayTasks() {
  const [idUser, setUser] = useState([]);
  const [description, setDescription] = useState(null);
  const todayDate = new Date();
  const [tasks, setTasks] = useState([]);
  const [result, setResult] = useState(null);
  const childRef = useRef(null);

  // console.log('asda'+childRef.current.value);
  // let exemplo = () => {
  //   setResult();  
  // };

  function exemplo() {
    setResult(childRef.current.value);
    console.log(childRef.current.value);
  }


  // console.log('res'+result);

  function readTasks() {
    fetch("http://192.168.0.110:3000/readTasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setTasks(data);

      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    readTasks();
    console.log("useEffect quando inicia");
  }, []);

  // useEffect(() => {
  //   readTasks();
  //   console.log("useEffect quando inicia");
  // }, [result]);

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem("userData");
      let json = JSON.parse(response);
      setUser(json.id);
    }
    getUser();
  }, []);

  async function sendForm() {
    // setDescription('');
    let response = await fetch("http://192.168.0.110:3000/createTask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        iduser: idUser,
        completed: 0,
        taskdate: todayDate,
      }),
    });
    let json = await response.json();
    console.log("json" + json);
    if (json === "error") {
      console.log("err");
    } else {
      // console.log("foi");
      readTasks();
      setDescription('');
    }
  }
  // console.log(childRef);

  async function sendFormEdit() {
    let response = await fetch(
      "http://192.168.0.110:3000/updateTaskCompleted",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          id: id,
        }),
      }
    );
    let json = await response.json();
    // console.log(json);
    if (json === "error") {
      console.log("nao foi");
    } else {
      console.log("foi");
    }
  }
  // console.log('result'+result);

  return (
    <View className="w-11/12 bg-white rounded-3xl p-2 my-5">
      <View className=" justify-center">
        <View className=" flex-row justify-between my-2">
          <TextInput
            onChangeText={(description) => setDescription(description)}
            value={description}
            className="bg-gray-200 w-3/4 mr-1 rounded-full px-4"
            placeholder="Digite aqui sua nova tarefa!"
          ></TextInput>
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-1/4  mr-2 justify-center rounded-full bg-sky-800 p-1 ">
            <Text
              className="text-white font-bold text-xs "
              onPress={() => sendForm()}
            >
              Nova Tarefa
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between my-2">
          <TextInput
            // onChangeText={(description) => setDescription(description)}
            className="bg-gray-200 w-3/4 mr-1 rounded-full px-4"
            value={result}
          ></TextInput>
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-1/4 mr-2 justify-center rounded-full bg-sky-800 p-1 ">
            <Text
              className="text-white font-bold text-xs  "
              // onPress={() => exemplo()}
            >
              Editar Tarefa
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        className="mt-2"
        data={tasks}
        keyExtractor={(task) => task.id}
        onPress={() => exemplo()}
        renderItem={({ item }) => <TaskCard {...item} childRef={childRef} />}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      />
      {/* childRef={childRef}
      childProps={childProps.current}
      */}
    </View>
  );
  // 

}
