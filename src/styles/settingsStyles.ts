import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  unitToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  unitLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  infoSection: {
    marginTop: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
