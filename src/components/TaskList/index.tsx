import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TasksContext } from "../../screens/Home";
import { styles } from "./styles";
import { Task } from "../Task/index";

export function TaskList() {
  const tasksContext = useContext(TasksContext);
  return (
    <>
      <View style={{ marginTop: 25 }}>
        {tasksContext?.tasks?.map((task, index) => (
          <Task index={index} id={task as string} key={task as string} />
        ))}
      </View>
    </>
  );
}
