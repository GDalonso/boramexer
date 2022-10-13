import { Alert } from "react-native";

export function resultFeedbackAlert(title, message) {
  Alert.alert(title, message, [
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ])
}
