import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const getWeather = async () => {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
  };

  const getNews = async () => {
    const res = await fetch('/api/news');
    const data = await res.json();
    setNews(data);
  };

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: chatInput }),
    });
    const data = await res.json();
    setChatResponse(data.reply);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>AI Assistant</h1>

      <div>
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
        <button onClick={getWeather}>Get Weather</button>
        {weather && <p>{weather.name}: {weather.main.temp}°C</p>}
      </div>

      <div>
        <button onClick={getNews}>Get News</button>
        <ul>
          {news.map((item, index) => (
            <li key={index}><a href={item.link}>{item.title}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask AI..." />
        <button onClick={sendMessage}>Send</button>
        {chatResponse && <p>AI: {chatResponse}</p>}
      </div>
    </div>
  );
}