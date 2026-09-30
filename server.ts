import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { defaultPortfolioData } from './src/data/defaultData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  let currentPortfolioData = defaultPortfolioData;

  app.use(express.json({ limit: '10mb' }));

  // Endpoint to get the freshest portfolio data directly
  app.get('/api/portfolio-data', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.json(currentPortfolioData);
  });

  // Endpoint to save portfolio data directly to the repository file system
  app.post('/api/save-portfolio', (req, res) => {
    try {
      const newData = req.body;
      if (!newData || !newData.name) {
        return res.status(400).json({ error: 'Dados inválidos recebidos' });
      }

      currentPortfolioData = newData;

      const filePath = path.resolve(process.cwd(), 'src/data/defaultData.ts');

      const fileContent = `import { PortfolioData } from '../types/portfolio';\n\nexport const defaultPortfolioData: PortfolioData = ${JSON.stringify(
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
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${PORT} is currently in use, another instance is already serving.`);
    } else {
      console.error('Server error:', err);
    }
  });

  process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
  });
  process.on('SIGINT', () => {
    server.close(() => process.exit(0));
  });
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

startServer();
