const express = require('express');
const app = express();

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    estoque.push({ id, nome, qtd: parseInt(qtd) });
    res.send('Produto adicionado ao estoque.');
});

app.get('/listar', (req, res) => {
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    estoque = estoque.filter(item => item.id !== id);
    res.send('Produto removido do estoque.');
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    const index = estoque.findIndex(item => item.id === id);
    if (index !== -1) {
        estoque[index].qtd = parseInt(qtd);
        res.send('Quantidade do produto alterada.');
    } else {
        res.status(404).send('Produto não encontrado.');
    }
});

app.listen(3000, () => {
    console.log('Aplicativo web iniciado em http://localhost:3000');
});
