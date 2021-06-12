document.getElementById("btn_save_TOE").addEventListener('click', () => {
    let typeOfEmploymentList = [];
    const trList = document.querySelectorAll(".tr-container");
    for (let tr of trList) {
        const employmentType = tr.querySelectorAll(".type-of-employment-select")[0].value;
        const time_interval_start = tr.querySelectorAll(".datetime-input-start")[0].value;
        const time_interval_end = tr.querySelectorAll(".datetime-input-end")[0].value;
        if ((employmentType != "" && time_interval_start != "" && time_interval_end != "") || (employmentType == "На лицо" && time_interval_start == "" && time_interval_end == "")) {
            typeOfEmploymentList.push({
                "id": tr.id,
                "employment_type": employmentType,
                "time_interval_start": time_interval_start,
                "time_interval_end": time_interval_end
            });
        } else {
            alert("Заполните все поля!");
            return;
        }
    };
    saveTypeOfEmployment(typeOfEmploymentList);
    alert("Расход успешно сохранен!");
});
function saveTypeOfEmployment(typeOfEmploymentList) {
    fetch('/type_of_employment', {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(typeOfEmploymentList)
    })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
        });
}
function changeSelectTOE(select) {
    const tr = select.parentNode.parentNode;
    if (tr.querySelectorAll(".type-of-employment-select")[0].value == "На лицо") {
        tr.querySelectorAll(".datetime-input-start")[0].setAttribute("disabled", "disabled");
        tr.querySelectorAll(".datetime-input-end")[0].setAttribute("disabled", "disabled");
        tr.querySelectorAll(".datetime-input-start")[0].value = "";
        tr.querySelectorAll(".datetime-input-end")[0].value = "";
    } else {
        tr.querySelectorAll(".datetime-input-start")[0].removeAttribute("disabled");
        tr.querySelectorAll(".datetime-input-end")[0].removeAttribute("disabled");
    }
}
