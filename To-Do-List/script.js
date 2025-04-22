// Lấy các phần tử DOM để thao tác
const taskInput = document.getElementById('taskInput'); // Ô nhập liệu
const taskList = document.getElementById('taskList'); // Vùng hiển thị danh sách công việc

// Tải danh sách công việc từ localStorage khi trang được tải
// Nếu không có dữ liệu, khởi tạo mảng rỗng
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Hàm hiển thị danh sách công việc lên giao diện
function renderTasks() {
    // Xóa nội dung hiện tại của taskList để cập nhật lại
    taskList.innerHTML = '';
    
    // Duyệt qua từng công việc trong mảng tasks
    tasks.forEach((task, index) => {
        // Tạo div chứa một công việc
        const taskItem = document.createElement('div');
        // Thêm class 'task-item', nếu công việc hoàn thành thì thêm class 'completed'
        taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
        
        // Tạo phần tử span để hiển thị nội dung công việc
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        
        // Tạo div chứa các nút điều khiển (hoàn thành, sửa, xóa)
        const buttonsContainer = document.createElement('div');
        
        // Tạo nút hoàn thành/hoàn tác
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Hoàn tác' : 'Hoàn thành';
        // Gắn sự kiện onclick để thay đổi trạng thái hoàn thành
        completeBtn.onclick = () => toggleComplete(index);
        
        // Tạo nút sửa
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Sửa';
        editBtn.className = 'edit-btn'; // Thêm class để định dạng riêng
        // Gắn sự kiện onclick để sửa nội dung công việc
        editBtn.onclick = () => editTask(index);
        
        // Tạo nút xóa
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        // Gắn sự kiện onclick để xóa công việc
        deleteBtn.onclick = () => deleteTask(index);
        
        // Thêm các nút vào container
        buttonsContainer.append(completeBtn, editBtn, deleteBtn);
        // Thêm nội dung công việc và container nút vào taskItem
        taskItem.append(taskText, buttonsContainer);
        // Thêm taskItem vào danh sách công việc
        taskList.appendChild(taskItem);
    });
}

// Hàm thêm công việc mới
function addTask() {
    // Lấy nội dung từ ô nhập liệu, loại bỏ khoảng trắng thừa
    const taskText = taskInput.value.trim();
    // Kiểm tra nếu nội dung rỗng thì cảnh báo
    if (taskText === '') {
        alert('Vui lòng nhập công việc!');
        return;
    }
    // Thêm công việc mới vào mảng tasks
    tasks.push({ text: taskText, completed: false });
    // Xóa nội dung ô nhập liệu
    taskInput.value = '';
    // Lưu danh sách vào localStorage
    saveTasks();
    // Cập nhật giao diện
    renderTasks();
}

// Hàm sửa công việc
function editTask(index) {
    // Hiển thị hộp thoại để người dùng nhập nội dung mới
    const newText = prompt('Sửa công việc:', tasks[index].text);
    // Kiểm tra nếu nội dung mới hợp lệ (không rỗng và không bị hủy)
    if (newText !== null && newText.trim() !== '') {
        // Cập nhật nội dung công việc
        tasks[index].text = newText.trim();
        // Lưu danh sách vào localStorage
        saveTasks();
        // Cập nhật giao diện
        renderTasks();
    }
}

// Hàm thay đổi trạng thái hoàn thành/chưa hoàn thành
function toggleComplete(index) {
    // Đảo ngược trạng thái completed của công việc
    tasks[index].completed = !tasks[index].completed;
    // Lưu danh sách vào localStorage
    saveTasks();
    // Cập nhật giao diện
    renderTasks();
}

// Hàm xóa công việc
function deleteTask(index) {
    // Xác nhận trước khi xóa
    if (confirm('Bạn có chắc muốn xóa công việc này?')) {
        // Xóa công việc khỏi mảng tasks
        tasks.splice(index, 1);
        // Lưu danh sách vào localStorage
        saveTasks();
        // Cập nhật giao diện
        renderTasks();
    }
}

// Hàm lưu danh sách công việc vào localStorage
function saveTasks() {
    // Chuyển mảng tasks thành chuỗi JSON và lưu
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Xử lý sự kiện nhấn phím Enter trong ô nhập liệu
taskInput.addEventListener('keypress', (e) => {
    // Nếu phím nhấn là Enter, gọi hàm addTask
    if (e.key === 'Enter') {
        addTask();
    }
});

// Hiển thị danh sách công việc khi trang được tải
renderTasks();