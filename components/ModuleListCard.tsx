import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Module } from "../types";

const ModuleCard = ({
  module,
  id_module,
  setting_module_config,
  path,
}: Module) => {
  const router = useRouter();
  return (
    <View>
      <Pressable
        style={styles.card}
        onPress={() => router.push(`/modules/${id_module}`)}
      >
        {setting_module_config.key && (
          <Text style={styles.cardTitle}>{setting_module_config.key}</Text>
        )}
        <Text style={styles.moduleName}>{module}</Text>
        <Text style={styles.moduleName}>Path: {path}</Text>
        {setting_module_config.position && (
          <Text style={styles.position}>
            Position: {setting_module_config.position}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default ModuleCard;

const styles = StyleSheet.create({
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  moduleName: {
    fontSize: 16,
    color: "#444",
  },
  position: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
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
