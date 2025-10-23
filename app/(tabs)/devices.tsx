import DeviceCard from "@/components/DeviceCard";
import { useDevices } from "@/hooks/useDevices";
import { Device } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DevicesScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const {
    devices,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
    isError,
  } = useDevices({ search });

  // Handle refresh
  const handleRefresh = () => {
    refetch();
  };

  // Handle search
  const handleSearch = () => {
    setSearch(searchInput);
  };

  // Handle device press
  const handleDevicePress = (device: Device) => {
    router.push(`/devices/${device.id_device}`);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <DeviceCard device={item} onPress={handleDevicePress} />
  );

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator />;
    }

    if (hasNextPage && devices.length > 0) {
      return (
        <View style={styles.loadMoreContainer}>
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={handleLoadMore}
            disabled={isFetchingNextPage}
          >
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (devices.length > 0) {
      return (
        <View style={styles.endOfList}>
          <Text style={styles.endOfListText}>No more devices to load</Text>
        </View>
      );
    }

    return null;
  };

  const renderEmptyState = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyState}>
        <Ionicons name="hardware-chip-outline" size={64} color="#ccc" />
        <Text style={styles.emptyStateTitle}>
          {search ? "No devices found" : "No devices"}
        </Text>
        <Text style={styles.emptyStateText}>
          {search
            ? "Try adjusting your search terms"
            : "Devices will appear here once added"}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to load devices";
      Alert.alert("Error", errorMessage);
    }
  }, [isError, error]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Devices</Text>
        <Text style={styles.subtitle}>
          Manage and monitor your access devices
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search devices..."
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchInput ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Devices Count */}
      {!isLoading && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {devices.length} device{devices.length !== 1 ? "s" : ""}
            {search && ` found for "${search}"`}
          </Text>
        </View>
      )}

      {/* Devices List */}
      {isError ? (
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={48} color="#dc3545" />
          <Text style={styles.errorText}>
            {error instanceof Error ? error.message : "Failed to load devices"}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={devices}
          renderItem={renderDeviceItem}
          keyExtractor={(item) => item.id_device.toString()}
          contentContainerStyle={[
            styles.listContainer,
            devices.length === 0 && styles.emptyListContainer,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={handleRefresh}
            />
          }
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && !isFetchingNextPage && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading devices...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// Keep the same styles as your original component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 0,
    paddingBottom: 16,
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  countText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  footerLoader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  loadMoreContainer: {
    padding: 20,
  },
  loadMoreButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  loadMoreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  endOfList: {
    padding: 20,
    alignItems: "center",
  },
  endOfListText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});

export default DevicesScreen;
