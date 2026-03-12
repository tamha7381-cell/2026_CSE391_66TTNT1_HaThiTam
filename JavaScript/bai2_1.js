const form = document.getElementById("registerForm");

function showError(id, message) {
    let error = document.getElementById(id + "Error");
    let input = document.getElementById(id);

    error.innerText = message;
    error.style.display = "block";
    if (input) {
        input.classList.add("error-border");}
}

function clearError(id) {
    let error = document.getElementById(id + "Error");
    let input = document.getElementById(id);

    error.style.display = "none";
    if (input) {
        input.classList.remove("error-border");
        input.classList.add("success-border");}
}

function validateFullname() {
    let value = document
        .getElementById("fullname")
        .value
        .trim();

    let regex = /^[a-zA-ZÀ-ỹ\s]+$/;

    if (value === "") {
        showError("fullname", "Không được để trống");
        return false;}
    if (value.length < 3) {
        showError("fullname", "Ít nhất 3 ký tự");
        return false;}
    if (!regex.test(value)) {
        showError("fullname", "Chỉ nhập chữ");
        return false;}

    clearError("fullname");
    return true;
}

function validateEmail() {
    let value = document
        .getElementById("email")
        .value
        .trim();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError("email", "Không được để trống");
        return false;}

    if (!regex.test(value)) {
        showError("email", "Email không hợp lệ");
        return false;}

    clearError("email");
    return true;
}

function validatePhone() {
    let value = document
        .getElementById("phone")
        .value
        .trim();
    let regex = /^0[0-9]{9}$/;

    if (value === "") {
        showError("phone", "Không được để trống");
        return false;}
    if (!regex.test(value)) {
        showError("phone", "SĐT phải 10 số");
        return false;}

    clearError("phone");
    return true;
}

function validatePassword() {
    let value = document
        .getElementById("password")
        .value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (value === "") {
        showError("password", "Không được để trống");
        return false;}
    if (!regex.test(value)) {
        showError("password", "Mật khẩu yếu");
        return false;}

    clearError("password");
    return true;
}

function validateConfirm() {
    let pass = document
        .getElementById("password")
        .value;
    let confirm = document
        .getElementById("confirm")
        .value;

    if (confirm !== pass) {
        showError("confirm", "Mật khẩu không khớp");
        return false;}

    clearError("confirm");
    return true;
}

function validateGender() {
    let gender = document.querySelector('input[name="gender"]:checked');

    if (!gender) {
        let error = document.getElementById("genderError");
        error.innerText = "Chọn giới tính";
        error.style.display = "block";
        return false;}

    document.getElementById("genderError").style.display = "none";
    return true;
}

function validateTerms() {
    let checked = document
        .getElementById("terms")
        .checked;

    if (!checked) {

        let error = document.getElementById("termsError");
        error.innerText = "Phải đồng ý điều khoản";
        error.style.display = "block";
        return false;}

    document.getElementById("termsError").style.display = "none";
    return true;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid =
        validateFullname() &
        validateEmail() &
        validatePhone() &
        validatePassword() &
        validateConfirm() &
        validateGender() &
        validateTerms();

    if(valid) {
        let name = document
            .getElementById("fullname")
            .value;
        form.style.display = "none";

        document.getElementById("successMessage").innerHTML =
            `<p class="success">
                Đăng ký thành công 🎉 <br>
                Xin chào ${name}
            </p>`;}
});

document
    .getElementById("fullname")
    .addEventListener("blur", validateFullname);

document
    .getElementById("email")
    .addEventListener("blur", validateEmail);

document
    .getElementById("phone")
    .addEventListener("blur", validatePhone);

document
    .getElementById("password")
    .addEventListener("blur", validatePassword);

document
    .getElementById("confirm")
    .addEventListener("blur", validateConfirm);

document
    .querySelectorAll("input")
    .forEach(function (input) {
        input.addEventListener("input", function () {
            this.classList.remove("error-border");
        });
});