import { useCallback, useMemo, useState } from "react";

import Message from "../../components/Message";
import { TaskListSkeleton } from "../../components/Skeleton";
import { useToast } from "../../components/Toast/context";
import useAuthenticated from "../../hooks/useAuthenticated";
import useTasks from "../../hooks/useTasks";
import AddTask from "./AddTask";
import ConfirmDialog from "./ConfirmDialog";
import Filters, { type FilterValue, type SortValue } from "./Filters";
import Header from "./Header";
import TaskList from "./TaskList";
import { Container } from "./style";

const Tasks = () => {
  const { user, userId } = useAuthenticated();
  const { tasks, loading, error, addTask, toggleTask, deleteTask, renameTask } =
    useTasks(userId);
  const toast = useToast();

  const [filter, setFilter] = useState<FilterValue>("all");
  const [sort, setSort] = useState<SortValue>("newest");
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const visibleTasks = useMemo(() => {
    const filtered =
      filter === "all"
        ? tasks
        : tasks.filter((t) =>
            filter === "completed" ? t.completed : !t.completed,
          );

    return [...filtered].sort((a, b) =>
      sort === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt,
    );
  }, [tasks, filter, sort]);

  const handleAdd = useCallback(
    async (name: string) => {
      try {
        await addTask(name);
        toast.success("Tarea creada");
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "No se pudo crear la tarea";
        toast.error(msg);
        throw e;
      }
    },
    [addTask, toast],
  );

  const handleToggle = useCallback(
    async (id: string, completed: boolean) => {
      try {
        await toggleTask(id, completed);
      } catch {
        toast.error("No se pudo actualizar el estado de la tarea");
      }
    },
    [toggleTask, toast],
  );

  const handleRename = useCallback(
    async (id: string, name: string) => {
      try {
        await renameTask(id, name);
        toast.success("Tarea actualizada");
      } catch (e) {
        const msg =
          e instanceof Error ? e.message : "No se pudo renombrar la tarea";
        toast.error(msg);
        throw e;
      }
    },
    [renameTask, toast],
  );

  function requestDelete(id: string) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setPendingDelete({ id: task.id, name: task.name });
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteTask(pendingDelete.id);
      toast.success("Tarea eliminada");
      setPendingDelete(null);
    } catch {
      toast.error("No se pudo eliminar la tarea");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Container>
      <Header displayName={user?.displayName} />

      <AddTask onAdd={handleAdd} disabled={!userId} />

      <Filters
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortToggle={() =>
          setSort((s) => (s === "newest" ? "oldest" : "newest"))
        }
        total={tasks.length}
        visible={visibleTasks.length}
      />

      {error && (
        <Message variant="error">
          Error al cargar tareas: {error.message}
        </Message>
      )}

      {loading ? (
        <TaskListSkeleton />
      ) : (
        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onDelete={requestDelete}
          onRename={handleRename}
        />
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Eliminar tarea"
        message={`¿Seguro que deseas eliminar "${pendingDelete?.name ?? ""}"? Esta acción no se puede deshacer.`}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setPendingDelete(null)}
      />
    </Container>
  );
};

export default Tasks;
