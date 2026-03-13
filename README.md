# Venda de Mudança

Apresentação em slides HTML dos itens à venda em português. Publicada no GitHub Pages.

## Estrutura do Projeto

```
venda-mudanca/
├── index.html      # Estrutura da apresentação (slides, itens, imagens)
├── style.css       # Estilos visuais
├── script.js       # Navegação, carregamento de status
├── status.json     # Status de cada item (à venda / vendido) — EDITAR AQUI
├── images/         # Fotos dos itens (não renomear)
├── items_to_sell   # Lista original de itens (referência)
└── README.md
```

## Atualizar Status de Itens (Para Agentes LLM)

### Arquivo a editar

**Arquivo:** `status.json`

### Schema

Cada chave é o ID do item (1–18). O valor é um objeto com:
- `name` (string): nome do item — não alterar
- `sold` (boolean): `false` = à venda, `true` = vendido

### Procedimento para marcar item como vendido

1. Abrir `status.json`
2. Localizar o objeto do item pelo ID (consulte o mapeamento abaixo)
3. Alterar apenas `"sold": false` para `"sold": true`
4. Manter `name` e a estrutura JSON inalterados

### Mapeamento ID → Item

| ID | Item |
|----|------|
| 1 | Fogão Brastemp 4 bocas |
| 2 | Depurador Electrolux |
| 3 | Geladeira Consul |
| 4 | Microondas Electrolux 30L |
| 5 | Máquina lavar LG |
| 6 | Estante Tok Stok |
| 7 | Buffet |
| 8 | Móvel escrivaninha |
| 9 | Móvel apoio café |
| 10 | Baú |
| 11 | Sofá |
| 12 | Rack |
| 13 | Painel |
| 14 | Cômoda espelho |
| 15 | Armário baixo Tok Stok 2 portas |
| 16 | Armário alto Tok Stok 2 portas |
| 17 | Armário infantil 4 portas |
| 18 | Cômoda |

### Exemplo de edição

**Antes (item 11 à venda):**
```json
"11": {
  "name": "Sofá",
  "sold": false
}
```

**Depois (item 11 vendido):**
```json
"11": {
  "name": "Sofá",
  "sold": true
}
```

### O que não alterar

- Não alterar `index.html`, `style.css` ou `script.js` para atualizar status
- Não alterar o campo `name` em `status.json`
- Não adicionar ou remover itens em `status.json`
- Não renomear arquivos em `images/`

---

## Rodar localmente

```bash
npx -y serve -l 3000
```

Acesse http://localhost:3000 no navegador.

---

## Como usar (Usuário final)

- **Navegação:** Setas ← → do teclado, botões laterais ou clique na tela
- **Mobile:** Deslize para esquerda/direita
- **Índice:** Clique nos itens para ir ao slide correspondente

