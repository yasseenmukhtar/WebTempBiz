import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const templates = [
    {
      id: 'demo-template',
      name: 'Demo Business Landing',
      description: 'A clean landing template for small businesses.',
      price: 29,
      screenshot: '/templates/demo-screenshot.png',
      zipPath: '/templates/demo-template.zip'
    }
  ];

  const { id } = req.query;
  if (id) {
    res.json(templates.filter(t => t.id === id));
  } else {
    res.json(templates);
  }
}
