import { Device } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

const DeviceListCard = (device: Device) => {
  const { width: windowWidth } = useWindowDimensions();

  const handlePress = () => {
    router.push(`/devices/${device.id_device}`);
  };

  const getStatusColor = (online: number, disabled?: number) => {
    if (disabled === 1) return "#6c757d";
    if (online === 1) return "#28a745";
    return "#dc3545";
  };

  const getStatusText = (online: number, disabled?: number) => {
    if (disabled === 1) return "Disabled";
    if (online === 1) return "Online";
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

  // Responsive breakpoints
  const isSmallScreen = windowWidth < 375;
  const isLargeScreen = windowWidth > 768;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSmallScreen && styles.cardSmall,
        isLargeScreen && styles.cardLarge,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.deviceInfo}>
          <Text
            style={[
              styles.deviceName,
              isSmallScreen && styles.deviceNameSmall,
              isLargeScreen && styles.deviceNameLarge,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {device.device_name}
          </Text>
          <Text
            style={[
              styles.deviceModel,
              isSmallScreen && styles.deviceModelSmall,
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {device.device_model}
          </Text>
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
            isSmallScreen && styles.statusBadgeSmall,
          ]}
        >
          <Text
            style={[styles.statusText, isSmallScreen && styles.statusTextSmall]}
          >
            {getStatusText(
              device.settings_device.online,
              device.settings_device.disabled,
            )}
          </Text>
        </View>
      </View>

      <View style={[styles.content, isSmallScreen && styles.contentSmall]}>
        {device.photo ? (
          <Image
            source={{ uri: device.photo }}
            style={[
              styles.deviceImage,
              isSmallScreen && styles.deviceImageSmall,
              isLargeScreen && styles.deviceImageLarge,
            ]}
            resizeMode="contain"
          />
        ) : (
          <View
            style={[
              styles.initialsContainer,
              { backgroundColor: getBackgroundColor(device.device_name) },
              isSmallScreen && styles.initialsContainerSmall,
              isLargeScreen && styles.initialsContainerLarge,
            ]}
          >
            <Text
              style={[
                styles.initialsText,
                isSmallScreen && styles.initialsTextSmall,
                isLargeScreen && styles.initialsTextLarge,
              ]}
            >
              {getInitials(device.device_name)}
            </Text>
          </View>
        )}

        <View style={[styles.details, isSmallScreen && styles.detailsSmall]}>
          <View style={styles.detailRow}>
            <Ionicons
              name="hardware-chip"
              size={isSmallScreen ? 14 : 16}
              color="#666"
            />
            <Text
              style={[
                styles.detailText,
                isSmallScreen && styles.detailTextSmall,
              ]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              ID: {device.id_device}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="business"
              size={isSmallScreen ? 14 : 16}
              color="#666"
            />
            <Text
              style={[
                styles.detailText,
                isSmallScreen && styles.detailTextSmall,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {device.factory_family}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="key" size={isSmallScreen ? 14 : 16} color="#666" />
            <Text
              style={[
                styles.detailText,
                isSmallScreen && styles.detailTextSmall,
              ]}
              numberOfLines={1}
            >
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
  cardSmall: {
    padding: 12,
    marginBottom: 8,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  cardLarge: {
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  deviceInfo: {
    flex: 1,
    marginRight: 8,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  deviceNameSmall: {
    fontSize: 16,
    marginBottom: 2,
  },
  deviceNameLarge: {
    fontSize: 20,
  },
  deviceModel: {
    fontSize: 14,
    color: "#666",
  },
  deviceModelSmall: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
  },
  statusBadgeSmall: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    minWidth: 55,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  statusTextSmall: {
    fontSize: 11,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentSmall: {
    alignItems: "flex-start",
  },
  deviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  deviceImageSmall: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  deviceImageLarge: {
    width: 70,
    height: 70,
    marginRight: 16,
  },
  initialsContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsContainerSmall: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  initialsContainerLarge: {
    width: 70,
    height: 70,
    marginRight: 16,
  },
  initialsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  initialsTextSmall: {
    fontSize: 18,
  },
  initialsTextLarge: {
    fontSize: 22,
  },
  details: {
    flex: 1,
  },
  detailsSmall: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    minHeight: 20,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
    flex: 1,
  },
  detailTextSmall: {
    fontSize: 13,
    marginLeft: 4,
  },
  // Additional info for large screens
  additionalInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 13,
    color: "#666",
    fontFamily: "monospace",
    flex: 1,
    textAlign: "right",
    marginLeft: 8,
  },
  // Footer styles (kept from original for compatibility)
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
  serialText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 6,
    fontFamily: "monospace",
  },
});

export default DeviceListCard;
