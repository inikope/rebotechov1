'use strict';
const line = require('@line/bot-sdk');
const express = require('express');
var request = require("request");

// create LINE SDK config from env variables
const config = {
   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
   channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
    res.send('Res send!');
  });
  
  // register a webhook handler with middleware
  // about the middleware, please refer to doc
  app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
  });
  
  // simple reply function
	const replyText = (token, texts) => {
		texts = Array.isArray(texts) ? texts : [texts];
		return client.replyMessage(
			token,
			texts.map((text) => ({ type: 'text', text }))
	);
	};
	// Reply yg asli:
	// return client.replyMessage(event.replyToken, tutorVid);

  // event handler
  function handleEvent(event) {
     
     // Emojis     
     //  Chats
    const sendHelp 		= "𝙍𝙀:𝘽𝙊𝙏 dapat melakukan beberapa hal loh...\nCoba yuk command-command 𝙍𝙀:𝘽𝙊𝙏 berikut ini!\n\n\n/𝐡𝐞𝐥𝐩 - Untuk melihat command yang kami punya\n/𝐯𝐢𝐝𝐞𝐨𝐢𝐠 - Untuk menyimpan video dari instagram\n/𝐟𝐨𝐭𝐨𝐢𝐠 - Untuk menyimpan foto dari instagram\n/𝐜𝐞𝐤𝐢𝐠 - Untuk mengecek profil instagram\n/𝐬𝐭𝐨𝐫𝐲𝐢𝐠 - Untuk menyimpan foto atau video dari instastory\n/𝐚𝐛𝐨𝐮𝐭 - Untuk mengetahui lebih lanjut tentang 𝙍𝙀:𝘽𝙊𝙏\n\n\n\u2665";
    const tutorFoto	 	= "Begini nih cara menggunakan commandnya\n\n/fotoig (link post instagram)";
    const tutorVid 		= "Begini nih cara menggunakan commandnya\n\n/videoig (link post instagram)";
    const tutorStory 	= "Begini nih cara menggunakan commandnya\n\n/storyig (username instagram)";
    const tutorCek 		= "Begini nih cara menggunakan commandnya\n\n/cekig (username instagram)";
    const errormess 	   = "Terima kasih atas pesannya\nSayang sekali, akun ini masih goblok";
    const sendIntro 	   =  "𝙍𝙀:𝘽𝙊𝙏 dapat melakukan beberapa hal loh..\nCoba yuk!\nKetik /help untuk melihat command-command yang kami punya.\n\n\u2605";
    const aboutMe 		= "𝙍𝙀:𝘽𝙊𝙏 adalah adalah chatbot yang dapat membantumu menyimpan foto maupun video dari Instagram.\n\n𝙍𝙀:𝘽𝙊𝙏 dibuat oleh:\n- [2201801636] Hans Nugroho Gianto Hadiwijaya\n- [2201758285] Casandra\n- [2201787915] Mita\n\n\n\uD83C\uDF6C";
    const sendHello 	   = "Welcome to 𝙍𝙀:𝘽𝙊𝙏!\n\n𝙍𝙀:𝘽𝙊𝙏 dapat melakukan beberapa hal loh..\nCoba yuk!\nKetik /help untuk melihat command-command yang kami punya.";
	 
	if (event.type === 'follow'){
		return replyText(event.replyToken, sendHello);
	} else if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return replyText(event.replyToken, sendIntro);
    } else {
        const receivedMessage = event.message.text;
        if (receivedMessage.split(" ").length === 2){
            const splittedText = receivedMessage.split(" ");
            const inicommand = splittedText[0];
            const link = splittedText[1];
            switch (inicommand) {
                case '/videoig':
                    return replyText(event.replyToken, tutorVid);
                    break;
                case '/fotoig':
                    return replyText(event.replyToken, tutorFoto);
                    break;
                case '/storyig':
                    return replyText(event.replyToken, tutorStory);
                    break;
                case '/cekig':
                    return replyText(event.replyToken, tutorCek);
                    break;
		case '/echo':
		    return replyText(event.replyToken, link);
		    break;
                default:
                    return replyText(event.replyToken, errormess);
                    break;
            }
        } else {
            switch (receivedMessage) {
                case '/help':
                    return replyText(event.replyToken, sendHelp);
                    break;
                case '/videoig':
                    return replyText(event.replyToken, tutorVid);
                    break;
                case '/fotoig':
                    return replyText(event.replyToken, tutorFoto);
                    break;
                case '/storyig':
                    return replyText(event.replyToken, tutorStory);
                    break;
                case '/cekig':
                    return replyText(event.replyToken, tutorCek);
                    break;
                case '/about':
                    return replyText(event.replyToken, aboutMe);
                    break;
                default:
                    return replyText(event.replyToken, sendIntro);
                    break;
            }
        }
  }
  }  
  // listen on port
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
