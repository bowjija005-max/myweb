function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "12345") {
    localStorage.setItem("admin", "true");
    window.location.href = "admin.html";
  } else {
    alert("รหัสไม่ถูกต้อง");
  }
}

function logout() {
  localStorage.removeItem("admin");
  window.location.href = "index.html";
}

if (window.location.pathname.includes("admin.html")) {
  if (localStorage.getItem("admin") !== "true") {
    window.location.href = "index.html";
  }
}
