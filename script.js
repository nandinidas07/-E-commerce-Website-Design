
const PRODUCTS = [
  { id: 'p1', title: 'Classic Watch', category:'Accessories', price: 79.99, rating:4.5, images: ['https://picsum.photos/600/400?random=21'], short:'Stylish classic watch.'},
  { id: 'p2', title: 'Running Shoes', category:'Footwear', price: 119.00, rating:4.7, images: ['https://picsum.photos/600/400?random=22'], short:'Comfortable running shoes.'},
  { id: 'p3', title: 'Leather Wallet', category:'Accessories', price: 39.50, rating:4.2, images: ['https://picsum.photos/600/400?random=23'], short:'Genuine leather.'},
  { id: 'p4', title: 'Denim Jacket', category:'Clothing', price: 89.99, rating:4.3, images: ['https://picsum.photos/600/400?random=24'], short:'Classic denim jacket.'},
  { id: 'p5', title: 'Bluetooth Headset', category:'Electronics', price: 59.99, rating:4.1, images: ['https://picsum.photos/600/400?random=25'], short:'Wireless bluetooth headset.'},
  { id: 'p6', title: 'Casual Sneakers', category:'Footwear', price: 69.00, rating:4.0, images: ['https://picsum.photos/600/400?random=26'], short:'Daily wear sneakers.'},
];
function formatPrice(v){ return (Math.round(v*100)/100).toFixed(2); }
function qs(name){ return new URLSearchParams(location.search).get(name); }
function setYears(){ const ys = document.querySelectorAll('[id^=year]'); ys.forEach(e=>e.textContent = new Date().getFullYear()); }
function updateCartCount(){
  const c = (JSON.parse(localStorage.getItem('cart')||'[]')).reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cart-count').forEach(n=>n.textContent = c);
}
function getProductById(id){ return PRODUCTS.find(p=>p.id===id); }

