import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Module } from "../types";

interface ModuleCardProps extends Module {
  onPress?: () => void;
  isSelected?: boolean;
}

const ModuleCard = ({
  module,
  id_module,
  setting_module_config,
  path,
  order,
  is_render_mobile,
  operations,
  is_render,
  onPress,
  isSelected = false,
}: ModuleCardProps) => {
  const CardContent = (
    <View style={[styles.card, isSelected && styles.selectedCard]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {setting_module_config.key && (
            <Text style={styles.cardTitle} numberOfLines={1}>
              {setting_module_config.key}
            </Text>
          )}
          <Text style={styles.moduleId}>ID: {id_module}</Text>
        </View>
        {setting_module_config.icon && (
          <Text style={styles.icon}>{setting_module_config.icon}</Text>
        )}
      </View>

      {/* Main Content */}
      <Text style={styles.moduleName} numberOfLines={1}>
        {module}
      </Text>

      <Text style={styles.path} numberOfLines={1}>
        Path: {path}
      </Text>

      {setting_module_config.route && (
        <Text style={styles.route} numberOfLines={1}>
          Route: {setting_module_config.route}
        </Text>
      )}

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.metaInfo}>
          {setting_module_config.position && (
            <Text style={styles.position}>
              Position: {setting_module_config.position}
            </Text>
          )}
          <Text style={styles.order}>Order: {order}</Text>
        </View>

        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              is_render === 1 && styles.activeStatus,
            ]}
          >
            <Text style={styles.statusText}>
              {is_render === 1 ? "Active" : "Inactive"}
            </Text>
          </View>

          <View
            style={[
              styles.statusIndicator,
              is_render_mobile === 1 && styles.mobileActiveStatus,
            ]}
          >
            <Text style={styles.statusText}>
              Mobile: {is_render_mobile === 1 ? "Yes" : "No"}
            </Text>
          </View>
        </View>
      </View>

      {/* Operations */}
      {operations && operations.length > 0 && (
        <View style={styles.operationsContainer}>
          <Text style={styles.operationsLabel}>Operations:</Text>
          <Text style={styles.operationsList}>{operations.join(", ")}</Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{CardContent}</TouchableOpacity>;
  }

  return CardContent;
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
  selectedCard: {
    backgroundColor: "#f0f8ff",
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
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
  moduleId: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 8,
  },
  path: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  route: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
  },
  metaInfo: {
    flex: 1,
  },
  position: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  order: {
    fontSize: 12,
    color: "#666",
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 4,
  },
  activeStatus: {
    backgroundColor: "#d4edda",
  },
  mobileActiveStatus: {
    backgroundColor: "#d1ecf1",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#333",
  },
  operationsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  operationsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  operationsList: {
    fontSize: 11,
    color: "#888",
  },
  // Your existing styles
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
