const express = require('express');
const router = express.Router();

const db = require('./db')
db.connect()
const q = `Select * from users`


// Mostra os usuario salvos

router.get('/user', (req, resp) => {
  const q = 'SELECT * FROM users'; // Suponha que "users" seja o nome da tabela no seu banco de dados

  db.query(q, (err, res) => {
      if (!err) {
          resp.json(res.rows); // Envia a resposta como JSON
      } else {
          console.error('Erro ao buscar dados:', err);
          resp.status(500).json({ error: 'Erro ao buscar dados' });
      }
  });
});

router.get('/user/:id', (req, resp) => {
  const userId = req.params.id; // Obtém o ID da URL

  const q = 'SELECT * FROM users WHERE id = $1'; // Suponha que "users" seja o nome da tabela no seu banco de dados

  db.query(q, [userId], (err, res) => {
      if (!err) {
          if (res.rows.length === 0) {
              resp.status(404).json({ error: 'Usuário não encontrado' });
          } else {
              resp.json(res.rows[0]); // Envia o registro encontrado como resposta em formato JSON
          }
      } else {
          console.error('Erro ao buscar dados:', err);
          resp.status(500).json({ error: 'Erro ao buscar dados' });
      }
  });
});








// adiciona novos usuarios

router.post('/user', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const query = 'INSERT INTO users (name, email) VALUES ($1, $2)';
    const values = [name, email];

    db.query(query, values)
        .then(result => {
            res.status(200).send('Deu tudo certo meu caro');
        })
        .catch(error => {
            console.error('Error ao inserir dados:', error);
            res.status(500).send('O erro ocorreu enquanto inseria os dados');
        });
});

//deleta os usuarios

router.delete('/user/:id', async (req, res) => {
    const idToDelete = req.params.id;
  
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await db.query(query, [idToDelete]);
  
      if (result.rowCount === 1) {
        res.status(200).send('Registro deletado com sucesso.');
      } else {
        res.status(404).send('Registro não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
      res.status(500).send('Erro interno ao tentar deletar registro.');
    }
  });

  //altera os usuario

  router.put('/user/:id', (req, res) => {
    const idToUpdate = req.params.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
  
    //const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';
    const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3`;
    
    db.query(query, [newName, newEmail, idToUpdate], (error, result) => {
      if (error) {
        console.error('Erro ao atualizar registro:', error);
        res.status(500).send('Erro interno ao tentar atualizar registro.');
      } else {
        if (result.rowCount === 1) {
          res.status(200).send('Registro atualizado com sucesso.');
        } else {
          res.status(404).send('Registro não encontrado.');
        }
      }
    });
  });


module.exports = router;