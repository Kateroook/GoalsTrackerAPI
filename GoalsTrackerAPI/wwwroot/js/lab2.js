const apiUrl = 'api/Areas';

// Функция для получения списка сфер и отображения их на странице
async function getAreas() {
    const areasList = document.getElementById('areas-list');
    areasList.innerHTML = ''; // Очистка списка перед обновлением

    const areasContainer = document.getElementById('areas-container');
    areasContainer.innerHTML = '';

    try {
        const response = await fetch(apiUrl);
        const areas = await response.json();



        areas.forEach(area => {
            const card = createAreaCard(area);
            areasContainer.appendChild(card);
        });

        areas.forEach(area => {
            const listItem = createAreaListItem(area);
            areasList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching areas:', error);
    }
}
async function addArea() {
    const newAreaName = document.getElementById('new-area-name').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newAreaName })
        });

        if (response.ok) {
            getAreas();
        } else {
            console.error('Failed to add area:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding area:', error);
    }
}
async function deleteArea(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Area deleted successfully.');
        location.reload(); 
    } else {
        alert('Failed to delete area.');
    }
}

async function editArea(areaId, newName) {
    try {
        const response = await fetch(`${apiUrl}/${areaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: areaId, name: newName })
        });

        if (response.ok) {
            getAreas(); 
        } else {
            console.error('Failed to edit area:', response.statusText);
        }
    } catch (error) {
        console.error('Error editing area:', error);
    }
}

async function showGoals(areaId) {
    const goalsListContainer = document.getElementById('goals-list');
    goalsListContainer.innerHTML = ''; // Очистка контейнера перед обновлением

    try {
        const response = await fetch(`api/Goals/GetGoalsInArea/${areaId}`);

        if (response.ok) {
            const areaResponse = await fetch(`api/Areas/${areaId}`);
            const areaData = await areaResponse.json();

            const goals = await response.json();
            const goalsList = document.createElement('ul');

            const header = document.createElement('h3');
            header.textContent = `Goals in the area: ${areaData.name}`;
            goalsListContainer.appendChild(header);

            goals.forEach(goal => {
                const listItem = document.createElement('li');
                listItem.textContent = goal.title;
                goalsList.appendChild(listItem);
            });
            goalsListContainer.appendChild(goalsList);
        } else {
            goalsListContainer.textContent = 'No goals found in the specified area.';
        }
    } catch (error) {
        console.error('Error fetching goals:', error);
    }
}

function createAreaCard(area) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h2');
    title.textContent = area.name;
    card.appendChild(title);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation(); 
        deleteArea(area.id);
    });
    card.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const newName = prompt('Enter new area name:', area.name);
        if (newName) {
            editArea(area.id, newName);
        }
    });
    card.appendChild(editButton);

    card.addEventListener('click', () => showGoals(area.id));

    return card;
}

getAreas();