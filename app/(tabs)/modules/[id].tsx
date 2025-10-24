import ModuleItemCard from "@/components/ModuleItemCard";
import { useAuthStore } from "@/store/authStore";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams();
  const { modules } = useAuthStore();
  const module = modules.find((m) => m.id_module.toString() === id.toString());

  if (!module) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text>Module not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ModuleItemCard {...module} />
    </SafeAreaView>
  );
}
