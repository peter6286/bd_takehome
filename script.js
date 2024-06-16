// script.js
document.addEventListener('DOMContentLoaded', () => {
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const addNoteButton = document.getElementById('add-note');
    const noteList = document.getElementById('note-list');
    const searchInput = document.getElementById('search-input');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const renderNotes = (filter = '') => {
        noteList.innerHTML = '';
        notes.filter(note => note.title.includes(filter) || note.content.includes(filter))
            .forEach((note, index) => {
                const noteItem = document.createElement('div');
                noteItem.classList.add('note-item');
                noteItem.setAttribute('draggable', true);
                noteItem.setAttribute('data-index', index);

                const noteTitleElement = document.createElement('h2');
                noteTitleElement.textContent = note.title;

                const noteContentElement = document.createElement('p');
                noteContentElement.textContent = note.content;

                const editButton = document.createElement('button');
                editButton.textContent = '编辑';
                editButton.classList.add('edit-button');
                editButton.addEventListener('click', () => {
                    editNote(index);
                });

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '删除';
                deleteButton.addEventListener('click', () => {
                    deleteNote(index);
                });

                const dragHandle = document.createElement('span');
                dragHandle.classList.add('drag-handle');
                dragHandle.innerHTML = '⠿'; // You can use any drag icon

                noteItem.appendChild(noteTitleElement);
                noteItem.appendChild(noteContentElement);
                noteItem.appendChild(editButton);
                noteItem.appendChild(deleteButton);
                noteItem.appendChild(dragHandle);

                noteList.appendChild(noteItem);

                noteItem.addEventListener('dragstart', handleDragStart);
                noteItem.addEventListener('dragover', handleDragOver);
                noteItem.addEventListener('drop', handleDrop);
                noteItem.addEventListener('dragend', handleDragEnd);
            });
    };

    const addNote = () => {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        if (title && content) {
            notes.push({ title, content });
            localStorage.setItem('notes', JSON.stringify(notes));
            noteTitle.value = '';
            noteContent.value = '';
            renderNotes();
        }
    };

    const deleteNote = (index) => {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    const editNote = (index) => {
        const note = notes[index];
        noteTitle.value = note.title;
        noteContent.value = note.content;
        deleteNote(index);
    };

    let draggedItem = null;

    const handleDragStart = (e) => {
        draggedItem = e.target;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
    };

    const handleDragOver = (e) => {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    };

    const handleDrop = (e) => {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (draggedItem != e.target) {
            const fromIndex = draggedItem.getAttribute('data-index');
            const toIndex = e.target.closest('.note-item').getAttribute('data-index');
            [notes[fromIndex], notes[toIndex]] = [notes[toIndex], notes[fromIndex]];
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
        return false;
    };

    const handleDragEnd = () => {
        draggedItem = null;
    };

    searchInput.addEventListener('input', () => {
        renderNotes(searchInput.value.trim());
    });

    addNoteButton.addEventListener('click', addNote);

    renderNotes();
});
