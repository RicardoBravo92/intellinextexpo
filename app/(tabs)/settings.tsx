import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { logout, user } = useAuthStore();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const isLargeScreen = width > 768;

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
          <Ionicons
            name="warning-outline"
            size={isSmallScreen ? 48 : 64}
            color="#ff6b6b"
          />
          <Text
            style={[styles.errorText, isSmallScreen && styles.errorTextSmall]}
          >
            No user data available
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          isLargeScreen && styles.scrollContentLarge,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.header,
            isSmallScreen && styles.headerSmall,
            isLargeScreen && styles.headerLarge,
          ]}
        >
          <View
            style={[
              styles.avatar,
              isSmallScreen && styles.avatarSmall,
              isLargeScreen && styles.avatarLarge,
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                isSmallScreen && styles.avatarTextSmall,
                isLargeScreen && styles.avatarTextLarge,
              ]}
            >
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </Text>
          </View>
          <Text
            style={[
              styles.userName,
              isSmallScreen && styles.userNameSmall,
              isLargeScreen && styles.userNameLarge,
            ]}
          >
            {user.first_name} {user.last_name}
          </Text>
          <Text
            style={[
              styles.userEmail,
              isSmallScreen && styles.userEmailSmall,
              isLargeScreen && styles.userEmailLarge,
            ]}
          >
            {user.email}
          </Text>
        </View>

        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
              isLargeScreen && styles.sectionTitleLarge,
            ]}
          >
            Personal Information
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  isSmallScreen && styles.infoLabelSmall,
                ]}
              >
                User ID
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isSmallScreen && styles.infoValueSmall,
                ]}
              >
                {user.id_user}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  isSmallScreen && styles.infoLabelSmall,
                ]}
              >
                Email
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isSmallScreen && styles.infoValueSmall,
                  styles.emailText,
                ]}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {user.email}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  isSmallScreen && styles.infoLabelSmall,
                ]}
              >
                Phone
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isSmallScreen && styles.infoValueSmall,
                ]}
              >
                {user.phone || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  isSmallScreen && styles.infoLabelSmall,
                ]}
              >
                Status
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  user.status === 1 ? styles.activeBadge : styles.inactiveBadge,
                  isSmallScreen && styles.statusBadgeSmall,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    isSmallScreen && styles.statusTextSmall,
                  ]}
                >
                  {getStatusText(user.status)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
              isLargeScreen && styles.sectionTitleLarge,
            ]}
          >
            Permissions & Roles
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  isSmallScreen && styles.infoLabelSmall,
                ]}
              >
                Permissions
              </Text>
              <View
                style={[
                  styles.permissionBadge,
                  user.all_permission === 1
                    ? styles.allPermissions
                    : styles.limitedPermissions,
                  isSmallScreen && styles.permissionBadgeSmall,
                ]}
              >
                <Text
                  style={[
                    styles.permissionText,
                    isSmallScreen && styles.permissionTextSmall,
                  ]}
                >
                  {getPermissionText(user.all_permission)}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  isSmallScreen && styles.infoLabelSmall,
                ]}
              >
                Roles
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isSmallScreen && styles.infoValueSmall,
                ]}
              >
                {user.roles?.length > 0 ? user.roles.length : "No"} roles
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  isSmallScreen && styles.infoLabelSmall,
                ]}
              >
                Structures
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  isSmallScreen && styles.infoValueSmall,
                ]}
              >
                {user.structures?.length > 0 ? user.structures.length : "No"}{" "}
                structures
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, isLargeScreen && styles.sectionLarge]}>
          <Text
            style={[
              styles.sectionTitle,
              isSmallScreen && styles.sectionTitleSmall,
              isLargeScreen && styles.sectionTitleLarge,
            ]}
          >
            Actions
          </Text>

          <TouchableOpacity
            style={[
              styles.logoutButton,
              isSmallScreen && styles.logoutButtonSmall,
              isLargeScreen && styles.logoutButtonLarge,
            ]}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={isSmallScreen ? 18 : 20}
              color="white"
            />
            <Text
              style={[
                styles.logoutButtonText,
                isSmallScreen && styles.logoutButtonTextSmall,
                isLargeScreen && styles.logoutButtonTextLarge,
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Add some bottom padding for better scrolling */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const { width, height } = Dimensions.get("window");
const isSmallScreen = width < 375;
const isLargeScreen = width > 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentLarge: {
    paddingHorizontal: width > 1024 ? width * 0.1 : 0,
  },
  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
    marginBottom: 16,
  },
  headerSmall: {
    padding: 16,
    marginBottom: 12,
  },
  headerLarge: {
    paddingVertical: 32,
    marginBottom: 24,
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
  avatarSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  avatarTextSmall: {
    fontSize: 18,
  },
  avatarTextLarge: {
    fontSize: 28,
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  userNameSmall: {
    fontSize: 20,
    marginBottom: 2,
  },
  userNameLarge: {
    fontSize: 28,
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  userEmailSmall: {
    fontSize: 14,
  },
  userEmailLarge: {
    fontSize: 18,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionLarge: {
    marginBottom: 24,
    paddingHorizontal: isLargeScreen ? 24 : 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionTitleSmall: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitleLarge: {
    fontSize: 20,
    marginBottom: 16,
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
    minHeight: 44, // Minimum touch target size
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
    flex: 1,
  },
  infoLabelSmall: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "400",
    flex: 1,
    textAlign: "right",
  },
  infoValueSmall: {
    fontSize: 14,
  },
  emailText: {
    maxWidth: width * 0.5, // Prevent email from taking too much space
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 70,
    alignItems: "center",
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 60,
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
  statusTextSmall: {
    fontSize: 10,
  },
  permissionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 120,
    alignItems: "center",
  },
  permissionBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 100,
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
    textAlign: "center",
  },
  permissionTextSmall: {
    fontSize: 10,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#dc3545",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 50,
  },
  logoutButtonSmall: {
    padding: 12,
    minHeight: 44,
  },
  logoutButtonLarge: {
    padding: 20,
    minHeight: 56,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButtonTextSmall: {
    fontSize: 14,
  },
  logoutButtonTextLarge: {
    fontSize: 18,
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
    textAlign: "center",
  },
  errorTextSmall: {
    fontSize: 14,
    marginTop: 12,
  },
  bottomSpacer: {
    height: 20,
  },
});
