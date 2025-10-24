import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Module } from "../types";

const ModuleCard = ({
  module,
  id_module,
  setting_module_config,
  path,
}: Module) => {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();

  const isSmallScreen = windowWidth < 375;
  const isLargeScreen = windowWidth > 768;

  const handlePress = () => {
    router.push(`/modules/${id_module}`);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isSmallScreen && styles.cardSmall,
        isLargeScreen && styles.cardLarge,
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      <View style={styles.header}>
        {setting_module_config.key && (
          <Text
            style={[
              styles.cardTitle,
              isSmallScreen && styles.cardTitleSmall,
              isLargeScreen && styles.cardTitleLarge,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {setting_module_config.key}
          </Text>
        )}
        <View style={styles.moduleIdBadge}>
          <Text style={styles.moduleIdText}>ID: {id_module}</Text>
        </View>
      </View>

      <Text
        style={[
          styles.moduleName,
          isSmallScreen && styles.moduleNameSmall,
          isLargeScreen && styles.moduleNameLarge,
        ]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {module}
      </Text>

      <View style={styles.pathContainer}>
        <Text style={styles.pathLabel}>Path:</Text>
        <Text
          style={[styles.pathValue, isSmallScreen && styles.pathValueSmall]}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {path}
        </Text>
      </View>

      {setting_module_config.position && (
        <View style={styles.footer}>
          <Text style={styles.position}>
            Position: {setting_module_config.position}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default ModuleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardSmall: {
    padding: 16,
    marginBottom: 8,
    marginHorizontal: 4,
  },
  cardLarge: {
    padding: 24,
    marginBottom: 16,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  cardTitleSmall: {
    fontSize: 16,
  },
  cardTitleLarge: {
    fontSize: 20,
  },
  moduleIdBadge: {
    backgroundColor: "#e9ecef",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moduleIdText: {
    fontSize: 12,
    color: "#495057",
    fontWeight: "500",
  },
  moduleName: {
    fontSize: 16,
    color: "#444",
    lineHeight: 20,
    marginBottom: 12,
  },
  moduleNameSmall: {
    fontSize: 14,
    lineHeight: 18,
  },
  moduleNameLarge: {
    fontSize: 17,
    lineHeight: 22,
  },
  pathContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  pathLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    marginRight: 6,
  },
  pathValue: {
    fontSize: 14,
    color: "#444",
    flex: 1,
    fontFamily: "monospace",
  },
  pathValueSmall: {
    fontSize: 13,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
    marginTop: 4,
  },
  position: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  // Existing styles from your original code
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "white",
    padding: 15,
    margin: 16,
    borderRadius: 10,
    fontSize: 16,
    elevation: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
