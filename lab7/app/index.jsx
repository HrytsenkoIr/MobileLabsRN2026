import {
  View,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";

import { useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";

import { router } from "expo-router";

export default function HomeScreen() {
  const products = useSelector(
    (state) => state.products.products
  );

  return (
    <View style={styles.container}>
      <Button
        title="Кошик"
        onPress={() => router.push("/cart")}
      />

      <Button
        title="Замовлення"
        onPress={() => router.push("/orders")}
      />

      <FlatList
        data={products}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <ProductCard item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});