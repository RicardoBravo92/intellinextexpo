import { Device } from "@/types";
import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

const DeviceItemCard = (device: Device) => {
  const { width: windowWidth } = useWindowDimensions();

  const { id_device, device_name, settings_device } = device;
  const {
    online,
    serial,
    disabled,
    access_type,
    id_timezone,
    exit_btn_pos,
    id_structure,
    time_open_door,
    id_device_action_type,
    wifi_settings,
    ethernet_settings,
  } = settings_device;

  const isSmallScreen = windowWidth < 375;
  const isLargeScreen = windowWidth > 768;

  const getStatusColor = (online: number, disabled?: number) => {
    if (disabled === 1) return "#ff6b6b";
    return online === 1 ? "#51cf66" : "#ffd43b";
  };

  const getStatusText = (online: number, disabled?: number) => {
    if (disabled === 1) return "Disabled";
    return online === 1 ? "Online" : "Offline";
  };

  const getAccessTypeText = (type?: number) => {
    switch (type) {
      case 0:
        return "Entry";
      case 1:
        return "Exit";
      case 2:
        return "Both";
      default:
        return "N/A";
    }
  };

  const renderNetworkInfo = (settings: any, type: "WiFi" | "Ethernet") => {
    if (!settings) return null;

    return (
      <View
        style={[
          styles.networkSection,
          isSmallScreen && styles.networkSectionSmall,
        ]}
      >
        <Text
          style={[styles.networkType, isSmallScreen && styles.networkTypeSmall]}
        >
          {type} Settings
        </Text>

        <View style={styles.networkRow}>
          <Text
            style={[
              styles.networkLabel,
              isSmallScreen && styles.networkLabelSmall,
            ]}
          >
            IP Address:
          </Text>
          <Text
            style={[
              styles.networkValue,
              isSmallScreen && styles.networkValueSmall,
            ]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {settings.ip || "N/A"}
          </Text>
        </View>

        <View style={styles.networkRow}>
          <Text
            style={[
              styles.networkLabel,
              isSmallScreen && styles.networkLabelSmall,
            ]}
          >
            Subnet Mask:
          </Text>
          <Text
            style={[
              styles.networkValue,
              isSmallScreen && styles.networkValueSmall,
            ]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {settings.mask || "N/A"}
          </Text>
        </View>

        <View style={styles.networkRow}>
          <Text
            style={[
              styles.networkLabel,
              isSmallScreen && styles.networkLabelSmall,
            ]}
          >
            Gateway:
          </Text>
          <Text
            style={[
              styles.networkValue,
              isSmallScreen && styles.networkValueSmall,
            ]}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {settings.gateway || "N/A"}
          </Text>
        </View>

        <View style={styles.networkRow}>
          <Text
            style={[
              styles.networkLabel,
              isSmallScreen && styles.networkLabelSmall,
            ]}
          >
            DHCP:
          </Text>
          <Text
            style={[
              styles.networkValue,
              isSmallScreen && styles.networkValueSmall,
            ]}
          >
            {settings.use_dhcp === "1" ? "Enabled" : "Disabled"}
          </Text>
        </View>

        {type === "WiFi" && settings.ssid && (
          <View style={styles.networkRow}>
            <Text
              style={[
                styles.networkLabel,
                isSmallScreen && styles.networkLabelSmall,
              ]}
            >
              SSID:
            </Text>
            <Text
              style={[
                styles.networkValue,
                isSmallScreen && styles.networkValueSmall,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {settings.ssid}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const getConnectionType = () => {
    if (wifi_settings?.use_wifi === 1) return "WiFi";
    if (ethernet_settings) return "Ethernet";
    return "Unknown";
  };

  return (
    <View
      style={[
        styles.card,
        isSmallScreen && styles.cardSmall,
        isLargeScreen && styles.cardLarge,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.cardTitle,
              isSmallScreen && styles.cardTitleSmall,
              isLargeScreen && styles.cardTitleLarge,
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {device_name}
          </Text>
          <Text
            style={[
              styles.connectionType,
              isSmallScreen && styles.connectionTypeSmall,
            ]}
          >
            {getConnectionType()}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(online, disabled) },
            isSmallScreen && styles.statusBadgeSmall,
          ]}
        >
          <Text
            style={[styles.statusText, isSmallScreen && styles.statusTextSmall]}
          >
            {getStatusText(online, disabled)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
          Device ID:
        </Text>
        <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
          {id_device}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
          Serial:
        </Text>
        <Text
          style={[styles.value, isSmallScreen && styles.valueSmall]}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {serial || "N/A"}
        </Text>
      </View>

      <View style={[styles.section, isSmallScreen && styles.sectionSmall]}>
        <Text
          style={[
            styles.sectionTitle,
            isSmallScreen && styles.sectionTitleSmall,
          ]}
        >
          Access Control
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Access Type:
          </Text>
          <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
            {getAccessTypeText(access_type)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Open Door Time:
          </Text>
          <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
            {time_open_door ? `${time_open_door}ms` : "N/A"}
          </Text>
        </View>

        {exit_btn_pos && (
          <View style={styles.row}>
            <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
              Exit Button Position:
            </Text>
            <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
              {exit_btn_pos}
            </Text>
          </View>
        )}
      </View>

      {(wifi_settings || ethernet_settings) && (
        <View style={[styles.section, isSmallScreen && styles.sectionSmall]}>
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
            ]}
          >
            Network Configuration
          </Text>
          {wifi_settings && renderNetworkInfo(wifi_settings, "WiFi")}
          {ethernet_settings &&
            renderNetworkInfo(ethernet_settings, "Ethernet")}
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Timezone ID:
          </Text>
          <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
            {id_timezone || "N/A"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
            Structure ID:
          </Text>
          <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
            {id_structure || "N/A"}
          </Text>
        </View>

        {id_device_action_type && (
          <View style={styles.row}>
            <Text style={[styles.label, isSmallScreen && styles.labelSmall]}>
              Action Type:
            </Text>
            <Text style={[styles.value, isSmallScreen && styles.valueSmall]}>
              {id_device_action_type}
            </Text>
          </View>
        )}
      </View>

      {/* Additional details for large screens */}
      {isLargeScreen && (wifi_settings || ethernet_settings) && (
        <View style={styles.advancedSection}>
          <Text style={styles.sectionTitle}>Network Details</Text>
          {wifi_settings?.use_wifi !== undefined && (
            <View style={styles.row}>
              <Text style={styles.label}>WiFi Enabled:</Text>
              <Text style={styles.value}>
                {wifi_settings.use_wifi === 1 ? "Yes" : "No"}
              </Text>
            </View>
          )}
          {ethernet_settings && (
            <View style={styles.row}>
              <Text style={styles.label}>Connection Type:</Text>
              <Text style={styles.value}>Ethernet</Text>
            </View>
          )}
        </View>
      )}
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
    marginBottom: 8,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  cardLarge: {
    padding: 24,
    marginBottom: 16,
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
  },
  cardTitleSmall: {
    fontSize: 16,
    marginBottom: 2,
  },
  cardTitleLarge: {
    fontSize: 20,
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
    minWidth: 70,
    alignItems: "center",
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 60,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  statusTextSmall: {
    fontSize: 11,
  },
  section: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionSmall: {
    marginBottom: 12,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 12,
  },
  sectionTitleSmall: {
    fontSize: 13,
    marginBottom: 10,
  },
  networkSection: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  networkSectionSmall: {
    padding: 10,
    marginBottom: 10,
  },
  networkType: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  networkTypeSmall: {
    fontSize: 12,
    marginBottom: 6,
  },
  networkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  networkLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    flexShrink: 0,
    marginRight: 8,
  },
  networkLabelSmall: {
    fontSize: 11,
  },
  networkValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "400",
    flex: 1,
    textAlign: "right",
  },
  networkValueSmall: {
    fontSize: 11,
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
  },
  valueSmall: {
    fontSize: 13,
  },
  advancedSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  // Keep existing styles for compatibility
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

export default DeviceItemCard;
