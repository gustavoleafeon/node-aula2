import express from "express";
import pets from "./pets.js";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (requisicao, resposta) => {
  resposta.send(pets);
});

app.get("/:nome", (requisicao, resposta) => {
  const nomeInformado = requisicao.params.nome.toLowerCase();
  const pet = pets.find((infoPet) => infoPet.nome === nomeInformado);

  if (pet === undefined) {
    resposta.status(404).send("Pet requistado não encontrado");
  }

  resposta.send(pet);
});

// app.get("/:tutor", (requisicao, resposta) => {
//   const tutorInformado = requisicao.params.tutor.toLowerCase();
//   const pet = pets.find((infoPet) => infoPet.tutor === tutorInformado);

//   resposta.send(pet);
// });

app.put("/:nome", (req, res) => {
  const nomeInformado = req.params.nome.toLowerCase();
  const nomeSelecoinado = pets.find((Pet) => Pet.nome === nomeInformado);
  const campos = Object.keys(req.body);

  for (let campo of campos) {
    nomeSelecoinado[campo] = req.body[campo];
  }

  if (pet === undefined) {
    resposta.status(404).send("Pet requistado não encontrado");
  }

  res.status(200).send(nomeSelecoinado);
});

app.post("/", (req, res) => {
  const novoPet = req.body;
  pets.push(novoPet);
  res.status(201).send(novoPet);
});

app.delete("/:nome", (req, res) => {
  const nomeInformado = req.params.nome.toLowerCase();
  const indicePetSelecionado = pets.findIndex(
    (pet) => pet.nome === nomeInformado,
  );

  if (indicePetSelecionado === -1) {
    res.status(404).send("Não existe pet informado");
    return;
  }
  const petRemovido = pets.splice(indicePetSelecionado, 1);
  res.status(200).send(petRemovido);
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
