import { Alert } from "react-native";

export function resultFeedbackAlert(title, message) {
  console.log('got this far')
  Alert.alert(title, message, [
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ])
  console.log('got to the end')
}
