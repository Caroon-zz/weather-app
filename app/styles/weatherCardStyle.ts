import { StyleSheet } from "react-native";

const weatherCardStyle = StyleSheet.create({
  card: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
    minWidth: 260,
  },
  description: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
});

export default weatherCardStyle;
