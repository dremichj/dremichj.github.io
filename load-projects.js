fetch('projects.txt')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    document.getElementById('projects-text').textContent = data;
  })
  .catch(error => {
    console.error('Error fetching the text file:', error);
  });