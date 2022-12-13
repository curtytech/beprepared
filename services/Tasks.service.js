import React from "react";

export default function TaskService() {
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

  
}
