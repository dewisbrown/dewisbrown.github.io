document.querySelectorAll('.window').forEach(win => {
    let offsetX, offsetY;
    
    win.addEventListener('mousedown', function(e) {
        if (e.target === win.querySelector('.window-menubar')) {
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });

    const onMouseMove = (e) => {
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = (e) => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
});

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    const taskbarWindows = document.getElementById('taskbar-windows');
    let taskbarEntry = document.getElementById(`taskbar-${id}`);
    if (!taskbarEntry) {
        taskbarEntry = document.createElement('div');
        taskbarEntry.id = `taskbar-${id}`;
        taskbarEntry.className = 'taskbar-window';
        taskbarEntry.innerText = id;
        taskbarEntry.onclick = () => openWindow(id);
        taskbarWindows.appendChild(taskbarEntry);
    }
    taskbarEntry.classList.add('active');
}

function closeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
    const taskbarEntry = document.querySelector(`#taskbar-windows #taskbar-${id}`);
    if (taskbarEntry) taskbarEntry.remove();
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
    const taskbarEntry = document.querySelector(`#taskbar-windows #taskbar-${id}`)
    if (taskbarEntry) taskbarEntry.classList.remove('active');
}