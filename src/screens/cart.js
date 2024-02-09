import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { removeFromCart } from "../actions/cart-actions";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const Cart = ({ navigation, cart, removeFromCart }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
  };
  return (
    <View style={styles.container}>
      {cart.length > 0 && (
        <Button
          style={styles.orderButton}
          onPress={() => navigation.navigate("Success")}
          title="Place Order"
        />
      )}

      <FlatList
        data={cart}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.product}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.title}</Text>
              {/* <Text style={styles.productDesc} >{item.description}</Text> */}
              <Text style={styles.price}> ${item.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
                  <Icon name={"trash-outline"} size={30} />
                </TouchableOpacity>
                <Text>Quantity</Text>
                <Picker
                  selectedValue={selectedQuantity}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue) => setSelectedQuantity(itemValue)}
                >
                  {[...Array(item.quantity).keys()].map((quantity) => (
                    <Picker.Item
                      key={quantity + 1}
                      label={quantity + 1}
                      value={quantity + 1}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          );
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  category: {
    padding: 10,
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 20,
  },
  product: {
    width: "43%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cart: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  productName: {
    marginLeft: 2,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "400",
    height: 30,
  },
  productImage: {
    width: "100%",
    height: "70%",
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "lightgrey",
  },
});

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

const mapDispatchToProps = {
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
