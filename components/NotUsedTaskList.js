import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";

import TaskCard from "./TaskCard";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

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

  const Edit = (props) => {
    props.handleResult("teste");
  };
  // console.log(props);
  return (
    <FlatList
      data={tasks}
      keyExtractor={(task) => task.id}
      renderItem={({ item }) => <TaskCard {...item} />}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    />
  );
}
