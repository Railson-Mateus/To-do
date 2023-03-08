import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { Itask, Props } from "../../types/types";
import { styles } from "./styles";
import { TasksContext } from "../../screens/Home/index";
import TaskService from "../../database/data";
import { getAllTasks } from "../../services/getAllTask";
import { Feather } from "@expo/vector-icons";
import editIcon from "../../assets/edit.png";
import trashIcon from "../../assets/trash.png";

export function Task({ id, index }: Props) {
  const [taskData, setTaskData] = useState<Itask>();
  const [textEdit, setTextEdit] = useState("");
  const [open, setOpen] = useState(false);

  const tasksContext = useContext(TasksContext);

  const handleDeletTask = async (id: string) => {
    Alert.alert("Atenção", "Gostaria de apagar essa tarefa?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await TaskService.deletData(id);
          await getAllTasks(tasksContext?.setTasks);
        },
      },
    ]);
  };

  const handleCheckbox = async (id: string) => {
    await TaskService.update(id, {
      ...taskData,
      status: !taskData?.status,
    });
    const data = (await TaskService.getValue(id)) as Itask;
    setTaskData(data);
  };

  const handleEditTask = async () => {
    await TaskService.update(id, { ...taskData, title: textEdit });
    const data = (await TaskService.getValue(id)) as Itask;
    setTaskData(data);
    setOpen(false);
  };

  useEffect(() => {
    const getTask = async () => {
      const data = (await TaskService.getValue(id)) as Itask;
      setTaskData(data);
    };
    getTask();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 8,
      }}
    >
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => handleCheckbox(id)}
        >
          <View
            testID={`marker-${index}`}
            style={taskData?.status ? styles.taskMarkerDone : styles.taskMarker}
          >
            {taskData?.status && (
              <Feather name="check" size={12} color="#FFF" />
            )}
          </View>

          {open ? (
            <TextInput
              style={{
                color: "#666666",
                borderWidth: 1,
              }}
              onChangeText={(valor) => setTextEdit(valor)}
              defaultValue={taskData?.title}
              onSubmitEditing={() => handleEditTask()}
            />
          ) : (
            <Text
              onPress={() => handleCheckbox(id)}
              style={{
                textDecorationLine: taskData?.status ? "line-through" : "none",
                marginTop: 5,
                color: taskData?.status ? "#1DB863" : "#666666",
              }}
            >
              {taskData?.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View>
        {open ? (
          <TouchableOpacity
            onPress={() => setOpen(false)}
            style={{
              marginTop: 8,
            }}
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              marginTop: 5,
            }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            marginTop: 5,
          }}
          onPress={() => handleDeletTask(id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
