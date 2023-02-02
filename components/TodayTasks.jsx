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

  }
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(todayDate) {
    return [
      todayDate.getFullYear(),
      padTo2Digits(todayDate.getMonth() + 1),
      padTo2Digits(todayDate.getDate()),
    ].join('-');    
  }
  var dataFormatada = formatDate(todayDate);
  
  function readTasks() {  
    fetch(`http://192.168.0.108:3000/readTasks/${idUser}/${dataFormatada}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => resp.json())
    .then((data) => {setTasks(data);})
    .catch((err) => console.error(err));
    // console.log(dataFormatada);
    console.log(idUser);
  }

  useEffect(() => {
    if(idUser == []){
      console.log('redirecionar');
      props.navigation.navigate("Login");
    }
    readTasks();
    console.log("useEffect quando inicia");    
    // console.log(idUser);
  }, [idUser]);

  useEffect(() => {
    async function getUser() {
      let response = await AsyncStorage.getItem("userData");
      let json = JSON.parse(response);
      setUser(json.id);
      // console.log(json.id);
    }
    getUser();
  }, []);

  async function sendForm() {
    if (description == '') {
      alert('Por favor digite a tarefa')
    } else {
      let response = await fetch("http://192.168.0.108:3000/createTask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          iduser: idUser,
          completed: 0,
          taskdate: dataFormatada,
        }),
      });

      let json = await response.text();
      // console.log("json" + json);
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
      "http://192.168.0.108:3000/updateTaskDescription",
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
      {/* <Text>{todayDate}</Text> */}
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
            className="border w-3/4 mr-1 rounded-lg px-4"
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
    </View>
  );
  // 

}
