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
import Login from "./login";
import { useEffect, useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import {
  addToWishlist,
  removeFromWishlist,
} from "../actions/whishlist-actions";
import { connect } from "react-redux";
import { addToCart } from "../actions/cart-actions";

const Home = ({
  navigation,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  addToCart,
  cart,
}) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addedToCart, setAddedToCart] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.104:5000/api/v1/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://192.168.0.104:5000/api/v1/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;
  const categoriesfinal = [
    ...new Set(categories.map((product) => product.name)),
  ];
  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };
  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart([...addedToCart, product.id]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <FlatList
          data={categoriesfinal}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.category,
                  {
                    backgroundColor:
                      selectedCategory === item ? "lightgrey" : "white",
                  },
                ]}
                onPress={() => handleCategoryPress(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.productsContainer}>
        <FlatList
          data={filteredProducts}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          ListEmptyComponent={() => (
            <View style={styles.noProducts}>
              <Text>No products available</Text>
            </View>
          )}
          renderItem={({ item, index }) => {
            const inWishlist = wishlist.some((p) => p.id === item.id);
            const inCart = cart.some((p) => p.id === item.id);
            return (
              <View style={styles.product}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.price}> ₹ {item.price}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      inWishlist
                        ? handleRemoveFromWishlist(item)
                        : handleAddToWishlist(item)
                    }
                  >
                    <Icon
                      name={inWishlist ? "heart" : "heart-outline"}
                      size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cart}
                    onPress={() => {
                      inCart
                        ? navigation.navigate("Cart")
                        : handleAddToCart(item);
                    }}
                  >
                    <Text>{inCart ? "Go to Cart" : "Add to Cart"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  category: {
    padding: 10,
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 20,
  },
  productsContainer: {
    marginTop: "2%",
    marginBottom: "13%",
  },
  noProducts: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "70%",
  },
  product: {
    width: "43%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginLeft: "4%",
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
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "lightgrey",
  },
});

const mapStateToProps = (state) => ({
  wishlist: state.wishlist.wishlist,
  cart: state.cart.cart,
});

const mapDispatchToProps = {
  addToWishlist,
  removeFromWishlist,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
