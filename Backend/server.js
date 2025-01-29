const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cron = require('node-cron');
  
const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "L3TR4&num3r0",
  database: "Dados"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.get('/alunos', (req, res) => {
  con.query("SELECT * FROM alunos", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

app.put('/alunos/:num', (req, res) => {
  const num = req.params.num;
  const aluno = req.body;

  con.query(
    'UPDATE alunos SET ? WHERE num = ?',
    [aluno, num],
    function (err, result) {
      if (err) throw err;
      res.send('Aluno atualizado com sucesso');
    }
  );
});

app.post('/alunos', (req, res) => {
  const novoAluno = req.body;

  con.query('INSERT INTO alunos SET ?', novoAluno, function (err, result) {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
});

app.delete('/alunos/:num', (req, res) => {
  const num = req.params.num;

  con.query('DELETE FROM alunos WHERE num = ?', [num], function (err, result) {
    if (err) throw err;
    res.send('Aluno excluído com sucesso');
  });
});

// Adicionando endpoints para gerenciamento de planos
app.get('/planos', (req, res) => {
  con.query("SELECT * FROM planos", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

app.post('/planos', (req, res) => {
  const novoPlano = req.body;

  con.query('INSERT INTO planos SET ?', novoPlano, function (err, result) {
    if (err) throw err;
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/planos/:id', (req, res) => {
  const id = req.params.id;
  const plano = req.body;

  con.query(
    'UPDATE planos SET ? WHERE id = ?',
    [plano, id],
    function (err, result) {
      if (err) throw err;
      res.send('Plano atualizado com sucesso');
    }
  );
});

app.get('/vendas', (req, res) => {
  con.query("SELECT * FROM vendas", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

//
app.put('/status', (req, res) => {
  con.query(
    `UPDATE status 
     SET 
       alunos_ativos = (SELECT COUNT(*) FROM alunos WHERE status = 'ativo'),
       alunos_bloqueados = (SELECT COUNT(*) FROM alunos WHERE status = 'bloqueado'),
       alunos_cancelados = (SELECT COUNT(*) FROM alunos WHERE status = 'cancelado') 
     WHERE id = 1`,
    function (err, result) {
      if (err) {
        console.error('Erro ao atualizar tabela status:', err);
        res.status(500).send('Erro ao atualizar status');
      } else {
        res.send('Tabela status atualizada com sucesso');
      }
    }
  );
});

app.get('/status', (req, res) => {
  con.query("SELECT * FROM status WHERE id = 1", function (err, result, fields) {
    if (err) {
      console.error('Erro ao buscar dados de status:', err);
      res.status(500).send('Erro ao buscar dados de status');
    } else {
      res.json(result[0]); // Retorna a primeira linha
    }
  });
});

app.put('/vendas/:id', (req, res) => {
  const id = req.params.id;
  const plano = req.body;

  con.query(
    'UPDATE vendas SET ? WHERE id = ?',
    [vendas, id],
    function (err, result) {
      if (err) throw err;
      res.send('Vendas atualizado com sucesso');
    }
  );
});

app.post('/vendas', (req, res) => {
  const { nome_aluno, nome_plano, valor, data_fim } = req.body;

  const sql = 'INSERT INTO vendas (nome_aluno, nome_plano, valor, data_fim) VALUES (?, ?, ?, ?)';
  con.query(sql, [nome_aluno, nome_plano, valor, data_fim], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, message: 'Vendas realizada com sucesso!' });
  });
});

app.delete('/planos/:id', (req, res) => {
  const id = req.params.id;

  con.query('DELETE FROM planos WHERE id = ?', [id], function (err, result) {
    if (err) throw err;
    res.send('Plano excluído com sucesso');
  });
});

//Função para alterar o status do aluno
app.put('/alunos/status/:cliente', (req, res) => {
  const cliente = req.params.cliente;
  const novoStatus = req.body.status;

  con.query(
    'UPDATE alunos SET status = ? WHERE cliente = ?',
    [novoStatus, cliente],
    (err, result) => {
      if (err) throw err;
      res.json({ message: 'Status do aluno atualizado para ativo.' });
    }
  );
});

// Função para verificar e atualizar o status dos alunos
function verificarStatusAlunos() {
  const query = `
    SELECT a.num, a.status, v.data_fim
    FROM alunos a
    JOIN vendas v ON a.cliente = v.nome_aluno
    WHERE a.status = 'ativo' AND v.data_fim <= CURDATE()
  `;

  con.query(query, function (err, results) {
    if (err) throw err;

    results.forEach(aluno => {
      const updateQuery = "UPDATE alunos SET status = 'inativo' WHERE num = ?";
      con.query(updateQuery, [aluno.num], function (err, result) {
        if (err) throw err;
        console.log(`Status do aluno ${aluno.num} atualizado para inativo.`);
      });
    });
  });
}

// Agendar a verificação a 00:00
cron.schedule('0 0 * * *', () => {
  verificarStatusAlunos();
  console.log('Verificação diária de status realizada.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
