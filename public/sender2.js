const socket = io();

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');

// Function to add a message to the chat
function addMessage(message, senderName, isUser) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const messageContent = document.createElement('div');

    // Create a timestamp
    const timestamp = new Date().toLocaleTimeString();

    span.textContent = timestamp + ' - ' + senderName; // Display timestamp and sender name
    messageContent.textContent = message;

    li.appendChild(span); // Append the timestamp and sender name to the list item
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
socket.on('message', (data) => {
    addMessage(data.message, data.senderName, false);
});

// Handle form submission to send messages as "sender1"
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message) {
        // Send the message to the server as an object with 'text' and 'senderName'
        const senderName = 'sender2';
        socket.emit('message', { text: message, senderName });
        addMessage(message, senderName, true);
        messageInput.value = '';
    }
});