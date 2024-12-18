import { Trash2 } from "lucide-react";
import type { Task } from "../../firebase";
import { Checkbox, IconButton, Item, ItemName } from "./style";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string, completed: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <Item $completed={task.completed}>
      <Checkbox
        checked={task.completed}
        onChange={(e) => onToggle(task.id, e.target.checked)}
        aria-label={`Marcar "${task.name}" como ${task.completed ? "activa" : "completada"}`}
      />
      <ItemName>{task.name}</ItemName>
      <IconButton
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Eliminar "${task.name}"`}
        title="Eliminar"
      >
        <Trash2 size={16} />
      </IconButton>
    </Item>
  );
};

export default TaskItem;
