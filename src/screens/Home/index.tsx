import { createContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Header } from "../../components/Header/index";
import { TodoInput } from "../../components/Input/index";
import { TaskList } from "../../components/TaskList/index";
import { getAllTasks } from "../../services/getAllTask";
import { ItasksContext } from "../../types/types";
import { styles } from "./styles";

export const TasksContext = createContext<ItasksContext | null>(null);

export function Home() {
  const [tasks, setTasks] = useState<String[] | null>(null);

  useEffect(() => {
    getAllTasks(setTasks);
  }, []);

  return (
    <>
      <TasksContext.Provider value={{ setTasks, tasks }}>
        <View style={styles.container}>
          <Header tasksCounter={tasks ? tasks.length : 0} />
          <TodoInput />
          <TaskList />
        </View>
      </TasksContext.Provider>
    </>
  );
}
