const userNameInput = document.getElementById('username');
const assessmentButton = document.getElementById('assessment');
const resultArea = document.getElementById('result-area');
const tweetArea = document.getElementById('tweet-area');

// 診断ボタンクリック時
assessmentButton.addEventListener('click', () => {
  resultArea.innerHTML = '';
  tweetArea.innerHTML = '';
  const username = userNameInput.value;
  if (username.length === 0) return;

  // 診断結果の計算
  const result = assessment(username);

  // Bootstrapカード作成
  const headerDivision = document.createElement("div");
  headerDivision.setAttribute("class", "card-header text-bg-primary");
  headerDivision.innerText = "診断結果";

  const bodyDivision = document.createElement("div");
  bodyDivision.setAttribute("class", "card-body");

  const paragraph = document.createElement('p');
  paragraph.setAttribute("class", "card-text");
  paragraph.innerText = result;

  bodyDivision.appendChild(paragraph);
  resultArea.setAttribute("class", "card mt-3");
  resultArea.appendChild(headerDivision);
  resultArea.appendChild(bodyDivision);

  // ツイートボタンの作成
  const anchor = document.createElement("a");
  const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" +
    encodeURIComponent("あなたのいいところ") +
    "&ref_src=twsrc%5Etfw";
  anchor.setAttribute("href", hrefValue);
  anchor.setAttribute("class", "twitter-hashtag-button");
  anchor.setAttribute("data-text", result);
  anchor.innerText = "Tweet #あなたのいいところ";
  tweetArea.appendChild(anchor);

  const script = document.createElement("script");
  script.setAttribute("src", "https://platform.twitter.com/widgets.js");
  tweetArea.appendChild(script);
});

// Enterキー対応
userNameInput.addEventListener('keydown', (event) => {
  if (event.code === "Enter") {
    assessmentButton.dispatchEvent(new Event("click"));
  }
});

// 診断関数
function assessment(userName) {
  const messages = [
    '{userName}のいいところは声です。',
    '{userName}のいいところはまなざしです。',
    '{userName}のいいところは情熱です。'
  ];
  const index = userName.charCodeAt(0) % messages.length;
  return messages[index].replace('{userName}', userName);
}



