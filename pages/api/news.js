import Parser from 'rss-parser';

export default async function handler(req, res) {
  const parser = new Parser();
  const feed = await parser.parseURL('https://www.adaderana.lk/rss.php');
  res.status(200).json(feed.items.slice(0, 5));
}