const helpers = require('./helpers');

exports.sendMessage = async function (whatsappClient, groupName, message) {
  if (!groupName || groupName.trim() === '') {
      return 'Nome do grupo do WhatsApp está vazio';
  }

  if (!message || groupName.trim() === '') {
      return 'Mensagem está vazio';
  }

  const chats = await whatsappClient.getChats();
  const chat = chats.find((c) => c.isGroup && c.name.trim().toLowerCase() === groupName.trim().toLowerCase());

  if (!chat) {
      return 'Grupo não encontrado';
  }

  const delay = 2000 + Math.random() * 2;
  await helpers.sleep(delay);

  try {
      await chat.sendMessage(message.replaceAll('<br>', '\n'));    
  } catch (error) {
    return 'Erro ao enviar a mensagem';
  }

  return null;
}