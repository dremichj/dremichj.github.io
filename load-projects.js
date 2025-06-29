document.addEventListener('DOMContentLoaded', () => {
    fetch('projects.txt')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load');
        return response.text();
      })
      .then(data => {
        const container = document.getElementById('projects-container');
        const lines = data.split('\n');
  
        let currentTitle = '';
        let currentDesc = '';
  
        lines.forEach(line => {
          line = line.trim();
          if (line.startsWith('T:"') && line.endsWith('"')) {
            currentTitle = line.slice(3, -1);
          } else if (line.startsWith('D:"') && line.endsWith('"')) {
            currentDesc = line.slice(3, -1);
  
            const project = document.createElement('div');
            project.className = 'column-box';
  
            const titleElement = document.createElement('h3');
            titleElement.textContent = currentTitle;
  
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = currentDesc;
  
            project.appendChild(titleElement);
            project.appendChild(descriptionElement);
            container.appendChild(project);
  
            // Reset for next project
            currentTitle = '';
            currentDesc = '';
          }
        });
      })
      .catch(err => console.error('Error loading projects:', err));
  });
  
