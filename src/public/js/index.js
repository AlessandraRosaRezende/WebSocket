const socket = io();

let userName;

// Função para perguntar o nome usando SweetAlert
Swal.fire({
  title: 'Digite seu nome',
  input: 'text',
  inputPlaceholder: 'Seu nome',
  allowOutsideClick: false,
  allowEscapeKey: false,
  inputValidator: (value) => {
    if (!value) {
      return 'Por favor, insira seu nome!';
    }
  }
}).then((result) => {
  userName = result.value || "Usuário Anônimo"; // Nome padrão se o usuário não fornecer um nome
  document.getElementById('message-input').focus(); // Foca no campo de mensagem
});

// Recebe as mensagens do servidor e exibe no chat
socket.on('chat message', (msg) => {
  const chatBox = document.getElementById('chat-box');
  const message = document.createElement('p');
  message.textContent = msg;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight; // Rola para a última mensagem
});

// Função para enviar a mensagem
function sendMessage() {
  const input = document.getElementById('message-input');
  if (input.value) {
    // Envia o nome e a mensagem ao servidor
    socket.emit('chat message', `${userName}: ${input.value}`);
    input.value = ''; // Limpa o campo de entrada
  }
}

// Captura o evento de tecla "Enter" no campo de entrada
document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Impede o comportamento padrão do Enter
    sendMessage(); // Chama a função para enviar a mensagem
  }
});
