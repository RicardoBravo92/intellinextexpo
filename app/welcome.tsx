import Colors from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const { isAuthenticated } = useAuthStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a IntelliNext</Text>
        <Text style={styles.subtitle}>Gestiona tus dispositivos IoT</Text>
      </View>
      {!isAuthenticated && (
        <Button
          title="Iniciar Sesión"
          onPress={() => router.push("/(auth)/sign-in")}
          color={Colors.light.tint}
        />
      )}
      {isAuthenticated && (
        <Button
          title="Ir a la aplicación"
          onPress={() => router.push("/")}
          color={Colors.light.tint}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  content: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
  },
});
