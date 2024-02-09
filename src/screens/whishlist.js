import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { removeFromWishlist } from "../actions/whishlist-actions";

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.product}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.price}> ${item.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleRemoveFromWishlist(item)}
                >
                  <Icon name={"trash-outline"} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cart}>
                  <Text>Add to Cart</Text>
                </TouchableOpacity>
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
  container: {
    backgroundColor: "#fff",
    paddingTop: "5%",
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
  wishlist: state.wishlist.wishlist,
});

const mapDispatchToProps = {
  removeFromWishlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
