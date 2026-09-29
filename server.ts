import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Endpoint to get the freshest portfolio data directly from disk
  app.get('/api/portfolio-data', (_req, res) => {
    try {
      const filePath = path.resolve(process.cwd(), 'src/data/defaultData.ts');
      const content = fs.readFileSync(filePath, 'utf-8');
      const match = content.match(/export const defaultPortfolioData: PortfolioData = ([\s\S]*?);\s*$/);
      if (match && match[1]) {
        const data = JSON.parse(match[1]);
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        return res.json(data);
      }
      return res.status(404).json({ error: 'Estrutura não encontrada' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Endpoint to save portfolio data directly to the repository file system
  app.post('/api/save-portfolio', (req, res) => {
    try {
      const newData = req.body;
      if (!newData || !newData.name) {
        return res.status(400).json({ error: 'Dados inválidos recebidos' });
      }

      const filePath = path.resolve(process.cwd(), 'src/data/defaultData.ts');

      const fileContent = `import { PortfolioData } from '../types/portfolio';\nimport matheusPortrait from '../assets/images/matheus_portrait_1790445047363.jpg';\n\nexport { matheusPortrait };\n\nexport const defaultPortfolioData: PortfolioData = ${JSON.stringify(
        newData,
        null,
        2
      )};\n`;

      fs.writeFileSync(filePath, fileContent, 'utf-8');
      console.log('✅ Portfolio data saved successfully into src/data/defaultData.ts');

      return res.json({
        success: true,
        message: 'Dados atualizados e salvos com sucesso no código do projeto!',
      });
    } catch (err: any) {
      console.error('❌ Error saving portfolio to disk:', err);
      return res.status(500).json({ error: err.message || 'Erro ao gravar dados no disco' });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
