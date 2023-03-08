import React, { useContext, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { TasksContext } from "../../screens/Home/index";
import TaskService from "../../database/data";
import { getAllTasks } from "../../services/getAllTask";

export function TodoInput() {
  const [text, setText] = useState("");
  const tasksContext = useContext(TasksContext);

  function handleAddNewTask() {
    if (text != "") {
      const task = {
        title: text,
        status: false,
      };
      if (!tasksContext?.tasks?.includes(text)) {
        const kay = text as string;

        TaskService.setValue({ kay, value: task });
        setText("");
        getAllTasks(tasksContext?.setTasks);
      } else {
        alert("Uma tarefa como o mesmo nome já esta cadastrada!");
      }
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Adicionar novo todo..."
        placeholderTextColor="#B2B2B2"
        returnKeyType="send"
        selectionColor="#666666"
        onSubmitEditing={() => handleAddNewTask()}
        onChangeText={(valor) => setText(valor)}
      />
      <TouchableOpacity
        testID="add-new-task-button"
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => handleAddNewTask()}
      >
        <Feather name="chevron-right" size={24} color="#B2B2B2" />
      </TouchableOpacity>
    </View>
  );
}
