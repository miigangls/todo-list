import { useMemo, useState } from "react";

import useAuthenticated from "../../hooks/useAuthenticated";
import useTasks from "../../hooks/useTasks";
import AddTask from "./AddTask";
import Filters, { type FilterValue, type SortValue } from "./Filters";
import Header from "./Header";
import TaskList from "./TaskList";
import { Container, EmptyState, ErrorBox } from "./style";

const Tasks = () => {
  const { user, userId } = useAuthenticated();
  const { tasks, loading, error, addTask, toggleTask, deleteTask } =
    useTasks(userId);

  const [filter, setFilter] = useState<FilterValue>("all");
  const [sort, setSort] = useState<SortValue>("newest");

  const visibleTasks = useMemo(() => {
    const filtered =
      filter === "all"
        ? tasks
        : tasks.filter((t) =>
            filter === "completed" ? t.completed : !t.completed,
          );

    return [...filtered].sort((a, b) =>
      sort === "newest"
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt,
    );
  }, [tasks, filter, sort]);

  return (
    <Container>
      <Header displayName={user?.displayName} />

      <AddTask onAdd={addTask} disabled={!userId} />

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

      {error && <ErrorBox>Error al cargar tareas: {error.message}</ErrorBox>}

      {loading ? (
        <EmptyState>Cargando tareas…</EmptyState>
      ) : (
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      )}
    </Container>
  );
};

export default Tasks;
