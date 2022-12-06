import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodayTasks() {
  const [tasks, setTasks] = useState([]);
  const [idUser, setUser] = useState([]);
  const [description, setDescription] = useState(null);
  const [selectedDescription, setselectedDescription] = useState("asdd");
  const todayDate = new Date();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem("userData");
      let json = JSON.parse(response);
      setUser(json.id);
      // console.log(response);
    }
    getUser();
  }, []);

  async function sendForm() {
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
    // console.log(json);
    if (json === "error") {
      // await AsyncStorage.clear();
    } else {
   reload();
      
    }
  }
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

  return (
    <View className="w-11/12 bg-white rounded-3xl p-2 my-5">
      <View className=" justify-center">
        <View className=" flex-row justify-between my-2">
          <TextInput
            onChangeText={(description) => setDescription(description)}
            className="bg-gray-200 w-3/4 mr-1 rounded-full"
            placeholder="    Digite aqui sua nova tarefa!"
          ></TextInput>
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-1/4 mr-2 justify-center rounded-full bg-sky-800 p-1 ">
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
            className="bg-gray-200 w-3/4 mr-1 rounded-full"
            //  value={}
            placeholder=""
          ></TextInput>
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-1/4 mr-2 justify-center rounded-full bg-sky-800 p-1 ">
            <Text
              className="text-white font-bold text-xs "
              onPress={() => sendFormEdit()}
            >
              Editar Tarefa
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {tasks.length > 0 &&
        tasks.map((task) => (
          <TaskList
            idToEdit={null}
            id={task.id}
            description={task.description}
            completed={task.completed}
          ></TaskList>
        ))}
    </View>
  );
}
