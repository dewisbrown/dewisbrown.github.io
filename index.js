document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', function(e) {
        let isMove = false;
        const onMouseMove = (e) => {
            if (!isMove) return;
            win.style.left = `${e.clientX - win.offsetWidth / 2}px`;
            win.style.top = `${e.clientY - win.querySelector('.window-menubar').offsetWidth / 2}px`;
        };
        const onMouseUp = () => {
            isMove = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        if (e.target === win.querySelector('.window-menubar')) {
            isMove = true;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    });
});

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'block';
    const taskbarEntry = document.getElementById(`taskbar-${id}`);
    if (taskbarEntry) taskbarEntry.remove();
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
    const taskbarEntry = document.getElementById(`taskbar-${id}`);
    if (taskbarEntry) taskbarEntry.remove();
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
    const taskbarWindows = document.getElementById('taskbar-windows');
    let taskbarEntry = document.getElementById(`taskbar-${id}`);
    if (!taskbarEntry) {
        taskbarEntry = document.createElement('div');
        taskbarEntry.id = `taskbar${id}`;
        taskbarEntry.className = 'taskbar-window';
        taskbarEntry.innerText = id;
        taskbarEntry.onclick = () => openWindow(id);
        taskbarWindows.appendChild(taskbarEntry);
    }
}