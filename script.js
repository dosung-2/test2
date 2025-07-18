
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;
    appendMessage('user', message);
    input.value = '';
    appendMessage('bot', '...'); // 로딩 표시
    const botMsgDiv = document.querySelector('.bot-msg:last-child');
    try {
        const response = await getBotResponse(message);
        botMsgDiv.innerText = response;
    } catch (e) {
        botMsgDiv.innerText = 'API 오류가 발생했습니다.';
    }
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// OpenAI ChatGPT API 호출 (get-4o-mini)
async function getBotResponse(userInpgitut) {
    const apiKey = 'KEY<- 반드시 본인 키로 교체.'
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };
    const body = {
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput }
        ],
        max_tokens: 1000
    };
    const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return data.choices[0].message.content.trim();
}
