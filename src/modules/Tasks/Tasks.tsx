import useAuthenticated from "../../hooks/useAuthenticated";
import useTasks from "../../hooks/useTasks";
import Header from "./Header";
import TaskList from "./TaskList";
import { Container, EmptyState, ErrorBox } from "./style";

const Tasks = () => {
  const { user, userId } = useAuthenticated();
  const { tasks, loading, error, toggleTask, deleteTask } = useTasks(userId);

  return (
    <Container>
      <Header displayName={user?.displayName} />

      {error && <ErrorBox>Error al cargar tareas: {error.message}</ErrorBox>}

      {loading ? (
        <EmptyState>Cargando tareas…</EmptyState>
      ) : (
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      )}
    </Container>
  );
};

export default Tasks;
