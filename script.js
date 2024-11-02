const prices = {
    "คอปก": { "S": 359, "M": 369, "L": 379, "XL": 389 },
    "คอกลม": { "S": 259, "M": 269, "L": 279, "XL": 289 }
};

let cart = [];

function addItem() {
    const shirtType = document.getElementById('shirtType').value;
    const size = document.getElementById('size').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = prices[shirtType][size] || 0;
    const totalPrice = price * quantity;

    cart.push({ shirtType, size, quantity, totalPrice });
    updateCart();
    calculateTotal();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>ประเภท: ${item.shirtType}, ขนาด: ${item.size}, จำนวน: ${item.quantity}, ราคา: ${item.totalPrice} บาท</span>
            <button class="delete-button" onclick="removeItem(${index})">ลบ</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function calculateTotal() {
    const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    document.getElementById('priceDisplay').textContent = `ราคารวม: ${total} บาท`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    calculateTotal();
}

function submitBooking() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const totalPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    const paymentSlip = document.getElementById('paymentSlip').files[0];

    if (!cart.length) {
        alert('กรุณาเพิ่มรายการเสื้อก่อนยืนยันการจอง');
        return;
    }

    // Placeholder for actual upload logic for the payment slip.
    alert(`การจองเสื้อสำเร็จ!\nชื่อ: ${name}\nนามสกุล: ${surname}\nเบอร์โทร: ${phone}\nราคารวม: ${totalPrice} บาท`);
    
    // Reset form and cart
    document.getElementById('bookingForm').reset();
    document.getElementById('cartItems').innerHTML = '';
    cart = [];
    calculateTotal();
}
