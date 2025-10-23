//router
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  // const { isAuthenticated, user } = useAuthStore();

  // useEffect(() => {
  //   if (!isAuthenticated || user) {
  //     router.replace("/sign-in");
  //   } else {
  //     router.replace("/");
  //   }
  // }, [isAuthenticated, user]);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
