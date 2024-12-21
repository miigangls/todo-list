import type { Task } from "../../firebase";
import TaskItem from "./TaskItem";
import { EmptyState, List } from "./style";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onRename: (id: string, name: string) => void | Promise<void>;
};

const TaskList = ({ tasks, onToggle, onDelete, onRename }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <EmptyState>No tienes tareas todavía. ¡Agrega la primera!</EmptyState>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onRename={onRename}
        />
      ))}
    </List>
  );
};

export default TaskList;
