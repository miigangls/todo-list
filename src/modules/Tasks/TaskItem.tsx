import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "../../firebase";
import {
  Checkbox,
  EditInput,
  IconButton,
  Item,
  ItemName,
} from "./style";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string, completed: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onRename: (id: string, name: string) => void | Promise<void>;
};

const TaskItem = ({ task, onToggle, onDelete, onRename }: TaskItemProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.name);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEdit() {
    setDraft(task.name);
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
    setDraft(task.name);
  }

  async function commitEdit() {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === task.name) {
      cancelEdit();
      return;
    }
    setSaving(true);
    try {
      await onRename(task.id, trimmed);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }

  return (
    <Item $completed={task.completed}>
      <Checkbox
        checked={task.completed}
        onChange={(e) => onToggle(task.id, e.target.checked)}
        disabled={editing}
        aria-label={`Marcar "${task.name}" como ${task.completed ? "activa" : "completada"}`}
      />

      {editing ? (
        <EditInput
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          disabled={saving}
          maxLength={200}
          aria-label="Editar tarea"
        />
      ) : (
        <ItemName onDoubleClick={startEdit} title="Doble click para editar">
          {task.name}
        </ItemName>
      )}

      {!editing && (
        <>
          <IconButton
            type="button"
            onClick={startEdit}
            aria-label={`Editar "${task.name}"`}
            title="Editar"
          >
            <Pencil size={16} />
          </IconButton>
          <IconButton
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Eliminar "${task.name}"`}
            title="Eliminar"
          >
            <Trash2 size={16} />
          </IconButton>
        </>
      )}
    </Item>
  );
};

export default TaskItem;
