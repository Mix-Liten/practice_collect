const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const greetings = [
  // 'Im good you little piece of love',
  // 'leave me alone',
  // 'Fine thanks',
  '安安幸會初次見面你好',
  'ohiyo'
];

const weather = [
  // 'Weather is fine',
  // 'You need an umbrella',
  // 'Sunny day',
  '大太陽',
  '狂風暴雨請假宅在家吧',
  '陰天',
  '自己去看氣象新聞問屁問',
]

recognition.onstart = () => {
  console.log('voice is activated, say somthing~');
}

recognition.onresult = evt => {
  const current = evt.resultIndex;
  const transcript = evt.results[current][0].transcript;
  content.textContent = transcript;
  readOutLoud(transcript);
}

btn.addEventListener('click', () => {
  recognition.start();
})

function readOutLoud(msg) {
  const speech = new SpeechSynthesisUtterance();

  if (msg.includes('你好')) {
    const finalText = greetings[Math.floor(Math.random() * greetings.length)];
    speech.text = finalText;
  } else if (msg.includes('天氣')) {
    const finalText = weather[Math.floor(Math.random() * weather.length)];
    speech.text = finalText;
  } else {
    speech.text = 'I dont know what you said';
    // speech.text = '你在說啥';
  }

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}