import TaskService from "../database/data";

export const getAllTasks = async (setTasks: any) => {
  const tasksAll = (await TaskService.getAll()) as unknown as String[] | null;
  setTasks(tasksAll);
};
