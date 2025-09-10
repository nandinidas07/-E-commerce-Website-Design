// ---------- Demo product dataset ----------
const PRODUCTS = [
  // Electronics
  { id: 'p1', title: 'Smartphone X200', category:'Electronics', price: 499.99, rating:4.6,
    images: ['https://picsum.photos/600/400?random=101'], short:'Latest smartphone with 128GB storage.'},
  { id: 'p2', title: 'Wireless Earbuds', category:'Electronics', price: 59.99, rating:4.2,
    images: ['https://picsum.photos/600/400?random=102'], short:'Noise cancelling wireless earbuds.'},
  { id: 'p3', title: 'Laptop Pro 14"', category:'Electronics', price: 999.99, rating:4.8,
    images: ['https://picsum.photos/600/400?random=103'], short:'High performance laptop for work and play.'},
  { id: 'p4', title: 'Smartwatch', category:'Electronics', price: 199.00, rating:4.4,
    images: ['https://picsum.photos/600/400?random=104'], short:'Track fitness and notifications on the go.'},

  // Clothing
  { id: 'p5', title: 'Men\'s Denim Jacket', category:'Clothing', price: 79.99, rating:4.3,
    images: ['https://picsum.photos/600/400?random=105'], short:'Classic blue denim jacket.'},
  { id: 'p6', title: 'Women\'s Summer Dress', category:'Clothing', price: 49.50, rating:4.5,
    images: ['https://picsum.photos/600/400?random=106'], short:'Lightweight floral summer dress.'},
  { id: 'p7', title: 'Hoodie Sweatshirt', category:'Clothing', price: 39.00, rating:4.1,
    images: ['https://picsum.photos/600/400?random=107'], short:'Soft cotton hoodie in multiple colors.'},
  { id: 'p8', title: 'Men\'s Formal Shirt', category:'Clothing', price: 29.99, rating:4.0,
    images: ['https://picsum.photos/600/400?random=108'], short:'Slim fit cotton shirt.'},

  // Footwear
  { id: 'p9', title: 'Running Shoes', category:'Footwear', price: 89.00, rating:4.7,
    images: ['https://picsum.photos/600/400?random=109'], short:'Comfortable lightweight running shoes.'},
  { id: 'p10', title: 'Casual Sneakers', category:'Footwear', price: 65.50, rating:4.2,
    images: ['https://picsum.photos/600/400?random=110'], short:'Everyday sneakers in stylish design.'},
  { id: 'p11', title: 'Leather Sandals', category:'Footwear', price: 34.99, rating:4.1,
    images: ['https://picsum.photos/600/400?random=111'], short:'Genuine leather summer sandals.'},

  // Accessories
  { id: 'p12', title: 'Leather Wallet', category:'Accessories', price: 25.00, rating:4.3,
    images: ['https://picsum.photos/600/400?random=112'], short:'Compact bi-fold leather wallet.'},
  { id: 'p13', title: 'Classic Watch', category:'Accessories', price: 149.99, rating:4.5,
    images: ['https://picsum.photos/600/400?random=113'], short:'Timeless wristwatch with leather strap.'},
  { id: 'p14', title: 'Sunglasses', category:'Accessories', price: 19.99, rating:4.0,
    images: ['https://picsum.photos/600/400?random=114'], short:'UV protection stylish sunglasses.'},

  // Home & Kitchen
  { id: 'p15', title: 'Blender Mixer', category:'Home & Kitchen', price: 59.00, rating:4.4,
    images: ['https://picsum.photos/600/400?random=115'], short:'Multi-purpose kitchen blender.'},
  { id: 'p16', title: 'Ceramic Dinner Set', category:'Home & Kitchen', price: 79.99, rating:4.2,
    images: ['https://picsum.photos/600/400?random=116'], short:'12-piece ceramic dinnerware set.'},
  { id: 'p17', title: 'Table Lamp', category:'Home & Kitchen', price: 29.00, rating:4.1,
    images: ['https://picsum.photos/600/400?random=117'], short:'Modern bedside table lamp.'},

  // Sports
  { id: 'p18', title: 'Yoga Mat', category:'Sports', price: 25.50, rating:4.6,
    images: ['https://picsum.photos/600/400?random=118'], short:'Non-slip, eco-friendly yoga mat.'},
  { id: 'p19', title: 'Football', category:'Sports', price: 19.00, rating:4.3,
    images: ['https://picsum.photos/600/400?random=119'], short:'Standard size durable football.'},
  { id: 'p20', title: 'Cricket Bat', category:'Sports', price: 49.99, rating:4.5,
    images: ['https://picsum.photos/600/400?random=120'], short:'Lightweight wooden cricket bat.'}
];

