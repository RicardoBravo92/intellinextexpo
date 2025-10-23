import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  const getStatusText = (status: number) => {
    return status === 1 ? "Active" : "Inactive";
  };

  const getPermissionText = (permission: number) => {
    return permission === 1 ? "All Permissions" : "Limited Permissions";
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={64} color="#ff6b6b" />
          <Text style={styles.errorText}>No user data available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </Text>
          </View>
          <Text style={styles.userName}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* User Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>User ID</Text>
              <Text style={styles.infoValue}>{user.id_user}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>
                {user.phone || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  user.status === 1 ? styles.activeBadge : styles.inactiveBadge,
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(user.status)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Permissions & Roles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions & Roles</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Permissions</Text>
              <View
                style={[
                  styles.permissionBadge,
                  user.all_permission === 1
                    ? styles.allPermissions
                    : styles.limitedPermissions,
                ]}
              >
                <Text style={styles.permissionText}>
                  {getPermissionText(user.all_permission)}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Roles</Text>
              <Text style={styles.infoValue}>
                {user.roles?.length > 0 ? user.roles.length : "No"} roles
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Structures</Text>
              <Text style={styles.infoValue}>
                {user.structures?.length > 0 ? user.structures.length : "No"}{" "}
                structures
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "400",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeBadge: {
    backgroundColor: "#d4edda",
  },
  inactiveBadge: {
    backgroundColor: "#f8d7da",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  permissionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  allPermissions: {
    backgroundColor: "#d1ecf1",
  },
  limitedPermissions: {
    backgroundColor: "#fff3cd",
  },
  permissionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  settingsText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#dc3545",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
  },
});
