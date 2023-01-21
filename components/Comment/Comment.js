import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";

function Comment({ item }) {
  return (
    <View>
      <View
        style={{
          marginTop: 32,
          flexDirection: "row",
        }}
      >
        <View style={styles.comment}>
          <Text style={{ fontSize: 16 }}>User: {item.login}</Text>
          <Text>{item.comment}</Text>
          <Text style={styles.date}>
            {item.date}|{item.time}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Comment;

//styles
const styles = StyleSheet.create({
  comment: {
    marginLeft: 16,
    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    color: "grey",
  },
});
