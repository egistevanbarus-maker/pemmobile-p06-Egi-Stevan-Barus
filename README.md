# ShopList App - Sneaker Store (Pemrograman Mobile Pertemuan 6)

## Nama & NIM
- Nama: Egi Stevan Barus  
- NIM: 2433036212666

---

## Deskripsi Aplikasi
**ShopList App (Sneaker Store)** adalah aplikasi katalog sepatu berbasis **React Native** yang menampilkan daftar produk sepatu menggunakan **FlatList**.  
Aplikasi ini memiliki fitur **pencarian real-time**, **filter kategori sepatu**, **sorting produk**, **toggle tampilan list/grid**, serta **pull-to-refresh**.

Aplikasi ini dibuat untuk memenuhi tugas Praktikum **Pemrograman Mobile Pertemuan 6**.

---

## Fitur yang Diimplementasikan

### Requirements (Nilai Dasar)
- [x] FlatList dengan minimal 12 produk dummy sepatu
- [x] Setiap produk memiliki atribut: `id`, `name`, `category`, `price`, `rating`, `image`
- [x] Custom `ProductCard` dibuat di file terpisah (`components/ProductCard.js`)
- [x] `keyExtractor` menggunakan `id` unik (string), bukan index array
- [x] `ListEmptyComponent` menampilkan empty state (icon + pesan + hint)
- [x] Search real-time menggunakan `TextInput` (tanpa tombol submit)
- [x] Pull-to-Refresh menggunakan `onRefresh` dan `refreshing` bawaan FlatList

---

### Bonus Enhancement (Nilai Tambahan)
- [x] Filter kategori sepatu menggunakan chip button (Semua, Sneakers, Running, Casual, Sandal)
- [x] Toggle tampilan **List (1 kolom)** ↔ **Grid (2 kolom)** menggunakan `numColumns`
- [ ] SectionList Mode (belum digunakan)
- [x] Sort produk (Harga Terendah, Harga Tertinggi, Rating Tertinggi)

---

## Tampilan UI
- Tema warna modern dan konsisten
- Card produk menampilkan nama, kategori, harga, rating, serta tombol beli
- Header aplikasi menampilkan nama aplikasi dan jumlah produk yang sedang ditampilkan
- Search bar memiliki tombol clear (✕)
- Empty state menampilkan icon sepatu + pesan informatif

---

## Screenshot

### Tampilan Utama 
(https://freeimage.host/i/B6VcA7e)

### Tampilan Search — saat ada hasil
(https://freeimage.host/i/B6Vl4cP)

### Tampilan Empty State — saat tidak ada hasil
(https://freeimage.host/i/B6Vlc9n)
