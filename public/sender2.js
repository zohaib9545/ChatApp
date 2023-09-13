const socket = io();

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');

// Function to add a message to the chat
function addMessage(message, isUser) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const messageContent = document.createElement('div');

    // Create a timestamp
    const timestamp = new Date().toLocaleTimeString();

    span.textContent = timestamp; // Display the timestamp
    messageContent.textContent = message;

    li.appendChild(span); // Append the timestamp to the list item
    li.appendChild(messageContent);

    // Add a class or attribute to distinguish user-sent messages
    if (isUser) {
        li.classList.add('user-message'); // Add a CSS class for user-sent messages
        li.setAttribute('data-sender', 'user'); // Add a data attribute to mark user-sent messages
    } else {
        li.classList.add('received-message'); // Add a CSS class for received messages
        li.setAttribute('data-sender', 'other'); // Add a data attribute to mark received messages
    }

    messages.appendChild(li);
}

// Handle incoming messages from the server
socket.on('message', (message) => {
    addMessage(message, false);
});

// Handle form submission to send messages
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message) {
        // Send the message to the server
        socket.emit('message', message);
        addMessage(message, true);
        messageInput.value = '';
    }
});
