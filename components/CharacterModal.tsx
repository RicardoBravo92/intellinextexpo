import { Character } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface CharacterModalProps {
  visible: boolean;
  character: Character | null;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  visible,
  character,
  onClose,
}) => {
  if (!character) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "#4CAF50";
      case "Dead":
        return "#f44336";
      default:
        return "#9E9E9E";
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "Male":
        return "male";
      case "Female":
        return "female";
      case "Genderless":
        return "male-female";
      default:
        return "help";
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Character Details</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content}>
          {/* Character Image */}
          <Image
            source={{ uri: character.image }}
            style={styles.characterImage}
          />

          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={styles.characterName}>{character.name}</Text>

            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor(character.status) },
                ]}
              />
              <Text style={styles.statusText}>
                {character.status} - {character.species}
                {character.type && ` (${character.type})`}
              </Text>
            </View>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Ionicons
                name={getGenderIcon(character.gender)}
                size={20}
                color="#007AFF"
              />
              <Text style={styles.detailLabel}>Gender</Text>
              <Text style={styles.detailValue}>{character.gender}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="planet" size={20} color="#007AFF" />
              <Text style={styles.detailLabel}>Origin</Text>
              <Text style={styles.detailValue}>{character.origin.name}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="location" size={20} color="#007AFF" />
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{character.location.name}</Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="film" size={20} color="#007AFF" />
              <Text style={styles.detailLabel}>Episodes</Text>
              <Text style={styles.detailValue}>{character.episode.length}</Text>
            </View>
          </View>

          {/* Additional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Created:</Text>
              <Text style={styles.infoValue}>
                {new Date(character.created).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Species:</Text>
              <Text style={styles.infoValue}>{character.species}</Text>
            </View>
            {character.type && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Type:</Text>
                <Text style={styles.infoValue}>{character.type}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  characterImage: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 12,
  },
  characterName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: "#666",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
  },
  detailItem: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
  },
});

export default CharacterModal;
