const socket = io();

let userName;

// Função para perguntar o nome usando SweetAlert
Swal.fire({
  title: 'Identificação',
  input: 'text',
  inputPlaceholder: 'Digite o nome de usuário para se identificar no chat',
  allowOutsideClick: false,
  allowEscapeKey: false,
  inputValidator: (value) => {
    if (!value) {
      return 'Por favor, insira seu nome!';
    }
  }
}).then((result) => {
  userName = result.value || "Usuário Anônimo"; // Nome padrão se o usuário não fornecer um nome
  document.getElementById('messageInput').focus(); // Foca no campo de mensagem
});

// Recebe as mensagens do servidor e exibe no chat
socket.on('chat message', (msg) => {
  const chatBox = document.getElementById('chatBox');
  const message = document.createElement('p');
  message.textContent = msg;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight; // Rola para a última mensagem
});

// Função para enviar a mensagem
function sendMessage() {
  const input = document.getElementById('messageInput');
  if (input.value) {
    // Envia o nome e a mensagem ao servidor
    socket.emit('chat message', `${userName}: ${input.value}`);
    input.value = ''; // Limpa o campo de entrada
  }
}

// Captura o evento de tecla "Enter" no campo de entrada
messageInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    if (messageInput.value.trim().length > 0) {
      event.preventDefault(); // Previne a quebra de linha
      sendMessage(); // Chama a função para enviar a mensagem
    }
  }
});
