import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";

import { products as productData } from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isGrid, setIsGrid] = useState(false);
  const [sortOption, setSortOption] = useState("Default");

  const [cart, setCart] = useState([]);

  const categories = ["Semua", "Pakaian", "Sepatu", "Aksesoris"];

  const filteredProducts = useMemo(() => {
    let result = [...productData];

    if (selectedCategory !== "Semua") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (search.trim() !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOption === "Harga Terendah") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Harga Tertinggi") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Rating Tertinggi") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, selectedCategory, sortOption]);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleBuy = (product) => {
    setCart((prev) => [...prev, product]);
    Alert.alert("Berhasil!", `${product.name} masuk ke keranjang 🛒`);
  };

  const showCart = () => {
    if (cart.length === 0) {
      Alert.alert("Keranjang 🛒", "Keranjang masih kosong.");
      return;
    }

    Alert.alert(
      "Keranjang 🛒",
      `Total item: ${cart.length}\nTotal harga: Rp ${totalPrice.toLocaleString(
        "id-ID"
      )}`
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛍️</Text>
      <Text style={styles.emptyTitle}>Oops! Produk tidak ada</Text>
      <Text style={styles.emptyHint}>
        Coba cari dengan kata lain atau pilih kategori berbeda.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* BACKGROUND */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>ShopList</Text>
            <Text style={styles.subtitle}>
              Menampilkan {filteredProducts.length} produk
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.headerIconBox}>
              <Text style={styles.headerIcon}>🛒</Text>
            </View>

            <TouchableOpacity style={styles.cartBox} onPress={showCart}>
              <Text style={styles.cartText}>🛍️ {cart.length}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH */}
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />

        {/* FILTER */}
        <View style={styles.filterRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.chipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ACTIONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => {
              if (sortOption === "Default") setSortOption("Harga Terendah");
              else if (sortOption === "Harga Terendah")
                setSortOption("Harga Tertinggi");
              else if (sortOption === "Harga Tertinggi")
                setSortOption("Rating Tertinggi");
              else setSortOption("Default");
            }}
          >
            <Text style={styles.actionText}>⚡ {sortOption}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => setIsGrid(!isGrid)}
          >
            <Text style={styles.actionText}>
              {isGrid ? "📄 List" : "🔳 Grid"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FLATLIST */}
        <FlatList
          key={isGrid ? "grid" : "list"}
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard item={item} isGrid={isGrid} onBuy={handleBuy} />
          )}
          numColumns={isGrid ? 2 : 1}
          ListEmptyComponent={renderEmpty}
          onRefresh={onRefresh}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredProducts.length === 0 ? styles.emptyList : styles.listPadding
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },

  content: {
    flex: 1,
  },

  /* ===== BACKGROUND SHAPES ===== */
  bgCircle1: {
    position: "absolute",
    top: -140,
    left: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#2563eb",
    opacity: 0.18,
  },

  bgCircle2: {
    position: "absolute",
    bottom: -160,
    right: -120,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: "#9333ea",
    opacity: 0.15,
  },

  bgCircle3: {
    position: "absolute",
    top: 180,
    right: -90,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#22c55e",
    opacity: 0.1,
  },

  /* ===== HEADER ===== */
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
    fontWeight: "600",
  },

  headerIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },

  headerIcon: {
    fontSize: 22,
    color: "#fff",
  },

  cartBox: {
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  cartText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 13,
  },

  /* ===== FILTER CHIP ===== */
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 8,
    marginBottom: 8,
  },

  chipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  chipText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#374151",
  },

  chipTextActive: {
    color: "#ffffff",
  },

  /* ===== ACTION BUTTONS ===== */
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginBottom: 6,
  },

  actionBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  actionText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111827",
  },

  /* ===== LIST ===== */
  listPadding: {
    paddingBottom: 30,
  },

  /* ===== EMPTY STATE ===== */
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 70,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },

  emptyHint: {
    marginTop: 6,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: "600",
  },
});