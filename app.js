// State keranjang belanja
let cart = [];
let products = []; // Datanya sekarang kosong, akan diisi dari internet

// Format angka ke Rupiah (karena data dari internet pakai Dollar, kita kalikan 15.000)
const formatRupiah = (number) => {
    const rupiah = number * 15000; 
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(rupiah);
};

// Fungsi untuk mengambil data dari internet (API)
const fetchProductsFromInternet = async () => {
    try {
        const container = document.getElementById('product-container');
        container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">Sedang mengambil data dari internet...</p>`;

        // Mengambil data dari server FakeStore API
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await response.json();
        
        // Simpan data dari internet ke variabel lokal
        products = data;
        
        // Tampilkan ke layar
        renderProducts();
    } catch (error) {
        console.error("Gagal terhubung ke internet:", error);
        document.getElementById('product-container').innerHTML = 
            `<p style="color: red; text-align: center;">Gagal memuat produk. Pastikan laptopmu terhubung ke internet.</p>`;
    }
};

// Fungsi Render Produk ke HTML
const renderProducts = () => {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Bersihkan tulisan loading
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Perhatikan: properti dari internet pakai nama bahasa Inggris (product.title, product.category)
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" style="object-fit: contain; padding: 1rem; background: white;">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title" style="font-size: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.title}</h3>
                <p class="product-price">${formatRupiah(product.price)}</p>
                <button class="btn-add" onclick="addToCart(${product.id})">
                    Tambah ke Keranjang
                </button>
            </div>
        `;
        container.appendChild(card);
    });
};

// Fungsi Tambah ke Keranjang
const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    
    document.getElementById('cart-count').innerText = cart.length;
    showToast();
};

// Fungsi memunculkan notifikasi
const showToast = () => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
};

// Panggil fungsi fetch saat website pertama kali dibuka
document.addEventListener('DOMContentLoaded', fetchProductsFromInternet);