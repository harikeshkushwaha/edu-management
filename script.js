// Navigation section toggle
function showSection(section) {
    document.getElementById('home').style.display = (section === 'home') ? 'block' : 'none';
    document.getElementById('students').style.display = (section === 'students') ? 'block' : 'none';
    document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
    if (section === 'home') {
        document.querySelectorAll('nav ul li a')[0].classList.add('active');
    } else {
        document.querySelectorAll('nav ul li a')[1].classList.add('active');
    }
}

// Student management logic
let students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', email: 'bob@example.com' }
];
let editMode = false;

function renderTable(data = students) {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = '';
    data.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.ID}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.email}</td>
            <td class="actions">
                <button class="edit" onclick="editStudent(${student.ID})">Edit</button>
                <button class="delete" onclick="deleteStudent(${student.ID})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').value = '';
    document.getElementById('submitBtn').textContent = 'Add Student';
    editMode = false;
}

document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const idInput = document.getElementById('studentId').value;
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const grade = document.getElementById('grade').value.trim();
    const email = document.getElementById('email').value.trim();

    if (editMode && idInput) {
        const idx = students.findIndex(s => s.ID == idInput);
        students[idx] = { ID: Number(idInput), name, age, grade, email };
    } else {
        const newId = students.length ? Math.max(...students.map(s => s.ID)) + 1 : 1;
        students.push({ ID: newId, name, age, grade, email });
    }
    resetForm();
    renderTable();
});

window.editStudent = function(id) {
    const student = students.find(s => s.ID === id);
    document.getElementById('studentId').value = student.ID;
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.getElementById('email').value = student.email;
    document.getElementById('submitBtn').textContent = 'Edit Student';
    editMode = true;
};

window.deleteStudent = function(id) {
    students = students.filter(s => s.ID !== id);
    renderTable();
    resetForm();
};

document.getElementById('searchBox').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.grade.toLowerCase().includes(query)
    );
    renderTable(filtered);
});

// Initial render
renderTable();
showSection('home');
