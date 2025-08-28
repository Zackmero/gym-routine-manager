import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setAuthenticated(!!token);
      setLoading(false);

      if (!token && segments[0] !== undefined) {
        router.replace("/");
      }

      if (token && segments[0] === undefined) {
        router.replace("/dashboard");
      }
    };

    checkAuth();
  }, [segments]);

  if (loading) return null; // opcional: spinner de carga

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Stack>
  );
}
