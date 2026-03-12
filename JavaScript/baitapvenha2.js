let step = 1;
const progressBar = document.getElementById("progressBar");

function showStep(){
    const steps = document.querySelectorAll(".step");
    steps.forEach(function(s){
        s.classList.remove("active");});

    document.getElementById("step" + step).classList.add("active");
    progressBar.style.width = (step / 3 * 100) + "%";
}

function nextStep(){
    if (step === 1){
        let name = document.getElementById("fullname").value.trim();
        let birth = document.getElementById("birth").value;
        let gender = document.querySelector('input[name="gender"]:checked');

        if (!name || !birth || !gender){
            alert("Điền đầy đủ thông tin");
            return;}
    }

    if (step === 2){
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        let confirm = document.getElementById("confirm").value;

        if (!email || !pass || pass !== confirm){
            alert("Thông tin tài khoản chưa hợp lệ");
            return;}
    }

    step++;
    if (step === 3){
        let name = document.getElementById("fullname").value;
        let birth = document.getElementById("birth").value;
        let gender = document.querySelector('input[name="gender"]:checked').value;
        let email = document.getElementById("email").value;

        document.getElementById("summary").innerHTML =
            "Họ tên: " + name + "<br>" +
            "Ngày sinh: " + birth + "<br>" +
            "Giới tính: " + gender + "<br>" +
            "Email: " + email;}
    showStep();
}


function prevStep(){
    step--;
    showStep();}
showStep();