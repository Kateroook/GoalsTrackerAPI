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

// Функция для добавления новой сферы
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
            getAreas(); // Обновляем список сфер после добавления новой
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
        location.reload(); // Refresh the page to update areas list
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
            getAreas(); // Обновляем список сфер после редактирования
        } else {
            console.error('Failed to edit area:', response.statusText);
        }
    } catch (error) {
        console.error('Error editing area:', error);
    }
}

// Функция для отображения целей в определенной сфере
async function showGoals(areaId) {
    const goalsListContainer = document.getElementById('goals-list');
    goalsListContainer.innerHTML = ''; // Очистка контейнера перед обновлением

    try {
        const response = await fetch(`api/Goals/GetGoalsInArea/${areaId}`);
        const goals = await response.json();

        if (goals.length === 0) {
            goalsListContainer.textContent = 'No goals found in the specified area.';
        } else {
            const goalsList = document.createElement('ul');
            goals.forEach(goal => {
                const listItem = document.createElement('li');
                listItem.textContent = goal.title;
                goalsList.appendChild(listItem);
            });
            goalsListContainer.appendChild(goalsList);
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
        event.stopPropagation(); // Предотвращаем всплытие события, чтобы не вызвать showGoals()
        deleteArea(area.id);
    });
    card.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Предотвращаем всплытие события, чтобы не вызвать showGoals()
        const newName = prompt('Enter new area name:', area.name);
        if (newName) {
            editArea(area.id, newName);
        }
    });
    card.appendChild(editButton);

    card.addEventListener('click', () => showGoals(area.id));

    return card;
}


function createAreaListItem(area) {
    const listItem = document.createElement('li');
    listItem.textContent = area.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Предотвращаем всплытие события, чтобы не вызвать showGoals()
        deleteArea(area.id);
    });
    listItem.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Предотвращаем всплытие события, чтобы не вызвать showGoals()
        const newName = prompt('Enter new area name:', area.name);
        if (newName) {
            editArea(area.id, newName);
        }
    });
    listItem.appendChild(editButton);

    listItem.addEventListener('click', () => showGoals(area.id));

    return listItem;
}

// Вызываем функцию для получения списка сфер при загрузке страницы
getAreas();
