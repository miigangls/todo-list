import { useCallback, useEffect, useState } from "react";
import {
  addTask as fbAddTask,
  deleteTask as fbDeleteTask,
  renameTask as fbRenameTask,
  setTaskCompleted as fbSetTaskCompleted,
  subscribeToTasks,
  type Task,
} from "../firebase";

export type UseTasksResult = {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  addTask: (name: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  renameTask: (id: string, name: string) => Promise<void>;
};

function useTasks(userId: string | null): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToTasks(
      userId,
      (next) => {
        setTasks(next);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [userId]);

  const addTask = useCallback(
    async (name: string) => {
      if (!userId) throw new Error("No hay sesión activa");
      const trimmed = name.trim();
      if (!trimmed) throw new Error("El nombre de la tarea es obligatorio");
      await fbAddTask({ userId, name: trimmed });
    },
    [userId],
  );

  const deleteTask = useCallback(async (id: string) => {
    await fbDeleteTask(id);
  }, []);

  const toggleTask = useCallback(async (id: string, completed: boolean) => {
    await fbSetTaskCompleted(id, completed);
  }, []);

  const renameTask = useCallback(async (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) throw new Error("El nombre de la tarea es obligatorio");
    await fbRenameTask(id, trimmed);
  }, []);

  return { tasks, loading, error, addTask, deleteTask, toggleTask, renameTask };
}

export default useTasks;
