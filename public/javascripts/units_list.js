function addNewUnit(btnAdd) {
    const unitName = btnAdd.previousElementSibling.value;
    if (unitName != "")
        addNewUnitInDB(unitName);
    else
        alert("Заполните поле!");
        btnAdd.previousElementSibling.value = "";
}
function addNewUnitInDB(unitName) {
    fetch('/units_list', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "unitName": unitName
        })
    })
        .then((res) => {
            return res.json();
        })
        .then((unitID) => {
            console.log(unitID);
            addNewUnitInDOM(unitID, unitName);
        });
}
function addNewUnitInDOM(unitID, unitName) {
    let tr = document.querySelector(".tr-container").cloneNode(true);
    tr.id = unitID;
    tr.querySelector(".td-id").innerHTML = document.getElementById("mainTable").getElementsByClassName("td-id").length + 1;
    tr.querySelector(".td-name").innerHTML = unitName;
    document.querySelector("tbody").appendChild(tr);

}
function deleteUnit(btnDelete) {
    let id = btnDelete.parentNode.parentNode.id;
    fetch('/units_list', {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "id": id
        })
    })
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            if (result) {
                let tr = document.getElementById(id);
                tr.remove();
            }
        });
}