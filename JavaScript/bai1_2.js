let students = [];
let filteredStudents = [];
let sortAsc = true;

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");
const searchInput = document.getElementById("search");
const rankFilter = document.getElementById("rankFilter");
const sortScore = document.getElementById("sortScore");

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";}

function applyFilters(){
    let keyword = searchInput.value.toLowerCase();
    let rank = rankFilter.value;

    filteredStudents = students.filter(sv => {
        let matchName = sv.name.toLowerCase().includes(keyword);
        let matchRank = rank === "all" || getRank(sv.score) === rank;
        return matchName && matchRank;});

    filteredStudents.sort((a,b)=>{
        return sortAsc ? a.score - b.score : b.score - a.score;});

    renderTable();}

function renderTable(){
    tableBody.innerHTML = "";
    if(filteredStudents.length === 0){
        tableBody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`;
        return;}

    let total = 0;

    filteredStudents.forEach((sv,index)=>{
        total += sv.score;
        let tr = document.createElement("tr");
        if(sv.score < 5){
            tr.classList.add("low-score");}

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td><button class="delete" data-name="${sv.name}">Xóa</button></td`;

        tableBody.appendChild(tr);});

    let avg = (total/filteredStudents.length).toFixed(2);

    stats.innerText = `Hiển thị ${filteredStudents.length} sinh viên | Điểm TB: ${avg}`;
}

addBtn.onclick = function(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);
    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Dữ liệu không hợp lệ");
        return}

    students.push({name,score});

    nameInput.value = "";
    scoreInput.value = "";

    applyFilters();}

searchInput.addEventListener("input", applyFilters);
rankFilter.addEventListener("change", applyFilters);
sortScore.onclick = function(){
    sortAsc = !sortAsc;

    sortScore.innerText = sortAsc ? "Điểm ▲" : "Điểm ▼";

    applyFilters();}

tableBody.onclick = function(e){
    if(e.target.classList.contains("delete")){

        let name = e.target.dataset.name;

        students = students.filter(sv => sv.name !== name);

        applyFilters();}
};