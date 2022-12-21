import {
  Text,
  View
} from "react-native";
import React, { useState, useEffect } from "react";
import UserList from "./UserList";

// import Controller from "../Controller";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.110:3000/read", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-sky-100">
      <View className="w-80 bg-white dark:bg-gray-50/10 rounded-3xl p-5 my-5">
        <View className="items-center justify-center">
          <Text className="text-black font-bold text-lg">
            Lista de Usuarios{" "}
          </Text>
        </View>

        <View className="flex-row justify-between items-center my-1 ">
          <View className="columns-1 ">
            <Text className="text-black font-bold">Login </Text>
          </View>
          <View className="columns-3 ">
            <Text className="text-black font-bold">Email </Text>
          </View>         
        </View>

        {users.length > 0 &&
          users.map((user) => <UserList login={user.login} email={user.email}> </UserList>)}
      </View>
    </View>
  );
}
