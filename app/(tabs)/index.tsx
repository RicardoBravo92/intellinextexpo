import ModuleListCard from "@/components/ModuleListCard";
import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModulesScreen() {
  const { modules } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModules = modules.filter(
    (mod) =>
      mod.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.setting_module_config.key
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  if (!modules) {
    return <Text>No modules available</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Modulos del sistema
      </Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor="#888"
      />

      <FlatList
        data={filteredModules}
        keyExtractor={(item) => item.id_module.toString()}
        renderItem={({ item }) => <ModuleListCard {...item} />}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No modules found matching your search
          </Text>
        }
      />
    </SafeAreaView>
  );
}

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
