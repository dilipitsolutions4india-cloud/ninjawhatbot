const { Client, LocalAuth, MessageMedia, Poll, Location } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'bot1' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-extensions',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-background-networking',
            '--disable-sync',
            '--no-first-run',
            '--disable-default-apps',
        ]
    }
});

// Show QR code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// When client is ready
client.on('ready', () => {
    console.log('✅ Client is ready! Session loaded.');
});

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const myArray = [
  // ===== English OTPs =====
  "Your OTP is ${otp}. Please do not share it with anyone.",
  "Use ${otp} to verify your login.",
  "${otp} is your OTP, valid for 5 minutes.",
  "Please use this code ${otp} to confirm your action.",
  "Security alert! Your code is ${otp}.",
  "Transaction OTP: ${otp}.",
  "Login verification code: ${otp}.",
  "Temporary PIN is ${otp}.",
  "One time password is ${otp}.",
  "Your code for confirmation is ${otp}.",
  "Verification code: ${otp}.",
  "Your login OTP is ${otp}.",
  "Do not share OTP: ${otp}.",
  "Authentication PIN: ${otp}.",
  "Code ${otp} is required to proceed.",
  "Confirm using OTP: ${otp}.",
  "Your security code is ${otp}.",
  "Use ${otp} for account recovery.",
  "Password reset OTP is ${otp}.",
  "Code ${otp} will expire soon.",
  "OTP ${otp} is valid for 10 minutes.",
  "Temporary verification code: ${otp}.",
  "Your one-time PIN is ${otp}.",
  "Use ${otp} to authenticate your login.",
  "Login OTP ${otp} sent to your device.",
  "Enter OTP ${otp} to confirm transaction.",
  "Code ${otp} is generated for account verification.",
  "Verification PIN ${otp} is active now.",
  "Your code ${otp} is confidential.",
  "Temporary code ${otp} is valid for 5 minutes.",
  "Security OTP ${otp} has been sent to your number.",
  "Your authentication code is ${otp}.",
  "OTP ${otp} will expire in 5 minutes.",
  "Login PIN: ${otp}.",
  "Verification code: ${otp}.",
  "Security PIN: ${otp}.",
  "One time code ${otp} for verification.",
  "Your OTP ${otp} is active.",
  "Code ${otp} is required to login.",
  "OTP ${otp} for account access.",
  "Temporary PIN ${otp} is valid.",
  "Login OTP ${otp} has been generated.",
  "Your verification code is ${otp}.",
  "Code ${otp} is one-time use.",
  "Temporary OTP ${otp} sent.",
  "Verification PIN ${otp} active now.",
  "Enter code ${otp} to continue.",
  "Your OTP ${otp} is valid for 5 mins.",
  "Login code ${otp} sent to your mobile.",
  "OTP ${otp} required to proceed.",

  // ===== Hindi OTPs =====
  "आपका ओटीपी है ${otp}, कृपया किसी से साझा न करें।",
  "लॉगिन के लिए कोड इस्तेमाल करें: ${otp}.",
  "आपके ट्रांजैक्शन का पासकोड: ${otp}.",
  "यह कोड ${otp} केवल 5 मिनट तक मान्य है।",
  "सिक्योरिटी के लिए ओटीपी भेजा गया है: ${otp}.",
  "आपका पासकोड ${otp} है।",
  "कृपया इस नंबर ${otp} को एंटर करें।",
  "आपके अकाउंट के लिए कोड है ${otp}.",
  "आपका अस्थायी पासवर्ड है: ${otp}.",
  "कन्फर्मेशन के लिए कोड डालें: ${otp}.",
  "आपका लॉगिन ओटीपी है: ${otp}.",
  "पासवर्ड बदलने के लिए ओटीपी डालें: ${otp}.",
  "आपका ट्रांजैक्शन ओटीपी है ${otp}.",
  "अकाउंट वेरिफिकेशन कोड: ${otp}.",
  "सिर्फ 5 मिनट तक मान्य है यह ओटीपी: ${otp}.",
  "ओटीपी ${otp} का इस्तेमाल करें।",
  "आपका पासवर्ड रीसेट कोड है: ${otp}.",
  "इस ओटीपी को किसी के साथ साझा न करें: ${otp}.",
  "अकाउंट खोलने के लिए कोड डालें: ${otp}.",
  "आपका वन टाइम पासवर्ड है: ${otp}.",
  "OTP ${otp} अब इस्तेमाल करें।",
  "आपका सिक्योरिटी कोड ${otp} है।",
  "तुरंत अपने अकाउंट के लिए कोड ${otp} डालें।",
  "कोड ${otp} का इस्तेमाल केवल आपको करना है।",
  "आपका OTP ${otp} केवल 10 मिनट के लिए वैध है।",
  "नए लॉगिन के लिए कोड ${otp}।",
  "कृपया ${otp} डालकर अपनी पहचान सत्यापित करें।",
  "आपका अस्थायी पासकोड ${otp} सक्रिय है।",
  "कोड ${otp} के साथ लॉगिन करें।",
  "OTP ${otp} आपके अकाउंट के लिए भेजा गया।",

  // ===== Hinglish OTPs =====
  "Bhai OTP aaya kya? Mera phone dead hai, forward kar na ${otp}.",
  "Use kar le ${otp}, bas 2 min ke liye valid hai.",
  "Arre ${otp} likh aur login kar jaldi.",
  "Kya ${otp} tere paas aaya? Mujhe bhej de.",
  "Bank se msg aaya: code ${otp} use kar.",
  "Apun ko mila ${otp}, shayad tera hoga.",
  "Bhai jaldi dal OTP ${otp} warna expire ho jayega.",
  "Mera code ${otp} hai, check kar le.",
  "Tujhe mila kya msg ${otp} ka?",
  "Abhi ${otp} aaya mere number pe, use kar le.",
  "OTP ${otp} daal na jaldi.",
  "Tera login code ${otp} hai.",
  "Bhai temporary PIN ${otp} use kar.",
  "Forward kar OTP ${otp}, bas 5 min valid hai.",
  "Apun ke number pe code ${otp} aaya.",
  "Login ke liye OTP ${otp} use kar le.",
  "Security code ${otp} bhej diya hai.",
  "Bhai OTP ${otp} jaldi daal.",
  "Account verification ka code ${otp} hai.",
  "OTP ${otp} ko share mat karna.",
  "Temporary PIN ${otp} activate ho gaya.",
  "Use kar login OTP ${otp}.",
  "Verification code ${otp} bhej diya.",
  "Bhai code ${otp} check kar.",
  "OTP ${otp} sirf tere liye hai.",
  "Login ke liye code ${otp} valid hai.",
  "OTP ${otp} 5 min ke liye hai.",
  "Temporary code ${otp} dal.",
  "Forward kar OTP ${otp} abhi.",
  "Security OTP ${otp} active.",
  "Tera one-time PIN ${otp}.",
  "Code ${otp} use kar login.",
  "OTP ${otp} sirf ek baar use hoga.",
  "Verification code ${otp} enter kar.",
  "Temporary OTP ${otp} sent hai.",
  "Login OTP ${otp} verify kar.",
  "OTP ${otp} daal aur proceed kar.",
  "Security PIN ${otp} sirf valid hai 5 min.",
  "Login code ${otp} abhi enter kar.",
  "OTP ${otp} automatically generate hua.",
  "Temporary code ${otp} sirf ek baar use kare.",
  "Verification PIN ${otp} active now.",
  "OTP ${otp} send ho gaya.",
  "Login code ${otp} apke liye.",
  "OTP ${otp} sirf verify ke liye.",
  "Temporary PIN ${otp} use kar abhi.",
  "OTP ${otp} confirm kar transaction.",
  "Code ${otp} login ke liye required.",
  "OTP ${otp} confidential hai.",
  "Use ${otp} for account recovery now."
];


