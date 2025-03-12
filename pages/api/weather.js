import axios from 'axios';

export default async function handler(req, res) {
  const { city } = req.query;
  const API_KEY = process.env.OPENWEATHER_API;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}