import { useEffect, useState } from "react";


import { User } from "@/data/user";
import { loadUser, saveUser } from "@/services/userService";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser().then((loadedUser) => {
      setUser(loadedUser);
      setLoading(false);
    });
  }, []);

  async function updateUser(updatedUser: User) {
    setUser(updatedUser);
    await saveUser(updatedUser);
  }

  return {
    user,
    loading,
    updateUser,
  };
}