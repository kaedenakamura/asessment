const userNameInput = document.getElementById('username');
const assessmentButton = document.getElementById('assessment');
const resultArea = document.getElementById('result-area');
const tweetArea = document.getElementById('tweet-area');

assessmentButton.addEventListener('click', () => {
  resultArea.innerHTML = '';
  const username = userNameInput.value;
  if (username.length === 0) { return; }

  const header = document.createElement('h3');
  header.innerText = "診断結果";
  resultArea.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(username);  // ← 先に定義された関数を呼び出す
  paragraph.innerText = result;
  resultArea.appendChild(paragraph);
  // enterキーを押されたときの診断表示機能追加
  userNameInput.addEventListener('keydown', (event) => {
  if (event.code === "Enter") {
    assessmentButton.dispatchEvent(new Event("click"));
  }
});

  tweetArea.innerText ="";
  const anchor =document.createElement("a");
  const hrefValue ="https://twitter.com/intent/tweet?button_hashtag=" +encodeURIComponent("あなたのいいところ") +"&ref_src=twsrc%5Etfw";
  anchor.setAttribute("href",hrefValue)
  anchor.setAttribute("class","twitter-hashtag-button");
  anchor.setAttribute("data-text",result)
  anchor.innerText ="Tweet#あなたのいいところ";
  tweetArea.appendChild(anchor)
    const script =document.createElement("script");
  script.setAttribute ("src","https://platform.twitter.com/widgets.js");
  tweetArea.appendChild(script)
});



// ← 関数をイベントハンドラの**外に**定義！
function assessment(userName) {
  const messages = [
    '{userName}のいいところは声です。',
    '{userName}のいいところはまなざしです。',
    '{userName}のいいところは情熱です。'
  ];
  const index = userName.charCodeAt(0) % messages.length;
  return messages[index].replace('{userName}', userName);
}

