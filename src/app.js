const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const whatsapp = require('./helpers/whatsapp');

// Workaround - wweb 2.23*** version is not working
const wwebVersion = '2.2412.54';
const whatsappClient = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth(),
    webVersionCache: {
      type: 'remote',
      remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
  },
});
const app = express();
const port = 3000;

whatsappClient.on('qr', qr => {
  console.log('on QR code', qr)
    qrcode.generate(qr, {small: true});
});

whatsappClient.on('ready', async () => {
  app.listen(port, () => {
    console.log(`Local:   http://localhost:${port}`);
  })
});

whatsappClient.initialize();

// Parse application/json
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/index.html'));
})
app.get('/llama', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/llama.html'));
})

app.post('/send-messages', async (req, res) => {
  const groups = req.body.groups?.split(';')?.filter((element) => element.trim().length > 0);
  const message = req.body.message;

  if (groups == null || groups.length === 0) {
    return res.status(400).json({ message: 'Campo "groups" não pode ser vazio' });
  }

  if (message == null || message.trim().length === 0) {
    return res.status(400).json({ message: 'Campo "message" não pode ser vazio' });
  }

  let totalErrors = 0;
  const errors = [];

  for (let group of groups) {
    const error = await whatsapp.sendMessage(whatsappClient, group, message);

    if (error) {
      errors.push(`Grupo ${group}: ${error}`);
      totalErrors += 1;
    }
  }

  const total = groups.length;
  const totalSent = total - totalErrors;

  return res.status(200).json({ errors, total: groups.length, totalSent, totalErrors });
})
