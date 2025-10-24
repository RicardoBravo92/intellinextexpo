import { Character } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CharacterCardProps {
  character: Character;
  onPress: (character: Character) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onPress,
}) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Alive":
        return "heart";
      case "Dead":
        return "skull";
      default:
        return "help";
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(character)}
    >
      <Image source={{ uri: character.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>

        <View style={styles.details}>
          <View style={styles.statusContainer}>
            <Ionicons
              name={getStatusIcon(character.status)}
              size={14}
              color={getStatusColor(character.status)}
            />
            <Text
              style={[
                styles.status,
                { color: getStatusColor(character.status) },
              ]}
            >
              {character.status}
            </Text>
          </View>

          <Text style={styles.species}>{character.species}</Text>
        </View>

        <Text style={styles.location} numberOfLines={1}>
          {character.location.name}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  species: {
    fontSize: 14,
    color: "#666",
  },
  location: {
    fontSize: 12,
    color: "#888",
  },
});

export default CharacterCard;
