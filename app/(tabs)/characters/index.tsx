import CharacterCard from "@/components/CharacterListCard";
import CharacterModal from "@/components/CharacterModal";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CharactersScreen() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const {
    characters,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
    isError,
  } = useCharacters({ search });

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleCharacterPress = (character: Character) => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCharacter(null);
  };

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.footerText}>Loading more characters...</Text>
        </View>
      );
    }

    if (hasNextPage && characters.length > 0) {
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

    if (characters.length > 0) {
      return (
        <View style={styles.endOfList}>
          <Text style={styles.endOfListText}>No more characters to load</Text>
        </View>
      );
    }

    return null;
  };

  const renderEmptyState = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyState}>
        <Ionicons name="people-outline" size={64} color="#ccc" />
        <Text style={styles.emptyStateTitle}>
          {search ? "No characters found" : "No characters"}
        </Text>
        <Text style={styles.emptyStateText}>
          {search
            ? "Try adjusting your search terms"
            : "Characters will appear here once loaded"}
        </Text>
      </View>
    );
  };

  // Show loading overlay only on initial load
  const showLoadingOverlay = isLoading && !isFetchingNextPage;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Characters</Text>
        <Text style={styles.subtitle}>Explore the Rick and Morty universe</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search characters..."
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

      {/* Characters Count */}
      {!isLoading && characters.length > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            {characters.length} character{characters.length !== 1 ? "s" : ""}
            {search && ` found for "${search}"`}
          </Text>
        </View>
      )}

      {/* Characters List */}
      {isError ? (
        <View style={styles.emptyState}>
          <Ionicons name="people" size={64} color="#ccc" />
          <Text style={styles.emptyStateTitle}>
            {search ? "No characters found" : "No characters"}
          </Text>
          <Text style={styles.emptyStateText}>
            {search
              ? "Try adjusting your search terms"
              : "Devices will appear here once added"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <CharacterCard character={item} onPress={handleCharacterPress} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[
            styles.listContainer,
            characters.length === 0 && styles.emptyListContainer,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isFetching && !isFetchingNextPage}
              onRefresh={() => refetch()}
            />
          }
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}

      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading characters...</Text>
        </View>
      )}

      {/* Character Modal */}
      <CharacterModal
        visible={modalVisible}
        character={selectedCharacter}
        onClose={handleCloseModal}
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
