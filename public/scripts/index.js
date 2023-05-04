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
