import { router } from "expo-router";
import React from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const welcome = () => {
  return (
    <SafeAreaView>
      <Text>welcome</Text>
      <Button
        title="Go to Sign In"
        onPress={() => {
          router.push("/(auth)/sign-in");
        }}
      />
    </SafeAreaView>
  );
};

export default welcome;