function initScrollTop(){
  const btn = document.getElementById('scrollTopBtn');
  if(!btn) return;
  window.addEventListener('scroll', ()=> {
    if(window.scrollY > 200) btn.style.display='block'; else btn.style.display='none';
  });
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}
function initHome(){
  setYears(); initScrollTop(); updateCartCount();


  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  const catList = document.getElementById('category-list');
  cats.forEach(c=>{
    const el = document.createElement('div');
    el.className = 'col-6 col-md-3';
    el.innerHTML = `<a href="products.html?category=${encodeURIComponent(c)}" class="text-decoration-none">
      <div class="p-3 text-center shadow-sm rounded"><img src="https://picsum.photos/300/120?random=${c.length}" class="img-fluid mb-2"><strong>${c}</strong></div></a>`;
    catList.appendChild(el);
  });
  const latest = document.getElementById('latest-products');
  PRODUCTS.forEach(p=>{
    const col = document.createElement('div'); col.className='col-6 col-md-3';
    col.innerHTML = `<div class="card product-card"><img src="${p.images[0]}" class="card-img-top">
      <div class="card-body"><h6>${p.title}</h6><p class="small-muted">$${formatPrice(p.price)}</p>
      <a href="product-view.html?id=${p.id}" class="btn btn-sm btn-outline-primary">View</a></div></div>`;
    latest.appendChild(col);
  });
}

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

  applyFilters();
}
function initProductView(){
  setYears(); initScrollTop(); updateCartCount();
  const id = qs('id');
  const p = getProductById(id);
  const container = document.getElementById('product-view-container');
  if(!p){ container.innerHTML = '<p>Product not found.</p>'; return; }
  container.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <img src="${p.images[0]}" class="img-fluid rounded" alt="${p.title}">
      </div>
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
    </div>
  `;
  document.getElementById('addBtn').addEventListener('click', ()=> {
    const qty = Math.max(1, Number(document.getElementById('qty').value||1));
    addToCart(p.id, qty);
    alert('Added to cart');
    updateCartCount();
  });
  const related = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
  const relEl = document.getElementById('related-products');
  relEl.innerHTML = related.map(renderProductCard).join('') || '<p>No related products</p>';
}
function initCategory(){
  setYears(); initScrollTop(); updateCartCount();
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  const container = document.getElementById('categories');
  container.innerHTML = cats.map(c => `<div class="col-md-4">
    <div class="shadow-sm p-3 rounded">
      <img src="https://picsum.photos/600/200?random=${c.length}" class="img-fluid mb-2">
      <h6>${c}</h6>
      <p class="small-muted">Explore our ${c} collection.</p>
      <a href="products.html?category=${encodeURIComponent(c)}" class="btn btn-sm btn-outline-primary">Shop ${c}</a>
    </div>
  </div>`).join('');
}
function addToCart(productId, qty=1){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const idx = cart.findIndex(i=>i.id===productId);
  if(idx>=0) cart[idx].qty += qty; else cart.push({id:productId, qty});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function initCart(){
  setYears(); initScrollTop(); updateCartCount();
  renderCart();
}

function renderCart(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const container = document.getElementById('cart-items');
  if(cart.length===0){ container.innerHTML = '<p>Your cart is empty.</p>'; document.getElementById('cart-total').textContent = '0.00'; return; }
  let total = 0;
  container.innerHTML = cart.map(item=>{
    const p = getProductById(item.id);
    const subtotal = p.price * item.qty;
    total += subtotal;
    return `<div class="d-flex gap-3 align-items-center border-bottom py-3">
      <img src="${p.images[0]}" style="width:80px;height:60px;object-fit:cover">
      <div class="flex-grow-1">
        <strong>${p.title}</strong><div class="small-muted">$${formatPrice(p.price)}</div>
      </div>
      <div style="width:120px">
        <input type="number" min="1" value="${item.qty}" data-id="${item.id}" class="form-control qty-input form-control-sm">
      </div>
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
      const id = e.target.dataset.id;
      let cart = JSON.parse(localStorage.getItem('cart')||'[]');
      cart = cart.filter(i=>i.id!==id); localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); updateCartCount();
    });
  });
}
function initCheckout(){
  setYears(); initScrollTop(); updateCartCount();
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const summary = document.getElementById('order-summary');
  if(cart.length===0){ summary.innerHTML = '<p>Your cart is empty.</p>'; return; }
  let total = 0;
  summary.innerHTML = cart.map(i=>{
    const p = getProductById(i.id);
    const sub = p.price*i.qty; total+=sub;
    return <div class="d-flex justify-content-between"><div>${p.title} × ${i.qty}</div><div>$${formatPrice(sub)}</div></div>;
  }).join('') + <hr><div class="d-flex justify-content-between fw-bold"><div>Total</div><div>$${formatPrice(total)}</div></div>;

  $('#checkout-form').on('submit', function(e){
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const address = this.address.value.trim();
    if(!name || !email || !address){ alert('Please fill required fields'); return; }
  
    const orderNo = 'ORD' + Date.now().toString().slice(-6) + Math.floor(Math.random()*90+10);
    const order = { orderNo, date: new Date().toISOString(), items: cart, total: total, shipping: {name, email, address, city: this.city.value, postal: this.postal.value}, status: 'Processing' };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.removeItem('cart');
    updateCartCount();
    location.href = 'confirmation.html';
  });
}

function initConfirmation(){
  setYears(); initScrollTop(); updateCartCount();
  const order = JSON.parse(localStorage.getItem('lastOrder')||'null');
  const el = document.getElementById('confirmation');
  if(!order){ el.innerHTML = '<h5>No recent order found.</h5>'; return; }
  el.innerHTML = `<h3>Thank you! Order confirmed</h3>
    <p>Order No: <strong>${order.orderNo}</strong></p>
    <p>Status: <strong>${order.status}</strong></p>
    <p>Total: $${formatPrice(order.total)}</p>
    <a class="btn btn-primary" href="index.html">Continue Shopping</a>`;
}
function initAbout(){ setYears(); initScrollTop(); updateCartCount(); }
function initContact(){
  setYears(); initScrollTop(); updateCartCount();
  $('#contact-form').on('submit', function(e){
    e.preventDefault();
    const name = this.name.value.trim(), email = this.email.value.trim(), message = this.message.value.trim();
    if(!name||!email||!message){ $('#contact-msg').text('Please fill all fields').css('color','red'); return; }
    $('#contact-msg').text('Message sent! We will contact you soon.').css('color','green');
    this.reset();
  });
}
function initSearch(){
  setYears(); initScrollTop(); updateCartCount();
  const q = (qs('q')||'').toLowerCase();
  const results = PRODUCTS.filter(p=>p.title.toLowerCase().includes(q) || (p.short||'').toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  const container = document.getElementById('search-results');
  if(!q) container.innerHTML = '<p>Enter a search query in the site search box.</p>';
  else container.innerHTML = results.map(renderProductCard).join('') || '<p>No results found</p>';
}
document.addEventListener('DOMContentLoaded', ()=>{
  setYears(); initScrollTop(); updateCartCount();
});
