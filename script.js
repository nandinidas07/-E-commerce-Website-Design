// Demo products
const PRODUCTS = [
  { id: 'p1', title: 'Smartphone X200', category:'Electronics', price: 499.99, images:['https://placehold.co/300x200?text=Smartphone'] },
  { id: 'p2', title: 'Wireless Earbuds', category:'Electronics', price: 59.99, images:['https://placehold.co/300x200?text=Earbuds'] },
  { id: 'p3', title: 'Summer Dress', category:'Clothing', price: 49.50, images:['https://placehold.co/300x200?text=Summer+Dress'] },
  { id: 'p4', title: 'Denim Jacket', category:'Clothing', price: 79.99, images:['https://placehold.co/300x200?text=Denim+Jacket'] },
  { id: 'p5', title: 'Running Shoes', category:'Footwear', price: 89.00, images:['https://placehold.co/300x200?text=Shoes'] },
  { id: 'p6', title: 'Leather Wallet', category:'Accessories', price: 25.00, images:['https://placehold.co/300x200?text=Wallet'] }
];
// Format price
function formatPrice(v){ return (Math.round(v*100)/100).toFixed(2); }
function setYears(){ document.querySelectorAll('[id^=year]').forEach(e=>e.textContent = new Date().getFullYear()); }

// Scroll button
function initScrollTop(){
  const btn = document.getElementById('scrollTopBtn');
  if(!btn) return;
  window.addEventListener('scroll', ()=>{ btn.style.display = window.scrollY>200 ? 'block':'none'; });
  btn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
}

// Init Home Page
function initHome(){
  setYears(); initScrollTop();

  // Shop by Category
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  const catList = document.getElementById('category-list');
  cats.forEach(c=>{
    const el = document.createElement('div');
    el.className = 'col-6 col-md-3';
    el.innerHTML = `<div class="p-3 text-center shadow-sm rounded">
      <img src="https://source.unsplash.com/300x120/?${c.toLowerCase()}" class="img-fluid mb-2">
      <strong>${c}</strong></div>`;
    catList.appendChild(el);
  });

  // Latest Products
  const latest = document.getElementById('latest-products');
  PRODUCTS.forEach(p=>{
    const col = document.createElement('div'); col.className='col-6 col-md-3';
    col.innerHTML = `<div class="card product-card">
      <img src="${p.images[0]}" class="card-img-top">
      <div class="card-body"><h6>${p.title}</h6>
      <p class="small-muted">$${formatPrice(p.price)}</p></div></div>`;
    latest.appendChild(col);
  });
}
