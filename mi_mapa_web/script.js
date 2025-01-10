// Configuración inicial
const adminPassword = "admin123"; // Contraseña del administrador
const userPasswords = {
  user1: "user1pass",
  user2: "user2pass",
  user3: "user3pass",
}; // Contraseñas de los usuarios

let currentUser = null;
let gridData = Array(25).fill(null); // 5x5 cuadrícula
let userPermissions = {};

// Lógica de inicio de sesión
function login() {
  const password = document.getElementById("password").value;
  if (password === adminPassword) {
    currentUser = "admin";
    showAdminInterface();
  } else if (Object.values(userPasswords).includes(password)) {
    currentUser = Object.keys(userPasswords).find(key => userPasswords[key] === password);
    showUserInterface();
  } else {
    document.getElementById("error-message").innerText = "Contraseña incorrecta";
  }
}

// Mostrar interfaz del administrador
function showAdminInterface() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("admin-container").style.display = "block";
  loadAdminGrid();
}

// Mostrar interfaz de usuario
function showUserInterface() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("user-container").style.display = "block";
  loadUserGrid();
}

// Cargar cuadrícula del administrador
function loadAdminGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  gridData.forEach((color, index) => {
    const cell = document.createElement("div");
    cell.className = "cell admin";
    cell.style.backgroundColor = color || "white";
    cell.onclick = () => {
      const newColor = prompt("Ingresa el color:");
      gridData[index] = newColor;
      loadAdminGrid();
    };
    grid.appendChild(cell);
  });

  // Cargar usuarios en el selector
  const userSelect = document.getElementById("user-select");
  userSelect.innerHTML = Object.keys(userPasswords)
    .map(user => `<option value="${user}">${user}</option>`)
    .join("");
}

// Guardar permisos para usuarios
function savePermissions() {
  const selectedUser = document.getElementById("user-select").value;
  const visibleCells = gridData.map((color, index) => {
    const cell = document.getElementsByClassName("cell")[index];
    return cell.style.backgroundColor !== "white" ? index : null;
  }).filter(index => index !== null);
  userPermissions[selectedUser] = visibleCells;
  alert("Permisos guardados!");
}

// Cargar cuadrícula del usuario
function loadUserGrid() {
  const grid = document.getElementById("grid-user");
  grid.innerHTML = "";
  userPermissions[currentUser].forEach(index => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.backgroundColor = gridData[index];
    grid.appendChild(cell);
  });
}