const chosenItem = randomItem(myArray);
console.log(chosenItem);


// Your contact list
const numbers = ['919917700188@c.us', '919917713287@c.us', '919917753009@c.us', '919917826900@c.us', '919917859989@c.us', '919917956138@c.us', '919917961254@c.us', '919917964825@c.us', '919927017452@c.us', '919927022722@c.us', '919927028399@c.us', '919927159664@c.us', '919927165176@c.us', '919927191433@c.us', '919927246677@c.us', '919927255949@c.us', '919927258810@c.us', '919927270110@c.us', '919927276757@c.us', '919927312241@c.us', '919927354101@c.us', '919927360379@c.us', '919927389074@c.us', '919927409195@c.us', '919927420014@c.us', '919927440036@c.us', '919927475716@c.us', '919927605031@c.us', '919927615719@c.us', '919927643050@c.us', '919927673830@c.us', '919927707310@c.us', '919927736024@c.us', '919927738939@c.us', '919927789643@c.us', '919927807862@c.us', '919927815142@c.us', '919927817180@c.us', '919927837324@c.us', '919927867408@c.us', '919927875812@c.us', '919927932144@c.us', '919927938934@c.us','919012646805@c.us', '918433101557@c.us', '919068954545@c.us', '919440872124@c.us', '918057757258@c.us', '916398411848@c.us', '919368803205@c.us', '919917985846@c.us', '918869838223@c.us', '916209307434@c.us', '918400235352@c.us', '919917641510@c.us', '918279630507@c.us', '919643819266@c.us', '917500392721@c.us', '917248087582@c.us', '916397488650@c.us', '919690566443@c.us', '919917721555@c.us', '919917370949@c.us', '917217358654@c.us', '918384832022@c.us', '917668966232@c.us', '919568986889@c.us', '919457966952@c.us', '918279459593@c.us', '917817852460@c.us', '916396388624@c.us', '919758337117@c.us', '916396574702@c.us', '919520242032@c.us', '918279978341@c.us', '919897072926@c.us', '917017063929@c.us', '919368934063@c.us', '918057638804@c.us', '919897625971@c.us', '917248804754@c.us', '917248878458@c.us', '919780331322@c.us', '917540997210@c.us', '916399703386@c.us', '918958396105@c.us', '918979146956@c.us', '918218698503@c.us', '919870755774@c.us', '919045236255@c.us', '919761436370@c.us', '919536728766@c.us', '917505856223@c.us', '917310857758@c.us', '918433022589@c.us', '919639193172@c.us'];
const numbers1 = ['918800931204@c.us']
// Function to send messages manually
console.log(numbers.length)
async function sendMessages(message) {
    for (const number of numbers) {
        try {
            const otp = "459876"; // Or generate dynamically
            const randomIndex = Math.floor(Math.random() * myArray.length);
            const template = myArray[randomIndex];
            const messagess = template.replace(/\$\{otp\}/g, otp);
            await client.sendMessage(number, messagess);
            console.log(`✅ Message sent successfully to ${number} -> ${messagess}`);
            
            // Random delay between 15 and 45 seconds
            const delay = Math.floor(Math.random() * 30000) + 15000;
            console.log(`⏱ Waiting ${delay / 1000} seconds before next message...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        } catch (err) {
            console.error(`❌ Failed to send message to ${number}:`, err);
        }
    }
    console.log('✅ All messages processed.');
}

// Listen for messages
client.on('message', async msg => {
    console.log(`📩 Message from ${msg.from}: ${msg.body}`);

    try {
        if (msg.body) {
    // Load local image
    const media = MessageMedia.fromFilePath('sorry.png'); // your local image

    // Caption text
    const caption = "Sorry Message Delivered to Wrong Number.\nWe apologize for that.\nWe will not message you anymore.\nThanks for connecting to your bot.\nBye 👋";

    // Send image with caption
    await client.sendMessage(msg.from, media, { caption: caption });
}
        // Trigger message sending manually by typing "send"
        if (msg.body.toLowerCase() === 'send') {
            await msg.reply('🚀 Sending messages now...');
            await sendMessages("hello");
            await msg.reply('✅ All messages sent!');
        }

        // Existing commands
        if (msg.body.toLowerCase() === 'ping') await msg.reply('pong');
        if (msg.body.toLowerCase() === 'ok') await msg.reply('Thanks Sir Waiting For your Response');
        if (msg.body.toLowerCase() === 'hello') await client.sendMessage(msg.from, '👋 Hello from Ninja Whatsapp!');
        if (msg.body.toLowerCase() === 'image') {
            const media = await MessageMedia.fromUrl('https://picsum.photos/300/200.jpg', { unsafeMime: true });
            await client.sendMessage(msg.from, media, { caption: 'Random image 📸' });
        }
        if (msg.body.toLowerCase() === 'audio') {
            const media = await MessageMedia.fromFilePath('./sample.mp3');
            await client.sendMessage(msg.from, media);
        }
        if (msg.body.toLowerCase() === 'doc') {
            const media = await MessageMedia.fromFilePath('./sample.pdf');
            await client.sendMessage(msg.from, media, { sendMediaAsDocument: true });
        }
        if (msg.body.toLowerCase() === 'sticker') {
            const media = await MessageMedia.fromUrl('https://placekitten.com/200/200', { unsafeMime: true });
            await client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
        }
        if (msg.body.toLowerCase() === 'contact') {
            const contact = await client.getContactById(msg.from);
            await client.sendMessage(msg.from, contact);
        }
        if (msg.body.toLowerCase() === 'location') {
            await client.sendMessage(msg.from, new Location(37.422, -122.084, 'Google HQ 🌍'));
        }
        if (msg.body.toLowerCase() === 'react') await msg.react('🔥');
        if (msg.body.toLowerCase() === 'poll') {
            const poll = new Poll('Which fruit do you like?', ['🍎 Apple', '🍌 Banana', '🍇 Grapes']);
            await client.sendMessage(msg.from, poll);
        }
        if (msg.body.toLowerCase() === 'mention') {
            const chat = await msg.getChat();
            if (chat.isGroup) {
                let mentions = [];
                let text = 'Hello group! 👋\n';
                for (let participant of chat.participants.slice(0, 3)) {
                    const contact = await client.getContactById(participant.id._serialized);
                    mentions.push(contact);
                    text += `@${contact.number} `;
                }
                await chat.sendMessage(text, { mentions });
            } else {
                await msg.reply('⚠️ This command only works in groups.');
            }
        }
        if (msg.body.toLowerCase() === 'groupinfo') {
            const chat = await msg.getChat();
            if (chat.isGroup) {
                await msg.reply(
                    `📢 Group: ${chat.name}\n👥 Participants: ${chat.participants.length}\n📝 Description: ${chat.description || 'No description'}`
                );
            } else {
                await msg.reply('⚠️ This command only works in groups.');
            }
        }

    } catch (err) {
        console.error('Error handling message:', err);
    }
});

client.initialize();
