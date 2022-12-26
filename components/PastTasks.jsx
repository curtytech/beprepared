import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
  Platform
} from "react-native";
import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import DateTimePicker from '@react-native-community/datetimepicker';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PastTasks() {
  const [idUser, setUser] = useState([]);
  const [description, setDescription] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [hideEditTarefa, sethideEditTarefa] = useState('hidden');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('empty');

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  function formatDate(dateNeeded) {
    return [
      dateNeeded.getFullYear(),
      padTo2Digits(dateNeeded.getMonth() + 1),
      padTo2Digits(dateNeeded.getDate()),
    ].join('-');
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    // let fDate = tempDate.getDay() + '-' + (tempDate.getTime() + 1) + '-' + tempDate.getFullYear();
    // let fTime = 'Hours:' + tempDate.getHours() + 'Minutes:' + tempDate.getMinutes();
    // setText(fDate + '\n' + fTime)
    // console.log(fDate + '(' + fTime + ')');
    var dataFormatada = formatDate(tempDate);
    // console.log(dataFormatada);
    readTasks();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  //UseState para o Edit passados pelo childRef
  const [idToEdit, setIdToEdit] = useState(null);
  const [descriptionToEdit, setDescriptionToEdit] = useState(null);

  function pegaParametrosDoTaskCard(id, description) {
    sethideEditTarefa('');
    setIdToEdit(id);
    setDescriptionToEdit(description);
  }

  // var dataFormatada = formatDate(dateNeeded);
  // console.log(dataFormatada);

  function readTasks() {
    fetch(`http://192.168.0.110:3000/readTasks/${idUser}/${dataFormatada}`, {
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
          taskdate: dataFormatada,
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
      // console.log("foi");
      readTasks();
      setDescription('');
      setDescriptionToEdit('');
      sethideEditTarefa('hidden');
    }
  }

  return (
    <View className="mt-8 ml-4 w-11/12 bg-white rounded-lg p-2 ">

      {show && (
        <DateTimePicker
          maximumDate={new Date()}
          value={date}
          onChange={onChangeDate}
          display="calendar"
          is24Hour={true}
          mode={mode}
          testID='dateTimePicker'
        />)}
      <View className="justify-center">
        <View className="flex-row justify-between my-2">
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-full mr-2 justify-center rounded-lg bg-sky-800 p-3 "
            onPress={() => showMode('date')}>
            <Text
              className="text-white font-bold text-xs "
            >
              Informe a data da Tarefa
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between my-2">
          <TextInput
            onChangeText={(description) => setDescription(description)}
            value={description}
            className="border w-3/4 mr-1 rounded-lg px-4"
            placeholder="Digite aqui sua nova tarefa!"
          ></TextInput>
          <TextInput className="hidden"> </TextInput>
          <TouchableOpacity className="flex-row w-1/4  mr-2 justify-center rounded-lg bg-sky-800 p-1 ">
            <Text
              className="text-white font-bold text-xs"
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
