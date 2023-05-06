const togglePassVisibility = document.querySelectorAll(".toggle-pass-visible");

togglePassVisibility.forEach((btn) => {
  const passInput = btn.previousElementSibling;
  btn.addEventListener("click", () => {
    // toggle text/password type
    passInput.type = passInput.type === "password" ? "text" : "password";
    // change icon to eye/eye-slash
    const icon = btn.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
});

const openUserDropdown = document.getElementById("open-user-dropdown");
const userDropdown = document.getElementById("user-dropdown");

// will only not be null when user is logged in
if (openUserDropdown) {
  openUserDropdown.addEventListener("click", () => {
    userDropdown.classList.toggle("hidden");
  });
}
