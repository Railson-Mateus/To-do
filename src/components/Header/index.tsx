import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

import logo from "../../assets/logo.png";

interface HeaderProps {
  tasksCounter: number;
}

export function Header({ tasksCounter }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Image source={logo} />

      <View style={styles.cont}>
        <Text style={styles.text}>Você tem </Text>
        <Text style={styles.bold}>
          {tasksCounter} {tasksCounter > 1 ? "tarefas" : "tarefa"}
        </Text>
      </View>
    </View>
  );
}
