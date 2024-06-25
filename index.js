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
    const taskbarWindows = document.getElementById('taskbar-windows');
    let taskbarEntry = document.querySelector(`#taskbar-windows #taskbar-${id}`);
    
    // Create taskbar entry and add to taskbar-windows
    if (!taskbarEntry) {
        taskbarEntry = document.createElement('div');
        taskbarEntry.id = `taskbar-${id}`;
        taskbarEntry.className = 'taskbar-window';
        taskbarEntry.innerText = id;
        taskbarEntry.onclick = () => openWindow(id);
        taskbarWindows.appendChild(taskbarEntry);
    }

    const taskbarRect = taskbarEntry.getBoundingClientRect();
    const winRect = win.getBoundingClientRect();

    // Calculate translation values
    const translateX = taskbarRect.left - winRect.left;
    const translateY = taskbarRect.top - winRect.top;

    win.style.display = 'block';
    win.style.transform = `translate(${translateX}px, ${translateY}px)`;
    win.style.transition = 'transform 0.2s ease';

    requestAnimationFrame(() => {
        win.style.transform = 'translate(0, 0)';
    });

    win.addEventListener('transitioned', () => {
        win.style.transform = 'none';
        win.style.transition = 'none';
        taskbarEntry.classList.add('active');
    }, { once: true });
}

function closeWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'none';
    win.style.top = '50%';
    win.style.left = '50%';
    const taskbarEntry = document.querySelector(`#taskbar-windows #taskbar-${id}`);
    if (taskbarEntry) taskbarEntry.remove();
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    const taskbarEntry = document.querySelector(`#taskbar-windows #taskbar-${id}`);
    const winRect = win.getBoundingClientRect();
    const taskbarRect = taskbarEntry.getBoundingClientRect();

    // Calculate translation values
    const translateX = taskbarRect.left - winRect.left
    const translateY = taskbarRect.top - winRect.top;

    win.style.transition = 'transform 0.2s ease';
    win.style.transform = `translate(${translateX}px, ${translateY}px)`;

    win.addEventListener('transitionend', () => {
        win.style.transform = 'none';
        win.style.transition = 'none';
        win.style.display = 'none';
        taskbarEntry.classList.remove('active');
    }, { once: true });
}