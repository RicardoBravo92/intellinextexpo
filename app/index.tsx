import Colors from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const { isAuthenticated } = useAuthStore();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundCircle} />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <Ionicons
              name="hardware-chip"
              size={80}
              color={Colors.light.tint}
            />
            <View style={styles.logoBadge}>
              <Ionicons name="flash" size={20} color="#fff" />
            </View>
          </View>

          <Text style={styles.title}>Welcome to IntelliNext</Text>
          <Text style={styles.subtitle}>
            Smart device management at your fingertips
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.features,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.featureItem}>
            <Ionicons name="wifi" size={24} color={Colors.light.tint} />
            <Text style={styles.featureText}>Connect & Monitor Devices</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="settings" size={24} color={Colors.light.tint} />
            <Text style={styles.featureText}>Easy Configuration</Text>
          </View>

          <View style={styles.featureItem}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={Colors.light.tint}
            />
            <Text style={styles.featureText}>Secure Access Control</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.footer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {!isAuthenticated ? (
          <>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Ionicons name="log-in" size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              By continuing, you agree to our Terms of Service
            </Text>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/devices")}
            >
              <Ionicons name="list" size={20} color={Colors.light.tint} />
              <Text style={styles.secondaryButtonText}>Browse Devices</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
  },
  backgroundCircle: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.light.tint + "20",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  logoContainer: {
    position: "relative",
    marginBottom: 24,
  },
  logoBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: Colors.light.tint,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.light.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },
  features: {
    width: "100%",
    maxWidth: 280,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    marginLeft: 12,
  },
  footer: {
    paddingBottom: 40,
    width: "100%",
  },
  primaryButton: {
    flexDirection: "row",
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 24,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.light.tint,
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },
});
