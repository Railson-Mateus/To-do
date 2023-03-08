export type ItasksContext = {
  tasks: String[] | null;
  setTasks: any;
};

export type Itask = {
  title: string;
  status: boolean;
};

export type Data = {
  kay: string;
  value: any;
};

export type Props = {
  id: string;
  index: number;
};
