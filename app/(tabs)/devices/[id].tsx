import DeviceItemCard from "@/components/DeviceItemCard";
import { getDeviceById } from "@/services/devices";
import { Device } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeviceScreen() {
  const { id } = useLocalSearchParams();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDevice = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await getDeviceById(Number(id));

      if (data) {
        const { result } = data;
        setDevice(result);
      }
    } catch (err: any) {
      console.error("Error loading device:", err);
      setError(err.message || "Failed to load device");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevice();
  }, [id]);

  {
    if (loading) {
      return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
          <Text>Loading...</Text>
        </SafeAreaView>
      );
    }
  }
  {
    !loading && !device && (
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text>Device not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <DeviceItemCard {...device} />
    </SafeAreaView>
  );
}
