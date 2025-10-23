import ModuleListCard from "@/components/ModuleListCard";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModulesScreen() {
  const { modules } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedModules, setDisplayedModules] = useState<any[]>([]);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter modules based on search
  const filteredModules = modules.filter(
    (mod) =>
      mod.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.setting_module_config.key
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  // Initialize or reset displayed modules when search term changes
  useEffect(() => {
    setOffset(0);
    const initialModules = filteredModules.slice(0, limit);
    setDisplayedModules(initialModules);
    setOffset(limit);
  }, [searchTerm, modules]);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleLoadMore = () => {
    if (displayedModules.length >= filteredModules.length) return;

    setLoadingMore(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextModules = filteredModules.slice(offset, offset + limit);
      setDisplayedModules((prev) => [...prev, ...nextModules]);
      setOffset((prev) => prev + limit);
      setLoadingMore(false);
    }, 500);
  };

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.footerText}>Loading more modules...</Text>
        </View>
      );
    }

    if (
      displayedModules.length > 0 &&
      displayedModules.length < filteredModules.length
    ) {
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

  if (!modules) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={48} color="#dc3545" />
          <Text style={styles.errorText}>No modules available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Modules</Text>
        <Text style={styles.subtitle}>
          Manage and configure your system modules
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search modules..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#888"
          />
          {searchTerm ? (
            <TouchableOpacity onPress={handleClearSearch}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modules Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {displayedModules.length} of {filteredModules.length} module
          {filteredModules.length !== 1 ? "s" : ""}
          {searchTerm && ` found`}
          {filteredModules.length > displayedModules.length &&
            ` • ${
              filteredModules.length - displayedModules.length
            } more available`}
        </Text>
      </View>

      {/* Modules List */}
      <FlatList
        data={displayedModules}
        keyExtractor={(item) => item.id_module.toString()}
        renderItem={({ item }) => <ModuleListCard {...item} />}
        contentContainerStyle={[
          styles.listContainer,
          displayedModules.length === 0 && styles.emptyListContainer,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>
              {searchTerm ? "No modules found" : "No modules"}
            </Text>
            <Text style={styles.emptyStateText}>
              {searchTerm
                ? "Try adjusting your search terms"
                : "Modules will appear here once configured"}
            </Text>
          </View>
        }
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

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
