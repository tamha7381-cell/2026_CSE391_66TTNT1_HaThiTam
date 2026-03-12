const prices = {
    "Áo": 150000,
    "Quần": 200000,
    "Giày": 300000 };
const form = document.getElementById("orderForm");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const total = document.getElementById("total");

function showError(id, msg) {
    let el = document.getElementById(id + "Error");
    el.innerText = msg;
    el.style.display = "block"; }

function clearError(id) {
    let el = document.getElementById(id + "Error");
    el.style.display = "none"; }

function calcTotal() {
    let p = product.value;
    let q = Number(quantity.value);

    if (prices[p] && q > 0) {
        let money = prices[p] * q;
        total.innerText = money.toLocaleString("vi-VN"); }
    else {
        total.innerText = 0; }
}

product.addEventListener("change", calcTotal);
quantity.addEventListener("input", calcTotal);

const note = document.getElementById("note");
const noteCount = document.getElementById("noteCount");

note.addEventListener("input", function () {
    let len = this.value.length;
    noteCount.innerText = len + " / 200";

    if (len > 200) {
        noteCount.style.color = "red";
        showError("note", "Tối đa 200 ký tự"); }
    else {
        noteCount.style.color = "black";
        clearError("note"); }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    if (product.value === "") {
        showError("product", "Chọn sản phẩm");
        valid = false; }
    else {
        clearError("product"); }

    let q = Number(quantity.value);

    if (q < 1 || q > 99) {
        showError("quantity", "1 - 99");
        valid = false; }
    else {
        clearError("quantity"); }

    let dateValue = document.getElementById("date").value;
    let today = new Date();
        today.setHours(0,0,0,0);
    let max = new Date();
        max.setDate(today.getDate() + 30);
        max.setHours(0,0,0,0);
    let d = new Date(dateValue);

    if (!dateValue) {
        showError("date","Chọn ngày giao");
        valid = false; }
    else if (d < today || d > max) {
        showError("date","Ngày giao phải trong 30 ngày tới");
        valid = false; }
    else {
        clearError("date"); }

    let addr = document.getElementById("address").value.trim();

    if (addr.length < 10) {
        showError("address", "≥ 10 ký tự");
        valid = false; }
    else {
        clearError("address"); }

    let pay = document.querySelector('input[name="pay"]:checked');

    if (!pay) {
        showError("pay", "Chọn phương thức");
        valid = false; }
    else {
        clearError("pay"); }

    if (!valid) { return; }

    let summary = document.getElementById("summary");

    summary.innerHTML = `
        <h3>Xác nhận đơn hàng</h3>
        Sản phẩm: ${product.value} <br>
        Số lượng: ${quantity.value} <br>
        Tổng tiền: ${total.innerText} VND <br>
        Ngày giao: ${document.getElementById("date").value}
        <br><br>
        <button onclick="confirmOrder()">Xác nhận</button>
        <button onclick="cancelOrder()">Hủy</button>
    `;
    summary.style.display = "block";
});

function confirmOrder() {
    document.getElementById("summary").innerHTML =
        "<h3>Đặt hàng thành công 🎉</h3>"; }

function cancelOrder() {
    document.getElementById("summary").style.display = "none"; }