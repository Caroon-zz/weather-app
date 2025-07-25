import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#e3f0ff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 32,
    letterSpacing: 1.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    width: 240,
    marginBottom: 18,
    backgroundColor: "#fff",
    fontSize: 18,
    color: "#222",
    textAlign: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonWrapper: {
    width: 240,
    marginBottom: 24,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  errorText: {
    color: "#d00",
    marginBottom: 8,
  },
});

export default styles;
