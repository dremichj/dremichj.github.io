fetch('projects.txt')
    .then(response=>{
        if(!response.ok){
            throw new Error('Network response not ok');
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('projects-textx').textContent = data;
    })
    .catch(error =>{
        console.error('Error fetching the text file:',error);
    });