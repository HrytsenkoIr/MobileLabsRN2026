import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Text>{item.title}</Text>

      <Text>
        Кількість: {item.quantity}
      </Text>

      <Text>
        Сума: {item.price * item.quantity} грн
      </Text>

      <Button
        title="+"
        onPress={() =>
          dispatch(increaseQuantity(item.id))
        }
      />

      <Button
        title="-"
        onPress={() =>
          dispatch(decreaseQuantity(item.id))
        }
      />

      <Button
        title="Видалити"
        onPress={() =>
          dispatch(removeFromCart(item.id))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
  },
});