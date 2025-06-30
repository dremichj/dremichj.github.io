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
        let currentSkills=[];
        let currentLink;
  
        lines.forEach(line => {
          line = line.trim();
          // Gets the title and description
          if (line.startsWith('T:"') && line.endsWith('"')) {
            currentTitle = line.slice(3, -1);
          } if (line.startsWith('D:"') && line.endsWith('"')) {
            currentDesc = line.slice(3, -1);
          } if (line.startsWith('S:')){
            const skills = line.slice(2).trim();
            currentSkills = skills.split(/\s+/);
          } else if (line.startsWith('L:')){
            currentLink = line.slice(2).trim();
          }

          if (currentTitle && currentDesc && currentSkills.length >0){
            const project = document.createElement('div');
            project.className = 'column-box';
  
            const titleElement = document.createElement('h3');
            titleElement.textContent = currentTitle;
  
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = currentDesc;
  
            const contentWrapper = document.createElement('div');
            contentWrapper.className='project-content';

            contentWrapper.appendChild(titleElement);
            contentWrapper.appendChild(descriptionElement);
            project.appendChild(contentWrapper)

            const skillContainer = document.createElement('div');
            skillContainer.className = 'skill-container';

            currentSkills.forEach(skill=> {
              const skillBox = document.createElement('div');
              skillBox.className = 'skillbox';
              skillBox.textContent=skill;
              skillContainer.appendChild(skillBox);
            });

            const linkBtn = document.createElement('a');
            linkBtn.className='project-link';
            linkBtn.href = currentLink;

            const img = document.createElement('img');
            img.src='github-mark-white.png';
            img.className = 'github-link-logo';
            linkBtn.appendChild(img);

            skillContainer.appendChild(linkBtn);


            project.appendChild(skillContainer);


            container.prepend(project);
            // Reset for next project
            currentTitle = '';
            currentDesc = '';
            currentSkills=[];
            currentLink='';
          }
          
        });
      })
      .catch(err => console.error('Error loading projects:', err));
  });
  
