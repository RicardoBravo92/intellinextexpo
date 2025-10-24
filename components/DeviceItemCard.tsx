import { Device } from "@/types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DeviceItemCard = (device: Device) => {
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

  const getStatusColor = (online: number, disabled?: number) => {
    if (disabled === 1) return "#ff6b6b";
    return online === 1 ? "#51cf66" : "#ffd43b";
  };

  const getStatusText = (online: number, disabled?: number) => {
    if (disabled === 1) return "Disabled";
    return online === 1 ? "Online" : "Offline";
  };

  const renderNetworkInfo = (settings: any, type: "WiFi" | "Ethernet") => {
    if (!settings) return null;

    return (
      <View style={styles.networkSection}>
        <Text style={styles.networkType}>{type} Settings</Text>

        <View style={styles.networkRow}>
          <Text style={styles.networkLabel}>IP Address:</Text>
          <Text style={styles.networkValue}>{settings.ip}</Text>
        </View>

        <View style={styles.networkRow}>
          <Text style={styles.networkLabel}>Subnet Mask:</Text>
          <Text style={styles.networkValue}>{settings.mask}</Text>
        </View>

        <View style={styles.networkRow}>
          <Text style={styles.networkLabel}>Gateway:</Text>
          <Text style={styles.networkValue}>{settings.gateway}</Text>
        </View>

        <View style={styles.networkRow}>
          <Text style={styles.networkLabel}>DHCP:</Text>
          <Text style={styles.networkValue}>
            {settings.use_dhcp === "1" ? "Enabled" : "Disabled"}
          </Text>
        </View>

        {type === "WiFi" && (
          <View style={styles.networkRow}>
            <Text style={styles.networkLabel}>SSID:</Text>
            <Text style={styles.networkValue}>{settings.ssid}</Text>
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
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle}>{device_name}</Text>
          <Text style={styles.connectionType}>{getConnectionType()}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(online, disabled) },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusText(online, disabled)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Device ID:</Text>
        <Text style={styles.value}>{id_device}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Serial:</Text>
        <Text style={styles.value}>{serial}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Access Control</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Access Type:</Text>
          <Text style={styles.value}>{access_type || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Open Door Time:</Text>
          <Text style={styles.value}>
            {time_open_door ? `${time_open_door}ms` : "N/A"}
          </Text>
        </View>

        {exit_btn_pos && (
          <View style={styles.row}>
            <Text style={styles.label}>Exit Button Position:</Text>
            <Text style={styles.value}>{exit_btn_pos}</Text>
          </View>
        )}
      </View>

      {(wifi_settings || ethernet_settings) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network Configuration</Text>
          {wifi_settings && renderNetworkInfo(wifi_settings, "WiFi")}
          {ethernet_settings &&
            renderNetworkInfo(ethernet_settings, "Ethernet")}
        </View>
      )}
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.label}>Timezone ID:</Text>
          <Text style={styles.value}>{id_timezone}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Structure ID:</Text>
          <Text style={styles.value}>{id_structure}</Text>
        </View>

        {id_device_action_type && (
          <View style={styles.row}>
            <Text style={styles.label}>Action Type:</Text>
            <Text style={styles.value}>{id_device_action_type}</Text>
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
  networkSection: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  networkType: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
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
  },
  networkValue: {
    fontSize: 12,
    color: "#333",
    fontWeight: "400",
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
