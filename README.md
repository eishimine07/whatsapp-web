# Whatsapp-web
## Índice
- [Descrição](#descrição)
- [Tech Stack](#tech-stack)
- [Rodando o projeto](#rodando-o-projeto)

## Descrição
App para enviar mensagens para vários grupos de whatsapp de uma só vez

## Tech Stack
- Express
- Whatsapp-web.js
- Nodemon
- Ollama

## Rodando o projeto
Instalando as dependências
```bash
npm install
```

Iniciando a aplicação
```bash
npm run app
```

Iniciando a aplicação com nodemon
```bash
npm run dev
```

No terminal irá aparecer um QR Code para fazer a autenticação do WhatsApp. Escaneie o QR Code e a aplicação será inicializada.

Além das funções de envios de mensagem whatsapp, existe a parte para conversar com o chatbot do modelo phi3 a partir de /llama. 

### Importante
A função do chatbot só ira funcionar se você já tiver o ollama instalado, e com o modelo phi3 pronto para interface da api.