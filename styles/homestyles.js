import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#dce0ffff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    marginBottom: 30,
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#120217ff",
  },

  subtitle: {
    fontSize: 16,
    color: "#4b5f83ff",
    marginTop: 8,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#faf5fcff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#120217ff",
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: "#4b5f83ff",
    lineHeight: 20,
  },
});

export default styles;
