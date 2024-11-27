let config = {};

// config.jsonを読み込む関数
function loadConfig() {
  fetch('config.json')
    .then(response => response.json())
    .then(data => {
      config = data;
    })
    .catch(error => {
      console.error("config.jsonの読み込みエラー:", error);
    });
}

// 暗号化処理
function encryptText() {
  const text = document.getElementById('inputText').value;
  let encryptedText = '';

  for (let char of text) {
    if (config[char]) {
      encryptedText += config[char]; // マッピングに基づいて暗号化
    } else {
      encryptedText += char; // マッピングが無ければそのまま
    }
  }

  document.getElementById('resultText').value = encryptedText;
}

// 複合化処理
function decryptText() {
  const text = document.getElementById('inputText').value;
  let decryptedText = '';
  const reverseConfig = Object.fromEntries(Object.entries(config).map(([key, value]) => [value, key]));

  let i = 0;
  while (i < text.length) {
    let matched = false;
    for (let [encoded, original] of Object.entries(reverseConfig)) {
      if (text.substring(i, i + encoded.length) === encoded) {
        decryptedText += original;
        i += encoded.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      decryptedText += text[i];
      i++;
    }
  }

  document.getElementById('resultText').value = decryptedText;
}

// ページが読み込まれたときにconfig.jsonを読み込む
window.onload = loadConfig;
