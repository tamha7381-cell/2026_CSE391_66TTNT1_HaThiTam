const fullname = document.getElementById("fullname");
const nameCount = document.getElementById("nameCount");

fullname.addEventListener("input", function () {
    let len = this.value.length;
    nameCount.innerText = len + " / 50";
});

const password = document.getElementById("password");
const strength = document.getElementById("strengthLevel");

password.addEventListener("input", function () {
    let value = this.value;
    let score = 0;

    if (value.length >= 8) {
        score++; }

    if (/[A-Z]/.test(value)) {
        score++; }

    if (/[0-9]/.test(value)) {
        score++; }

    if (/[a-z]/.test(value)) {
        score++; }

    if (score <= 1) {
        strength.style.width = "33%";
        strength.style.background = "red"; }

    else if (score <= 3) {
        strength.style.width = "66%";
        strength.style.background = "orange"; }

    else {
        strength.style.width = "100%";
        strength.style.background = "green"; }
});

const toggle = document.getElementById("togglePass");
toggle.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text"; }

    else {
        password.type = "password"; }
});

const form = document.getElementById("registerForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = fullname.value.trim();
    if (name.length < 3) {
        alert("Tên phải ≥ 3 ký tự");
        return; }

    document.getElementById("success").innerText =
        "Đăng ký thành công 🎉 " + name;
    form.style.display = "none";
});