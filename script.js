// กำหนดรหัสแอดมินตรงนี้
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  } else {
    alert("รหัสไม่ถูกต้อง!");
  }
}

function logout() {
  localStorage.removeItem("admin");
  window.location.href = "index.html";
}

// ป้องกันคนพิมพ์เข้า admin.html ตรง ๆ
if (window.location.pathname.includes("admin.html")) {
  if (localStorage.getItem("admin") !== "true") {
    window.location.href = "index.html";
  }
}
