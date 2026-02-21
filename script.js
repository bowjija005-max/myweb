function encode(data){
  return btoa(JSON.stringify(data));
}

function decode(data){
  return JSON.parse(atob(data));
}

function getUsers(){
  let data = localStorage.getItem("users");
  return data ? decode(data) : [];
}

function saveUsers(users){
  localStorage.setItem("users", encode(users));
}

function register(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if(password.length <= 5){
    alert("รหัสต้องมากกว่า 5 ตัว");
    return;
  }

  let users = getUsers();
  if(users.find(u=>u.username===username)){
    alert("ชื่อซ้ำ");
    return;
  }

  users.push({username,password});
  saveUsers(users);
  alert("สมัครสำเร็จ");
  location.href="login.html";
}

function login(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let users = getUsers();
  let user = users.find(u=>u.username===username && u.password===password);

  if(user){
    localStorage.setItem("login", encode(user));
    location.href="index.html";
  }else{
    alert("ข้อมูลผิด");
  }
}

function checkLogin(){
  if(!localStorage.getItem("login")){
    location.href="login.html";
  }
}

function logout(){
  localStorage.removeItem("login");
  location.href="login.html";
}

function getCurrentUser(){
  let data = localStorage.getItem("login");
  return data ? decode(data) : null;
}

function addToCart(name,price){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("เพิ่มลงตะกร้าแล้ว");
}

function loadCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let list = document.getElementById("cartList");
  let total = 0;
  list.innerHTML="";

  cart.forEach((item,i)=>{
    total += item.price;
    list.innerHTML += `<p>${item.name} - ${item.price} บาท</p>`;
  });

  document.getElementById("total").innerText = total;
}

function clearCart(){
  localStorage.removeItem("cart");
  loadCart();
          }
