import { createContext } from "react";
import { auth, db, fire, storage } from "./config";

export type FirebaseContextValue = {
  auth: typeof auth;
  db: typeof db;
  fire: typeof fire;
  storage: typeof storage;
};

const FirebaseContext = createContext<FirebaseContextValue>({
  auth,
  db,
  fire,
  storage,
});

export default FirebaseContext;
