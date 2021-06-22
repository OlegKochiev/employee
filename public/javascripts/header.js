function exit() {
    fetch('/auth', {
        method: 'DELETE'
    })
    .then(() => {
        document.location.replace('/auth');
    })
}