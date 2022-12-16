import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
// import TaskService from "../services/Tasks.service";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodayTasks() {
  const [idUser, setUser] = useState([]);
  const [description, setDescription] = useState(null);
  const todayDate = new Date();
  const [tasks, setTasks] = useState([]);

  // const [hideNovaTarefa, setHideNovaTarefa] = useState(null);
  const [hideEditTarefa, sethideEditTarefa] = useState('hidden');

  //UseState para o Edit passados pelo childRef
  const [idToEdit, setIdToEdit] = useState(null);
  const [descriptionToEdit, setDescriptionToEdit] = useState(null);

  function pegaParametrosDoTaskCard(id, description) {
    // console.log(id);
    sethideEditTarefa('');
    // setIdToEdit('');
    setIdToEdit(id);
    // setIdToEdit(id);
    // setDescriptionToEdit('');
    setDescriptionToEdit(description);
    // setDescriptionToEdit(descriptionToEdit.description);

    // console.log(childRef.current.description);
    // let teste = descriptionToEdit.description;
    // console.log(descriptionToEdit);
    // console.log(idToEdit);    
    // console.log(id); 
    // console.log(description);
  }


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
    if (description == '') {
      alert('Por favor digite a tarefa')
    } else {
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
        setDescriptionToEdit('');
        setDescription('');
      }
    }
  }

  async function sendFormEdit() {
    let response = await fetch(
      "http://192.168.0.110:3000/updateTaskDescription",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: descriptionToEdit,
          id: idToEdit,
        }),
      }
    );
    // console.log(description);
    // console.log(idToEdit);
    let json = await response;
    // console.log(json);
    if (json === "error") {
      console.log("nao foi");
    } else {
      console.log("foi");
      readTasks();
      setDescription('');
      setDescriptionToEdit('');
      sethideEditTarefa('hidden');
    }
  }

  return (
    <View className="w-11/12 bg-white rounded-lg p-2 my-5">
      <View className=" justify-center">
        <View className=" flex-row justify-between my-2">
          <TextInput
            onChangeText={(description) => setDescription(description)}
            value={description}
            className="border w-3/4 mr-1 rounded-lg px-4"
            placeholder="Digite aqui sua nova tarefa!"
          ></TextInput>
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-1/4  mr-2 justify-center rounded-lg bg-sky-800 p-1 ">
            <Text
              className="text-white font-bold text-xs "
              onPress={() => sendForm()}
            >
              Nova Tarefa
            </Text>
          </TouchableOpacity>
        </View>
        <View className={`flex-row justify-between my-2 ${hideEditTarefa}`}>
          <TextInput
            onChangeText={(descriptionToEdit) => setDescriptionToEdit(descriptionToEdit)}
            className="bg-gray-200 w-3/4 mr-1 rounded-lg px-4"
            value={descriptionToEdit}
          ></TextInput>
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-1/4 mr-2 justify-center rounded-lg bg-sky-800 p-1 "
            onPress={() => sendFormEdit()}
          >
            <Text
              className="text-white font-bold text-xs  "
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
        renderItem={({ item }) => <TaskCard {...item} pegaParametrosDoTaskCard={pegaParametrosDoTaskCard} readTasks={readTasks} />}
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
