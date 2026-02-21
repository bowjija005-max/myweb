// ===== สมัครสมาชิก =====
function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if(user === "" || pass === ""){
    alert("กรอกข้อมูลให้ครบ");
    return;
  }

  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  alert("สมัครสำเร็จ");
  window.location.href = "login.html";
}

// ===== ล็อกอิน =====
function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  // ===== ADMIN =====
  if(user === "admin" && pass === "1234"){
    localStorage.setItem("role", "admin");
    alert("เข้าสู่ระบบ Admin สำเร็จ");
    window.location.href = "admin.html";
    return;
  }

  let savedUser = localStorage.getItem("username");
  let savedPass = localStorage.getItem("password");

  if(user === savedUser && pass === savedPass){
    localStorage.setItem("role", "user");
    alert("เข้าสู่ระบบสำเร็จ");
    window.location.href = "index.html";
  } else {
    alert("ข้อมูลไม่ถูกต้อง");
  }
}

// ===== เช็คสิทธิ์หน้า Admin =====
function checkAdmin(){
  let role = localStorage.getItem("role");

  if(role !== "admin"){
    alert("คุณไม่มีสิทธิ์เข้า Admin");
    window.location.href = "login.html";
  }
}

// ===== ออกจากระบบ =====
function logout(){
  localStorage.removeItem("role");
  window.location.href = "login.html";
}
