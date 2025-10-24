import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Module } from "../types";

const ModuleItemCard = (module: Module) => {
  const { width: windowWidth } = useWindowDimensions();
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

  // Determine if we're on a small screen
  const isSmallScreen = windowWidth < 375;

  return (
    <View style={[styles.card, isSmallScreen && styles.cardSmall]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.cardTitle, isSmallScreen && styles.cardTitleSmall]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {key || moduleName}
          </Text>
          <Text
            style={[
              styles.connectionType,
              isSmallScreen && styles.connectionTypeSmall,
            ]}
          >
            {route ? `Route: ${route}` : "No Route"}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(is_render, is_render_mobile) },
            isSmallScreen && styles.statusBadgeSmall,
          ]}
        >
          <Text
            style={[styles.statusText, isSmallScreen && styles.statusTextSmall]}
          >
            {getStatusText(is_render, is_render_mobile)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
          Module ID:
        </Text>
        <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
          {id_module}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
          Module Name:
        </Text>
        <Text
          style={[
            styles.value,
            isSmallScreen && styles.valueSmall,
            styles.moduleName,
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {moduleName}
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            isSmallScreen && styles.sectionTitleSmall,
          ]}
        >
          Configuration
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Path:
          </Text>
          <Text
            style={[styles.value, isSmallScreen && styles.valueSmall]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {path}
          </Text>
        </View>

        {route && (
          <View style={styles.row}>
            <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
              Route:
            </Text>
            <Text
              style={[styles.value, isSmallScreen && styles.valueSmall]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {route}
            </Text>
          </View>
        )}

        {position && (
          <View style={styles.row}>
            <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
              Position:
            </Text>
            <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
              {position}
            </Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Order:
          </Text>
          <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
            {order}
          </Text>
        </View>
      </View>

      {renderOperations(operations)}

      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Web Render:
          </Text>
          <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
            {is_render === 1 ? "Enabled" : "Disabled"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Mobile Render:
          </Text>
          <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
            {is_render_mobile === 1 ? "Enabled" : "Disabled"}
          </Text>
        </View>

        {icon && (
          <View style={styles.row}>
            <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
              Icon:
            </Text>
            <Text
              style={[styles.value, isSmallScreen && styles.valueSmall]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {icon}
            </Text>
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
  cardSmall: {
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    flexShrink: 1,
  },
  cardTitleSmall: {
    fontSize: 16,
  },
  connectionType: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  connectionTypeSmall: {
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 80,
    alignItems: "center",
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 70,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  statusTextSmall: {
    fontSize: 10,
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
  sectionTitleSmall: {
    fontSize: 13,
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
    alignItems: "flex-start",
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    flexShrink: 0,
    marginRight: 8,
  },
  labelSmall: {
    fontSize: 13,
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "400",
    flex: 1,
    textAlign: "right",
    flexWrap: "wrap",
  },
  valueSmall: {
    fontSize: 13,
  },
  moduleName: {
    flexShrink: 1,
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
