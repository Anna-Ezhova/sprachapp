import { useEffect, useState } from "react";


import { User } from "@/data/user";
import { loadUser,} from "@/services/userService";

export function useUser() {

  /* ---------- State ---------- */
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------- Initiales Laden ---------- */
  useEffect(() => {
    loadUser().then((loadedUser) => {
      setUser(loadedUser);
      setLoading(false);
    });
  }, []);

  /* ---------- Rückgabe ---------- */
  return {
    user,
    loading,
  };
}