let students = [];

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}
function renderTable(){

    tableBody.innerHTML = "";

    let total = 0;

    students.forEach((sv, index)=>{

        total += sv.score;

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("low-score");
        }

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td><butto
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        n class="delete" data-index="${index}">Xóa</button></td>
        `;

        tableBody.appendChild(tr);

    });

    let avg = students.length ? (total/students.length).toFixed(2) : 0;

    stats.innerText = `Tổng sinh viên: ${students.length} | Điểm trung bình: ${avg}`;
}

addBtn.onclick = function(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Dữ liệu không hợp lệ");
        return;
    }

    students.push({
        name: name,
        score: score
    });

    renderTable();

    nameInput.value = "";
    scoreInput.value = "";

    nameInput.focus();
};

tableBody.onclick = function(e){

    if(e.target.classList.contains("delete")){

        let index = e.target.dataset.index;

        students.splice(index,1);

        renderTable();
    }

};

scoreInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addBtn.click();
    }
});