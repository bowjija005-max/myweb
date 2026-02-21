// INIT
if(!localStorage.getItem("users")){
localStorage.setItem("users",JSON.stringify([
{username:"admin",password:btoa("kim123"),role:"admin"}
]));
}
if(!localStorage.getItem("products")){
localStorage.setItem("products",JSON.stringify([
{id:1,name:"VIP 30 วัน",price:100},
{id:2,name:"VIP 90 วัน",price:250}
]));
}

function getUsers(){return JSON.parse(localStorage.getItem("users"))}
function saveUsers(u){localStorage.setItem("users",JSON.stringify(u))}
function getSession(){return JSON.parse(sessionStorage.getItem("session"))}
function setSession(u){sessionStorage.setItem("session",JSON.stringify(u))}
function logout(){sessionStorage.clear();location.href="login.html"}
function requireLogin(){if(!getSession())location.href="login.html"}

function register(){
let u=reg_user.value.trim()
let p=reg_pass.value
if(p.length<6){alert("รหัสต้องมากกว่า5ตัว");return}
let users=getUsers()
if(users.find(x=>x.username===u)){alert("มีชื่อนี้แล้ว");return}
users.push({username:u,password:btoa(p),role:"user"})
saveUsers(users)
alert("สมัครสำเร็จ")
location.href="login.html"
}

function login(){
let u=log_user.value.trim()
let p=btoa(log_pass.value)
let user=getUsers().find(x=>x.username===u&&x.password===p)
if(!user){alert("ข้อมูลผิด");return}
setSession(user)
location.href="index.html"
}

function loadProducts(){
let list=document.getElementById("productList")
if(!list)return
let products=JSON.parse(localStorage.getItem("products"))
list.innerHTML=""
products.forEach(p=>{
list.innerHTML+=`<div class="card"><h3>${p.name}</h3><p>${p.price} บาท</p><button onclick="addToCart(${p.id})">เพิ่ม</button></div>`
})
}

function getCart(){return JSON.parse(localStorage.getItem("cart"))||[]}
function saveCart(c){localStorage.setItem("cart",JSON.stringify(c))}
function addToCart(id){
let products=JSON.parse(localStorage.getItem("products"))
let product=products.find(p=>p.id===id)
let cart=getCart()
cart.push(product)
saveCart(cart)
alert("เพิ่มแล้ว")
}
function loadCart(){
let list=document.getElementById("cartList")
if(!list)return
let cart=getCart()
let total=0
list.innerHTML=""
cart.forEach((c,i)=>{
total+=c.price
list.innerHTML+=`${c.name}-${c.price} บาท <button onclick="removeCart(${i})">ลบ</button><br>`
})
totalPrice.innerText=total
}
function removeCart(i){
let cart=getCart()
cart.splice(i,1)
saveCart(cart)
loadCart()
}

function loadProfile(){
let user=getSession()
profileBox.innerHTML=`ชื่อ:${user.username}<br>สิทธิ์:${user.role}`
}

function checkAdmin(){
let user=getSession()
if(!user||user.role!=="admin")location.href="index.html"
}

function verifyAdmin(){
if(admin_secret.value!=="988977"){alert("รหัสผิด");return false}
sessionStorage.setItem("adminVerified","true")
return true
}

function requireAdminVerified(){
if(sessionStorage.getItem("adminVerified")!=="true"){
document.getElementById("adminPanel").style.display="none"
}else{
document.getElementById("adminLoginBox").style.display="none"
}
}

function loadAdminProducts(){
let list=document.getElementById("adminProductList")
if(!list)return
let products=JSON.parse(localStorage.getItem("products"))
list.innerHTML=""
products.forEach(p=>{
list.innerHTML+=`${p.name}-${p.price} <button onclick="deleteProduct(${p.id})">ลบ</button><br>`
})
}

function addProduct(){
let name=newName.value
let price=parseInt(newPrice.value)
if(!name||!price){alert("กรอกให้ครบ");return}
let products=JSON.parse(localStorage.getItem("products"))
products.push({id:Date.now(),name,price})
localStorage.setItem("products",JSON.stringify(products))
loadAdminProducts()
}

function deleteProduct(id){
let products=JSON.parse(localStorage.getItem("products"))
products=products.filter(p=>p.id!==id)
localStorage.setItem("products",JSON.stringify(products))
loadAdminProducts()
}
