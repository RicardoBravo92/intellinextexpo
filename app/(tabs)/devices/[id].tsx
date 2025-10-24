import DeviceItemCard from "@/components/DeviceItemCard";
import { useDevice } from "@/hooks/useDevices";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeviceScreen() {
  const { id } = useLocalSearchParams();
  const deviceId = Number(id);
  const { width: windowWidth } = useWindowDimensions();

  const { device, isLoading, isError, error, refetch, isFetching } =
    useDevice(deviceId);

  const isSmallScreen = windowWidth < 375;
  const isLargeScreen = windowWidth > 768;

  const handleRefresh = () => {
    refetch();
  };

  React.useEffect(() => {
    if (isError && error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load device";
      Alert.alert("Error", errorMessage);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.loadingContainer,
            isSmallScreen && styles.loadingContainerSmall,
          ]}
        >
          <ActivityIndicator size="large" color="#007AFF" />
          <Text
            style={[
              styles.loadingText,
              isSmallScreen && styles.loadingTextSmall,
            ]}
          >
            Loading device...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.errorContainer,
            isSmallScreen && styles.errorContainerSmall,
          ]}
        >
          <Ionicons
            name="warning-outline"
            size={isSmallScreen ? 48 : 64}
            color="#dc3545"
          />
          <Text
            style={[styles.errorTitle, isSmallScreen && styles.errorTitleSmall]}
          >
            Failed to load device
          </Text>
          <Text
            style={[styles.errorText, isSmallScreen && styles.errorTextSmall]}
          >
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.retryButton,
                isSmallScreen && styles.retryButtonSmall,
              ]}
              onPress={handleRefresh}
            >
              <Ionicons name="refresh" size={16} color="white" />
              <Text
                style={[
                  styles.retryButtonText,
                  isSmallScreen && styles.retryButtonTextSmall,
                ]}
              >
                Try Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.backButton,
                isSmallScreen && styles.backButtonSmall,
              ]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={16} color="white" />
              <Text
                style={[
                  styles.backButtonText,
                  isSmallScreen && styles.backButtonTextSmall,
                ]}
              >
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.notFoundContainer,
            isSmallScreen && styles.notFoundContainerSmall,
          ]}
        >
          <Ionicons
            name="search-outline"
            size={isSmallScreen ? 48 : 64}
            color="#666"
          />
          <Text
            style={[
              styles.notFoundTitle,
              isSmallScreen && styles.notFoundTitleSmall,
            ]}
          >
            Device Not Found
          </Text>
          <Text
            style={[
              styles.notFoundText,
              isSmallScreen && styles.notFoundTextSmall,
            ]}
          >
            The device you're looking for doesn't exist or may have been
            removed.
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.retryButton,
                isSmallScreen && styles.retryButtonSmall,
              ]}
              onPress={handleRefresh}
            >
              <Ionicons name="refresh" size={16} color="white" />
              <Text
                style={[
                  styles.retryButtonText,
                  isSmallScreen && styles.retryButtonTextSmall,
                ]}
              >
                Try Again
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.backButton,
                isSmallScreen && styles.backButtonSmall,
              ]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={16} color="white" />
              <Text
                style={[
                  styles.backButtonText,
                  isSmallScreen && styles.backButtonTextSmall,
                ]}
              >
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={handleRefresh}
            tintColor="#007AFF"
            colors={["#007AFF"]}
          />
        }
        contentContainerStyle={[
          styles.scrollContent,
          isSmallScreen && styles.scrollContentSmall,
          isLargeScreen && styles.scrollContentLarge,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Consistent Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.backButtonHeader,
              isSmallScreen && styles.backButtonHeaderSmall,
            ]}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={isSmallScreen ? 20 : 24}
              color="#333"
            />
            <Text
              style={[
                styles.backButtonTextHeader,
                isSmallScreen && styles.backButtonTextHeaderSmall,
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.screenTitle,
              isSmallScreen && styles.screenTitleSmall,
              isLargeScreen && styles.screenTitleLarge,
            ]}
          >
            Device Details
          </Text>
          <View style={styles.moduleIdBadge}>
            <Text style={styles.moduleIdText}>ID: {id}</Text>
          </View>
        </View>

        <DeviceItemCard {...device} />

        {/* Quick Actions Section */}
        {isLargeScreen && (
          <View style={styles.quickActions}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="refresh-circle" size={24} color="#007AFF" />
                <Text style={styles.actionText}>Restart</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="settings" size={24} color="#28a745" />
                <Text style={styles.actionText}>Configure</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="stats-chart" size={24} color="#ffc107" />
                <Text style={styles.actionText}>Statistics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="document-text" size={24} color="#6f42c1" />
                <Text style={styles.actionText}>Logs</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  scrollContentSmall: {
    padding: 16,
  },
  scrollContentLarge: {
    padding: 24,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  backButtonHeaderSmall: {
    padding: 6,
  },
  backButtonTextHeader: {
    fontSize: 16,
    color: "#333",
    marginLeft: 4,
    fontWeight: "500",
  },
  backButtonTextHeaderSmall: {
    fontSize: 14,
    marginLeft: 2,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  moduleIdBadge: {
    backgroundColor: "#e9ecef",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  moduleIdText: {
    fontSize: 12,
    color: "#495057",
    fontWeight: "600",
  },
  screenTitleSmall: {
    fontSize: 20,
  },
  screenTitleLarge: {
    fontSize: 28,
  },
  headerSpacer: {
    width: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingContainerSmall: {
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  loadingTextSmall: {
    fontSize: 14,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorContainerSmall: {
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  errorTitleSmall: {
    fontSize: 18,
    marginTop: 12,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  errorTextSmall: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  notFoundContainerSmall: {
    padding: 20,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundTitleSmall: {
    fontSize: 18,
    marginTop: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  notFoundTextSmall: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  retryButtonSmall: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  retryButtonTextSmall: {
    fontSize: 14,
  },
  backButton: {
    backgroundColor: "#6c757d",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButtonSmall: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonTextSmall: {
    fontSize: 14,
  },
  quickActions: {
    marginTop: 24,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
    minWidth: 80,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    fontWeight: "500",
  },
});
