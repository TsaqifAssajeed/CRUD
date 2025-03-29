const apiUrl = "http://localhost:5000/api/items"; // URL backend

// Ambil elemen DOM
const form = document.getElementById("item-form");
const itemsTable = document.getElementById("items-table");
const itemIdInput = document.getElementById("item-id");
const itemNameInput = document.getElementById("item-name");
const itemDescriptionInput = document.getElementById("item-description");
const itemPriceInput = document.getElementById("item-price");

// Fungsi untuk memuat semua item
async function loadItems() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Gagal memuat item');
        const items = await response.json();
        
        itemsTable.innerHTML = items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>
                    <button class="action edit" onclick="editItem(${item.id}, '${item.name}', '${item.description}', ${item.price})">Edit</button>
                    <button class="action delete" onclick="deleteItem(${item.id})">Hapus</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat memuat item');
    }
}

// Fungsi untuk menambahkan atau memperbarui Item
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = itemIdInput.value;
    const name = itemNameInput.value;
    const description = itemDescriptionInput.value;
    const price = itemPriceInput.value;
    
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    
    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price }),
        });
        if (!response.ok) throw new Error('Gagal menyimpan item');
        
        form.reset();
        loadItems();
        alert('Item berhasil disimpan');
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menyimpan item');
    }
});

// Fungsi untuk mengisi form saat edit
function editItem(id, name, description, price) {
    itemIdInput.value = id;
    itemNameInput.value = name;
    itemDescriptionInput.value = description;
    itemPriceInput.value = price;
}

// Fungsi untuk menghapus item
async function deleteItem(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error('Gagal menghapus item');
        loadItems();
        alert('Item berhasil dihapus');
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menghapus item');
    }
}

// Muat data awal
loadItems();