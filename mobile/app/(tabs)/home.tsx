import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import axios from "axios";

type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://192.168.43.203:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProduct();
    }, []),
  );

  const handleDelete = async (id: number) => {
    await axios.post(`http://192.168.43.203:8000/api/products/delete/${id}`);
    getProduct();
  };

  return (
    <ScrollView className="p-4">
      <View className="gap-4">
        {products.map((product) => (
          <TouchableOpacity
            onPress={() => router.navigate(`/update/${product.id}`)}
            key={product.id}
            className="bg-white rounded-md shadow-md"
          >
            <Image
              className="h-40"
              source={{
                uri: `http://192.168.43.203:8000/storage/${product.image}`,
              }}
            />
            <Text>{product.name}</Text>
            <Pressable
              onPress={(e) => {
                // e.preventDefault();
                handleDelete(product.id);
              }}
            >
              <Text>Delete</Text>
            </Pressable>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
