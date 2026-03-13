import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [message, setMessage] = useState("");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.43.203:8000/api/products/create",
        { name, description, price, image: image?.file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setMessage(response.data.message);
    } catch (error: any) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <View>
      {message ? (
        <View className="h-10 bg-green-500 items-center justify-center">
          <Text className="text-white">{message}</Text>
        </View>
      ) : null}
      <View>
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="outline-none border h-12 px-4"
        />
        {errors.name && <Text className="text-red-500">{errors.name[0]}</Text>}
      </View>
      <View>
        <Text>Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          className="outline-none border h-12 px-4"
        />
        {errors.description && (
          <Text className="text-red-500">{errors.description[0]}</Text>
        )}
      </View>
      <View>
        <Text>Price</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          className="outline-none border h-12 px-4"
        />
        {errors.price && (
          <Text className="text-red-500">{errors.price[0]}</Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          onPress={pickImage}
          className="h-12 bg-blue-500 items-center justify-center"
        >
          <Text className="text-white">Browse Image</Text>
        </TouchableOpacity>
        {errors.image && (
          <Text className="text-red-500">{errors.image[0]}</Text>
        )}
      </View>
      {image && (
        <Image
          className="h-40"
          source={{
            uri: image.uri,
          }}
        />
      )}
      <View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="h-12 bg-green-500 items-center justify-center"
        >
          <Text className="text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
