document.getElementById('btn-add').addEventListener('click', () => {
    clearModalWindowValues();
    document.getElementById('popup').classList.add('popup-open');
});
document.getElementById('btn-save').addEventListener('click', () => {
    if (saveEmployee()) {
        clearModalWindowValues();
        document.getElementById('popup').classList.remove('popup-open');
    } else {
        alert("Заполните все поля!");
    }
});
document.getElementById('btn-cancel').addEventListener('click', () => {
    clearModalWindowValues();
    document.getElementById('popup').classList.remove('popup-open');
});
function clearModalWindowValues() {
    document.getElementById('popupFio').value = "";
    document.getElementById('popupPost').value = "";
    document.getElementById('popupRank').value = "";
    document.getElementById('popupUnit').value = "";
    document.getElementById('popupHidden').value = "";
}
function btnEditFunction(btnEdit) {
    const tr = btnEdit.parentNode.parentNode;
    document.getElementById('popupFio').value = tr.getElementsByClassName("td-name")[0].innerText;
    document.getElementById('popupPost').value = tr.getElementsByClassName("td-post")[0].innerText;
    document.getElementById('popupRank').value = tr.getElementsByClassName("td-rank")[0].innerText;
    document.getElementById('popupUnit').value = tr.getElementsByClassName("td-unit")[0].innerText;
    document.getElementById('popupHidden').value = tr.id;
    document.getElementById('popup').classList.add('popup-open');
}
function btnDeleteFunction(btnDelete) {
    const tr = btnDelete.parentNode.parentNode;
    if (confirm('Вы действительно хотите удалить пользователя: ' + tr.getElementsByClassName("td-name")[0].innerText + '?')) {
        delEmployee(tr.id);
        tr.remove();
    } else {
        return true;
    }
}
function saveEmployee() {
    const popupHiddenValue = document.getElementById('popupHidden').value;
    let employeeData = [
        document.getElementById('popupFio').value,
        document.getElementById('popupPost').value,
        document.getElementById('popupRank').value,
        document.getElementById('popupUnit').value
    ];
    for (key in employeeData) {
        if (employeeData[key] == "" || employeeData[key] == "default")
            return false;
    }
    if (popupHiddenValue != "") {
        employeeData.unshift(popupHiddenValue);
        saveEmployeePUT(employeeData); 
    } else {
        saveEmployeePOST(employeeData);
    };
    return true;
}
function saveEmployeePOST(employeeData) {
    fetch('/list_employees', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(employeeData)
    })
        .then((res) => {
            return res.json();
        })
        .then((id) => {
            if (id) 
                addEmployeeInDOM(employeeData, id);
        });
}
function saveEmployeePUT(employeeData) {
    fetch('/list_employees', {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(employeeData)
    })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            if (result)
                updateEmployeeInDOM(employeeData);
        });
}
function delEmployee(id) {
    fetch('/list_employees', {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ "id": id })
    })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
        
        });
}
function addEmployeeInDOM(employeeData, id) {
    let tr = document.querySelector(".tr-container").cloneNode(true);
    tr.id = id;
    tr.querySelector(".td-id").innerHTML = document.getElementById("mainTable").getElementsByClassName("td-id").length + 1;
    tr.querySelector(".td-name").innerHTML = employeeData[0];
    tr.querySelector(".td-post").innerHTML = employeeData[1];
    tr.querySelector(".td-rank").innerHTML = employeeData[2];
    tr.querySelector(".td-unit").innerHTML = employeeData[3];
    document.querySelector("tbody").appendChild(tr);
}
function updateEmployeeInDOM(employeeData) {
    let tr = document.getElementById(employeeData[0]);
    tr.querySelector(".td-name").innerHTML = employeeData[1];
    tr.querySelector(".td-post").innerHTML = employeeData[2];
    tr.querySelector(".td-rank").innerHTML = employeeData[3];
    tr.querySelector(".td-unit").innerHTML = employeeData[4];
}


