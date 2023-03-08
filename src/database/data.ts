import AsyncStorage from "@react-native-async-storage/async-storage";
import { Data } from "../types/types";

class TaskService {
  static async deletData(kay: string) {
    try {
      await AsyncStorage.removeItem(kay);
    } catch (error) {
      console.log(error);
    }
  }

  static async update(kay: string, value: any) {
    try {
      await AsyncStorage.setItem(kay, JSON.stringify(value));
    } catch (error) {
      alert("Ocorreu um erro inesperado!!");
    }
  }

  static async setValue({ kay, value }: Data) {
    try {
      await AsyncStorage.setItem(kay, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }

  static async getValue(kay: string) {
    try {
      const value = await AsyncStorage.getItem(kay);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      alert("Ocorreu um erro inesperado!!");
    }
  }

  static async getAll() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      alert("Ocorreu um erro inesperado!!");
    }
  }
}

export default TaskService;
