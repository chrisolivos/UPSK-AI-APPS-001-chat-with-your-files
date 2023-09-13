async function query(data) {
    const response = await fetch(
        "http://127.0.0.1:3000/api/v1/prediction/50e0129f-5ac9-419a-b48a-97483d0918ad",
        {
            headers: {
                // Authorization: "Bearer 8q5TzxK38UhoS9TRfZFP4TjMv3imXArTQ5UssgLbcAE=",
                Authorization: "Bearer KNpnesNapQb1xZiezkOz3eus9Ev56MJB/fXS3qEq1Zs=",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        }
    );
    const result = await response.json();
    return result;
}

// query({"question": "que construyeron los tres cerditos"}).then((response) => {
//     console.log(response);
// });

// Función para agregar un mensaje al chat
function addMessage(message, isUserMessage) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (isUserMessage) {
        messageDiv.classList.add('user-message');
    }

    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
}

// Función para enviar un mensaje del usuario
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value;

    // Agregar el mensaje del usuario al chat
    addMessage(userMessage, true);

    // Hacer la solicitud al servidor y recibir la respuesta 
    query({ "question": userMessage }).then((response) => {
        // Agregar la respuesta del servidor al chat
        addMessage(response, false);
    });

    // Limpiar el campo de entrada del usuario
    userInput.value = '';
}

// Configurar el botón para enviar mensajes
document.getElementById('send-button').addEventListener('click', sendMessage);

// Configurar el campo de entrada para enviar mensajes al presionar Enter
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
