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
  
            // Create a new card
            const project = document.createElement('div');
            project.className = 'column-box';
  
            const titleEl = document.createElement('h3');
            titleEl.textContent = currentTitle;
  
            const descEl = document.createElement('p');
            descEl.textContent = currentDesc;
  
            project.appendChild(titleEl);
            project.appendChild(descEl);
            container.appendChild(project);
  
            // Reset for next card
            currentTitle = '';
            currentDesc = '';
          }
        });
      })
      .catch(err => console.error('Error loading projects:', err));
  });
  