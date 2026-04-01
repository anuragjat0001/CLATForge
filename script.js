document.addEventListener('DOMContentLoaded', () => {
    // Tab System
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Toggle System (Study Hours)
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const toggleContents = document.querySelectorAll('.toggle-content');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-toggle');
            
            toggleBtns.forEach(b => b.classList.remove('active'));
            toggleContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Accordion System
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });

    // Mock Tracker Logic
    const mockForm = document.getElementById('mock-form');
    const mockTableBody = document.getElementById('mock-table-body');

    if (mockForm && mockTableBody) {
        // Load existing mocks
        const loadMocks = () => {
            const mocks = JSON.parse(localStorage.getItem('clat_mocks') || '[]');
            mockTableBody.innerHTML = '';
            mocks.forEach((mock, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${mock.date}</td>
                    <td>${mock.name}</td>
                    <td>${mock.score}</td>
                    <td>${mock.accuracy}%</td>
                    <td><button onclick="deleteMock(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer;">Delete</button></td>
                `;
                mockTableBody.appendChild(row);
            });
        };

        mockForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = document.getElementById('mock-date').value;
            const name = document.getElementById('mock-name').value;
            const score = document.getElementById('mock-score').value;
            const accuracy = document.getElementById('mock-accuracy').value;

            if (date && name && score && accuracy) {
                const mocks = JSON.parse(localStorage.getItem('clat_mocks') || '[]');
                mocks.push({ date, name, score, accuracy });
                localStorage.setItem('clat_mocks', JSON.stringify(mocks));
                mockForm.reset();
                loadMocks();
            }
        });

        window.deleteMock = (index) => {
            const mocks = JSON.parse(localStorage.getItem('clat_mocks') || '[]');
            mocks.splice(index, 1);
            localStorage.setItem('clat_mocks', JSON.stringify(mocks));
            loadMocks();
        };

        loadMocks();
    }
});
