import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./config";

export type Task = {
  id: string;
  userId: string;
  name: string;
  completed: boolean;
  createdAt: number;
};

const COLLECTION = "tasks-list";

export function subscribeToTasks(
  userId: string,
  onChange: (tasks: Task[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks: Task[] = snapshot.docs.map((d) => {
        const data = d.data();
        const ts = data.createdAt;
        const createdAt =
          ts && typeof ts.toMillis === "function" ? ts.toMillis() : Date.now();
        return {
          id: d.id,
          userId: data.userId,
          name: data.name,
          completed: Boolean(data.completed),
          createdAt,
        };
      });
      onChange(tasks);
    },
    onError,
  );
}

export async function addTask(input: {
  userId: string;
  name: string;
}): Promise<void> {
  await addDoc(collection(db, COLLECTION), {
    userId: input.userId,
    name: input.name,
    completed: false,
    createdAt: serverTimestamp(),
  });
}

export async function deleteTask(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function setTaskCompleted(
  id: string,
  completed: boolean,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { completed });
}

export async function renameTask(id: string, name: string): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), { name });
}
