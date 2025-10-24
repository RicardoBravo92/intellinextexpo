import { Device } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DeviceListCard = (device: Device) => {
  const handlePress = () => {
    router.push(`/devices/${device.id_device}`);
  };

  const getStatusColor = (online: number, disabled?: number) => {
    if (disabled === 1) return "#6c757d";
    if (online === 1) return "#28a745";
    return "#dc3545";
  };

  const getStatusText = (online: number, disabled?: number) => {
    if (online === 1) return "Online";
    if (disabled === 1) return "Disabled";
    return "Offline";
  };

  const getAccessTypeText = (accessType?: number) => {
    switch (accessType) {
      case 0:
        return "Entry";
      case 1:
        return "Exit";
      case 2:
        return "Both";
      default:
        return "Unknown";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
  };

  const getBackgroundColor = (name: string) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
      "#F8C471",
      "#82E0AA",
      "#F1948A",
      "#85C1E9",
      "#D7BDE2",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName} numberOfLines={1}>
            {device.device_name}
          </Text>
          <Text style={styles.deviceModel}>{device.device_model}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(
                device.settings_device.online,
                device.settings_device.disabled,
              ),
            },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusText(
              device.settings_device.online,
              device.settings_device.disabled,
            )}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {device.photo ? (
          <Image
            source={{ uri: device.photo }}
            style={styles.deviceImage}
            resizeMode="contain"
          />
        ) : (
          <View
            style={[
              styles.initialsContainer,
              { backgroundColor: getBackgroundColor(device.device_name) },
            ]}
          >
            <Text style={styles.initialsText}>
              {getInitials(device.device_name)}
            </Text>
          </View>
        )}

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="hardware-chip" size={16} color="#666" />
            <Text style={styles.detailText}>ID: {device.id_device}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="business" size={16} color="#666" />
            <Text style={styles.detailText}>{device.factory_family}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="key" size={16} color="#666" />
            <Text style={styles.detailText}>
              Access: {getAccessTypeText(device.settings_device.access_type)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  deviceModel: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  deviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  initialsContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
  },
  initialsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  details: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
  },
  serialText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
    fontFamily: "monospace",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  groupBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  groupText: {
    fontSize: 12,
    color: "#007AFF",
    marginLeft: 4,
    fontWeight: "500",
  },
});

export default DeviceListCard;
