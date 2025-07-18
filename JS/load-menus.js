document.addEventListener('DOMContentLoaded', () => {
    fetch('../header.html')
    .then(res =>res.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error loading header:',err));
});