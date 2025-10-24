import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Module } from "../types";

const ModuleItemCard = (module: Module) => {
  const {
    id_module,
    module: moduleName,
    setting_module_config,
    path,
    order,
    is_render_mobile,
    operations,
    is_render,
  } = module;

  const { key, icon, route, position } = setting_module_config;

  const getStatusColor = (is_render: number, is_render_mobile: number) => {
    if (is_render === 1 && is_render_mobile === 1) return "#51cf66";
    if (is_render === 1) return "#339af0";
    if (is_render_mobile === 1) return "#ffd43b";
    return "#868e96";
  };

  const getStatusText = (is_render: number, is_render_mobile: number) => {
    if (is_render === 1 && is_render_mobile === 1)
      return "Active (Web & Mobile)";
    if (is_render === 1) return "Web Only";
    if (is_render_mobile === 1) return "Mobile Only";
    return "Inactive";
  };

  const renderOperations = (operations: number[] | undefined) => {
    if (!operations || operations.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operations</Text>
        <View style={styles.operationsGrid}>
          {operations.map((operation, index) => (
            <View key={index} style={styles.operationBadge}>
              <Text style={styles.operationText}>{operation}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {key || moduleName}
          </Text>
          <Text style={styles.connectionType}>
            {route ? `Route: ${route}` : "No Route"}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(is_render, is_render_mobile) },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusText(is_render, is_render_mobile)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Module ID:</Text>
        <Text style={styles.value}>{id_module}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Module Name:</Text>
        <Text style={styles.value}>{moduleName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Path:</Text>
          <Text style={styles.value}>{path}</Text>
        </View>

        {route && (
          <View style={styles.row}>
            <Text style={styles.label}>Route:</Text>
            <Text style={styles.value}>{route}</Text>
          </View>
        )}

        {position && (
          <View style={styles.row}>
            <Text style={styles.label}>Position:</Text>
            <Text style={styles.value}>{position}</Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Order:</Text>
          <Text style={styles.value}>{order}</Text>
        </View>
      </View>

      {renderOperations(operations)}

      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.label}>Web Render:</Text>
          <Text style={styles.value}>
            {is_render === 1 ? "Enabled" : "Disabled"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Mobile Render:</Text>
          <Text style={styles.value}>
            {is_render_mobile === 1 ? "Enabled" : "Disabled"}
          </Text>
        </View>

        {icon && (
          <View style={styles.row}>
            <Text style={styles.label}>Icon:</Text>
            <Text style={styles.value}>{icon}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  connectionType: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 12,
  },
  operationsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  operationBadge: {
    backgroundColor: "#e7f5ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#a5d8ff",
  },
  operationText: {
    fontSize: 12,
    color: "#1864ab",
    fontWeight: "500",
  },
  footer: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "400",
  },
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

export default ModuleItemCard;
