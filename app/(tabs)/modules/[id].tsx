import ModuleItemCard from "@/components/ModuleItemCard";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams();
  const { modules, isLoading } = useAuthStore();
  const { width: windowWidth } = useWindowDimensions();

  const [refreshing, setRefreshing] = React.useState(false);

  const module = modules.find((m) => m.id_module.toString() === id.toString());

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Simulate refresh - you might want to add a refresh method to your store
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const isSmallScreen = windowWidth < 375;
  const isLargeScreen = windowWidth > 768;

  if (isLoading && !module) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.loadingText}>Loading module...</Text>
      </SafeAreaView>
    );
  }

  if (!module) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
          <Text style={styles.errorTitle}>Module Not Found</Text>
          <Text style={styles.errorDescription}>
            The module with ID {id} could not be found.
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
          isSmallScreen && styles.scrollContentSmall,
          isLargeScreen && styles.scrollContentLarge,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            Module Details
          </Text>
          <View style={styles.moduleIdBadge}>
            <Text style={styles.moduleIdText}>ID: {id}</Text>
          </View>
        </View>

        <ModuleItemCard {...module} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
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
  screenTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  screenTitleSmall: {
    fontSize: 20,
  },
  screenTitleLarge: {
    fontSize: 28,
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
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  additionalInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  additionalInfoLarge: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  infoTitleSmall: {
    fontSize: 15,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionItem: {
    alignItems: "center",
    padding: 12,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    fontWeight: "500",
  },
});
