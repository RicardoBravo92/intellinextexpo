import DeviceCard from "@/components/DeviceCard";
import { getDevicesByPage } from "@/services/devices";
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
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Load devices - always loads 20 devices
  const loadDevices = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const currentOffset = isLoadMore ? offset : 0;

      const { data } = await getDevicesByPage(currentOffset, limit, search);

      if (data) {
        const { results } = data;

        if (isLoadMore) {
          setDevices((prevDevices) => [...prevDevices, ...results]);
        } else {
          setDevices(results);
        }

        // Always set offset to limit (20) for next load
        setOffset(limit);
      }
    } catch (err: any) {
      console.log("Error loading devices:", err);
      setError(err.message || "Failed to load devices");
      Alert.alert("Error", err.message || "Failed to load devices");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  // Handle refresh - loads first 20 devices
  const handleRefresh = () => {
    setRefreshing(true);
    setOffset(0);
    loadDevices();
  };

  // Handle search - loads first 20 devices matching search
  const handleSearch = () => {
    setSearch(searchInput);
    setOffset(0);
    setDevices([]); // Clear devices before new search
  };

  // Handle device press
  const handleDevicePress = (device: Device) => {
    router.push(`/devices/${device.id_device}`);
  };

  // Handle load more - loads next 20 devices
  const handleLoadMore = () => {
    loadDevices(true);
  };

  // Initial load - loads first 20 devices
  useEffect(() => {
    loadDevices();
  }, []);

  // Load first 20 devices when search changes
  useEffect(() => {
    if (search !== "") {
      setOffset(0);
      loadDevices();
    }
  }, [search]);

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <DeviceCard device={item} onPress={handleDevicePress} />
  );

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.footerText}>Loading more devices...</Text>
        </View>
      );
    }

    if (devices.length > 0) {
      return (
        <View style={styles.loadMoreContainer}>
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={handleLoadMore}
            disabled={loadingMore}
          >
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const renderEmptyState = () => {
    if (loading) return null;

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
            <TouchableOpacity
              onPress={() => {
                setSearchInput("");
                setSearch("");
                setOffset(0);
                setDevices([]);
                loadDevices();
              }}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Devices Count */}
      {!loading && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {devices.length} device{devices.length !== 1 ? "s" : ""}
            {search && ` found for "${search}"`}
          </Text>
        </View>
      )}

      {/* Devices List */}
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={48} color="#dc3545" />
          <Text style={styles.errorText}>{error}</Text>
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
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
        />
      )}

      {/* Loading Overlay */}
      {loading && !refreshing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading devices...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

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
    paddingBottom: 0, // Remove bottom padding since footer has its own
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
});

export default DevicesScreen;