// ---------- Utilities ----------
function formatPrice(v){ return (Math.round(v*100)/100).toFixed(2); }
function qs(name){ return new URLSearchParams(location.search).get(name); }
function setYears(){ document.querySelectorAll('[id^=year]').forEach(e=>e.textContent = new Date().getFullYear()); }
function updateCartCount(){
  const c = (JSON.parse(localStorage.getItem('cart')||'[]')).reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cart-count').forEach(n=>n.textContent = c);
}
function getProductById(id){ return PRODUCTS.find(p=>p.id===id); }

// ---------- Scroll to top ----------
function initScrollTop(){
  const btn = document.getElementById('scrollTopBtn');
  if(!btn) return;
  window.addEventListener('scroll', ()=> {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// ---------- Home ----------
function initHome(){
  setYears(); initScrollTop(); updateCartCount();

  // categories
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  const catList = document.getElementById('category-list');
  cats.forEach(c=>{
    const el = document.createElement('div');
    el.className = 'col-6 col-md-3';
    el.innerHTML = `<a href="products.html?category=${encodeURIComponent(c)}" class="text-decoration-none">
      <div class="p-3 text-center shadow-sm rounded"><img src="https://source.unsplash.com/300x120/?${c.toLowerCase()}" class="img-fluid mb-2"><strong>${c}</strong></div></a>`;
    catList.appendChild(el);
  });

  // latest products
  const latest = document.getElementById('latest-products');
  PRODUCTS.slice(0,8).forEach(p=>{
    const col = document.createElement('div'); col.className='col-6 col-md-3';
    col.innerHTML = `<div class="card product-card"><img src="${p.images[0]}" class="card-img-top">
      <div class="card-body"><h6>${p.title}</h6><p class="small-muted">$${formatPrice(p.price)}</p>
      <a href="product-view.html?id=${p.id}" class="btn btn-sm btn-outline-primary">View</a></div></div>`;
    latest.appendChild(col);
  });
}

// ---------- Products Page ----------
function renderProductCard(p){
  return `<div class="col-sm-6 col-md-4">
    <div class="card product-card">
      <img src="${p.images[0]}" class="card-img-top" alt="${p.title}">
      <div class="card-body d-flex flex-column">
        <h6>${p.title}</h6>
        <p class="small-muted">$${formatPrice(p.price)} · <span class="rating">★ ${p.rating}</span></p>
        <div class="mt-auto d-flex gap-2">
          <a class="btn btn-sm btn-primary" href="product-view.html?id=${p.id}">View</a>
          <button class="btn btn-sm btn-outline-secondary" onclick="addToCart('${p.id}',1)">Add</button>
        </div>
      </div>
    </div>
  </div>`;
}

function initProducts(){
  setYears(); initScrollTop(); updateCartCount();
  const params = new URLSearchParams(location.search);
  const preCategory = params.get('category') || '';
  const categorySelect = document.getElementById('filter-category');
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  cats.forEach(c=>{
    const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
    if(c===preCategory) opt.selected = true;
    categorySelect.appendChild(opt);
  });
  // price slider
  const maxPriceInput = document.getElementById('filter-price');
  const maxPriceVal = document.getElementById('max-price-val');
  maxPriceInput.addEventListener('input', ()=> maxPriceVal.textContent = maxPriceInput.value);

  function applyFilters(){
    const cat = categorySelect.value;
    const maxP = Number(maxPriceInput.value);
    const filtered = PRODUCTS.filter(p => (cat? p.category===cat : true) && p.price <= maxP);
    document.getElementById('products-list').innerHTML = filtered.map(renderProductCard).join('') || '<p>No products found</p>';
  }
  document.getElementById('clear-filters').addEventListener('click', ()=> { categorySelect.value=''; maxPriceInput.value=2000; maxPriceVal.textContent='2000'; applyFilters();});
  categorySelect.addEventListener('change', applyFilters);
  maxPriceInput.addEventListener('change', applyFilters);
  // initial render
  applyFilters();
}

// ---------- Product View ----------
function initProductView(){
  setYears(); initScrollTop(); updateCartCount();
  const id = qs('id');
  const p = getProductById(id);
  const container = document.getElementById('product-view-container');
  if(!p){ container.innerHTML = '<p>Product not found.</p>'; return; }
  container.innerHTML = `
    <div class="row">
      <div class="col-md-6"><img src="${p.images[0]}" class="img-fluid rounded" alt="${p.title}"></div>
      <div class="col-md-6">
        <h3>${p.title}</h3>
        <p class="small-muted">Category: ${p.category} · <span class="rating">★ ${p.rating}</span></p>
        <h4>$${formatPrice(p.price)}</h4>
        <p>${p.short || ''}</p>
        <div class="d-flex gap-2 mt-3">
          <input id="qty" type="number" min="1" value="1" class="form-control form-control-sm" style="max-width:90px;">
          <button id="addBtn" class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>`;
  document.getElementById('addBtn').addEventListener('click', ()=> {
    const qty = Math.max(1, Number(document.getElementById('qty').value||1));
    addToCart(p.id, qty);
    alert('Added to cart');
    updateCartCount();
  });

  const related = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
  document.getElementById('related-products').innerHTML = related.map(renderProductCard).join('') || '<p>No related products</p>';
}

// ---------- Category ----------
function initCategory(){
  setYears(); initScrollTop(); updateCartCount();
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  const container = document.getElementById('categories');
  container.innerHTML = cats.map(c => `<div class="col-md-4">
    <div class="shadow-sm p-3 rounded">
      <img src="https://source.unsplash.com/600x200/?${c.toLowerCase()}" class="img-fluid mb-2">
      <h6>${c}</h6>
      <p class="small-muted">Explore our ${c} collection.</p>
      <a href="products.html?category=${encodeURIComponent(c)}" class="btn btn-sm btn-outline-primary">Shop ${c}</a>
    </div>
  </div>`).join('');
}

// ---------- Cart ----------
function addToCart(productId, qty=1){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const idx = cart.findIndex(i=>i.id===productId);
  if(idx>=0) cart[idx].qty += qty; else cart.push({id:productId, qty});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function initCart(){ setYears(); initScrollTop(); updateCartCount(); renderCart(); }
function renderCart(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const container = document.getElementById('cart-items');
  if(cart.length===0){ container.innerHTML = '<p>Your cart is empty.</p>'; document.getElementById('cart-total').textContent = '0.00'; return; }
  let total = 0;
  container.innerHTML = cart.map(item=>{
    const p = getProductById(item.id);
    const subtotal = p.price * item.qty; total += subtotal;
    return `<div class="d-flex gap-3 align-items-center border-bottom py-3">
      <img src="${p.images[0]}" style="width:80px;height:60px;object-fit:cover">
      <div class="flex-grow-1"><strong>${p.title}</strong><div class="small-muted">$${formatPrice(p.price)}</div></div>
      <div style="width:120px"><input type="number" min="1" value="${item.qty}" data-id="${item.id}" class="form-control qty-input form-control-sm"></div>
      <div style="width:120px">$${formatPrice(subtotal)}</div>
      <div><button class="btn btn-sm btn-danger remove-btn" data-id="${item.id}">Remove</button></div>
    </div>`;
  }).join('');
  document.getElementById('cart-total').textContent = formatPrice(total);

  document.querySelectorAll('.qty-input').forEach(inp=>{
    inp.addEventListener('change', (e)=>{
      const id = e.target.dataset.id; const val = Math.max(1, Number(e.target.value||1));
      const cart = JSON.parse(localStorage.getItem('cart')||'[]');
      const idx = cart.findIndex(c=>c.id===id);
      if(idx>=0){ cart[idx].qty = val; localStorage.setItem('cart', JSON.stringify(cart)); renderCart(); updateCartCount(); }
    });
  });
  document.querySelectorAll('.remove-btn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      let cart = JSON.parse(localStorage.getItem('cart')||'[]');
      cart = cart.filter(i=>i.id!==e.target.dataset.id);
      localStorage.setItem('cart', JSON.stringify(cart)); renderCart(); updateCartCount();
    });
  });
}

// ---------- Checkout ----------
function initCheckout(){
  setYears(); initScrollTop(); updateCartCount();
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const summary = document.getElementById('order-summary');
  if(cart.length===0){ summary.innerHTML = '<p>Your cart is empty.</p>'; return; }
  let total = 0;
  summary.innerHTML = cart.map(i=>{
    const p = getProductById(i.id); const sub = p.price*i.qty; total+=sub;
    return <div class="d-flex justify-content-between"><div>${p.title} × ${i.qty}</div><div>$${formatPrice(sub)}</div></div>;
  }).join('') + <hr><div class="d-flex justify-content-between fw-bold"><div>Total</div><div>$${formatPrice(total)}</div></div>;

  $('#checkout-form').on('submit', function(e){
    e.preventDefault();
    const name = this.name.value.trim(), email = this.email.value.trim(), address = this.address.value.trim();
    if(!name || !email || !address){ alert('Please fill required fields'); return; }
    const orderNo = 'ORD' + Date.now().toString().slice(-6);
    const order = { orderNo, items: cart, total: total, shipping: {name,email,address}, status: 'Processing' };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.removeItem('cart'); updateCartCount();
    location.href = 'confirmation.html';
  });
}

// ---------- Confirmation ----------
function initConfirmation(){
  setYears(); initScrollTop(); updateCartCount();
  const order = JSON.parse(localStorage.getItem('lastOrder')||'null');
  const el = document.getElementById('confirmation');
  if(!order){ el.innerHTML = '<h5>No recent order found.</h5>'; return; }
  el.innerHTML = `<h3>Thank you! Order confirmed</h3>
    <p>Order No: <strong>${order.orderNo}</strong></p>
    <p>Status: <strong>${
