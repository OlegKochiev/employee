function setDatetime(checkboxInput) {
    const tr = checkboxInput.parentNode.parentNode.parentNode;
    let timeInput = checkboxInput.previousElementSibling;
    if (checkboxInput.checked) {
        const currentTime = new Date();
        timeInput.value = currentTime.toLocaleTimeString();
        let employeeData = {
            "id": tr.id,
            "gatherTime": timeInput.value
        }
        saveGatherInfo(employeeData);
    } else {
        timeInput.value = "";
    }
}
function saveGatherInfo(employeeData) {
    fetch('/gather', {
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
        });
}
function printGather() {
    window.print();
} 
function clearGatherTime() {
    if (confirm("Вы действительно хочтите очистить время прибытия лиц?")) {
        fetch('/gather', {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                document.location.href = '/gather';
            });
    }
}