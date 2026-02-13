import { User } from "@/data/user";
import { loadUser } from "@/services/userService";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";



export default function RootLayout() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser().then(setUser);
  }, []);

  if (!user) return null;

  return(
      <Stack>

        <Stack.Screen name="index"  options={{title: "Home"}}/>
        <Stack.Screen name="exersize"  options={{title: "Training"}}/>
        <Stack.Screen name="progress"  options={{title: "Fortschritt"}}/>

      </Stack>

  )
}
