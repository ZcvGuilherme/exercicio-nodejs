// Arquivo: server.js (completo)

//Imports para gerar PDF
const PDFDocument = require('pdfkit');
const fs = require('fs');


const express = require('express');
const path = require('path');
const { Amigo, Jogo, Emprestimo } = require('./models');

const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/amigos'));


// =====================
// AMIGOS
// =====================
app.get('/amigos', async (req, res) => {
  const amigos = await Amigo.findAll({ order: [['id', 'ASC']] });
  res.render('amigos/index', { amigos });
});

app.get('/amigos/novo', (req, res) => {
  res.render('amigos/novo');
});

app.post('/amigos/novo', async (req, res) => {
  const { nome, email } = req.body;
  await Amigo.create({ nome, email });
  res.redirect('/amigos');
});

app.get('/amigos/editar/:id', async (req, res) => {
  const amigo = await Amigo.findByPk(req.params.id);

  if (!amigo) {
    return res.status(404).send('Amigo não encontrado.');
  }

  res.render('amigos/editar', { amigo });
});

app.post('/amigos/editar/:id', async (req, res) => {
  const { nome, email } = req.body;

  await Amigo.update(
    { nome, email },
    { where: { id: req.params.id } }
  );

  res.redirect('/amigos');
});

app.post('/amigos/excluir/:id', async (req, res) => {
  await Amigo.destroy({ where: { id: req.params.id } });
  res.redirect('/amigos');
});


// =====================
// JOGOS
// =====================
app.get('/jogos', async (req, res) => {
  const jogos = await Jogo.findAll({
    include: [{ model: Amigo, as: 'dono' }],
    order: [['id', 'ASC']]
  });

  res.render('jogos/index', { jogos });
});

app.get('/jogos/novo', async (req, res) => {
  const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });
  res.render('jogos/novo', { amigos });
});

app.post('/jogos/novo', async (req, res) => {
  const { titulo, plataforma, amigoId } = req.body;

  await Jogo.create({
    titulo,
    plataforma,
    amigoId: Number(amigoId)
  });

  res.redirect('/jogos');
});

app.get('/jogos/editar/:id', async (req, res) => {
  const jogo = await Jogo.findByPk(req.params.id);

  if (!jogo) {
    return res.status(404).send('Jogo não encontrado.');
  }

  const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });
  res.render('jogos/editar', { jogo, amigos });
});

app.post('/jogos/editar/:id', async (req, res) => {
  const { titulo, plataforma, amigoId } = req.body;

  await Jogo.update(
    { titulo, plataforma, amigoId: Number(amigoId) },
    { where: { id: req.params.id } }
  );

  res.redirect('/jogos');
});

app.post('/jogos/excluir/:id', async (req, res) => {
  await Jogo.destroy({ where: { id: req.params.id } });
  res.redirect('/jogos');
});


// =====================
// EMPRÉSTIMOS
// =====================
app.get('/emprestimos', async (req, res) => {
  const emprestimos = await Emprestimo.findAll({
    include: [
      { model: Jogo, as: 'jogo' },
      { model: Amigo, as: 'amigo' }
    ],
    order: [['id', 'ASC']]
  });

  res.render('emprestimos/index', { emprestimos });
});

app.get('/emprestimos/novo', async (req, res) => {
  const jogos = await Jogo.findAll({ order: [['titulo', 'ASC']] });
  const amigos = await Amigo.findAll({ order: [['nome', 'ASC']] });

  res.render('emprestimos/novo', { jogos, amigos });
});

app.post('/emprestimos/novo', async (req, res) => {
  const { jogoId, amigoId, dataInicio, dataFim } = req.body;

  await Emprestimo.create({
    jogoId: Number(jogoId),
    amigoId: Number(amigoId),
    dataInicio,
    dataFim: dataFim || null
  });

  res.redirect('/emprestimos');
});

app.post('/emprestimos/excluir/:id', async (req, res) => {
  await Emprestimo.destroy({ where: { id: req.params.id } });
  res.redirect('/emprestimos');
});

app.get('/pdf/emprestimos', async (req, res) => {
  try {
    const emprestimos = await Emprestimo.findAll({
      include: [
        { model: Jogo, as: 'jogo' },
        { model: Amigo, as: 'amigo' }
      ],
      order: [['id', 'ASC']]
    });

    // Criação do documento PDF
    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=emprestimos.pdf');

    doc.pipe(res);

    // ===== TÍTULO =====
    doc
      .fontSize(20)
      .text('Relatório de Empréstimos de Jogos', { align: 'center' });

    doc.moveDown(2);

    // ===== TABELA DE EMPRÉSTIMOS =====
let y = 150;

// Cabeçalho
doc.fontSize(12).text('ID', 50, y);
doc.text('Amigo', 100, y);
doc.text('Quem Pegou o Jogo', 220, y);
doc.text('Data Início', 360, y);
doc.text('Data Fim', 460, y);

// Linha do cabeçalho
doc.moveTo(50, y + 15)
   .lineTo(550, y + 15)
   .stroke();

// Dados
y += 25;

emprestimos.forEach((e) => {
  doc.text(e.id.toString(), 50, y);
  doc.text(e.amigo.nome, 100, y);
  doc.text(e.jogo.titulo, 220, y);
  doc.text(e.dataInicio, 360, y);
  doc.text(e.dataFim ?? 'Em andamento', 460, y);

  y += 20;

  // Quebra de página automática
  if (y > 750) {
    doc.addPage();
    y = 50;
  }
});


    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar PDF');
  }
});

// =====================
app.listen(PORT,'0.0.0.0', () => {
  console.log(`http://localhost:${PORT}`);
});

app.get('/api/amigos', async (req, res) => {
  try {
    const amigos = await Amigo.findAll({
      order: [['id', 'ASC']]
    });

    res.json(amigos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar amigos' });
  }
});

app.get('/api/emprestimos', async (req, res) => {
  try {
    const emprestimos = await Emprestimo.findAll({
      order: [['id', 'ASC']]
    });

    res.json(emprestimos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar emprestimos' });
  }
});


app.get('/api/jogos', async (req, res) => {
  try {
    const jogos = await Jogo.findAll({
      order: [['id', 'ASC']]
    });

    res.json(jogos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar jogos' });
  }
});
