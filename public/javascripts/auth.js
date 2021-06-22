function getCookies() {
    fetch('/auth', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        })
    })
        .then((res) => {
            return res.json()
        })
        .then((authData) => {
            document.cookie = "authorization=" + JSON.stringify(authData);
            window.location = '/';
        })
}