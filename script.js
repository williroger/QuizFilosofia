// Carregar perguntas do JSON
const perguntasJSON = fetch("perguntas.json")
  .then((response) => response.json())
  .then((data) => data);

let perguntas = []; // Array para armazenar as perguntas

// Função para carregar perguntas do JSON
async function carregarPerguntas() {
  perguntas = await perguntasJSON;
}

let perguntaAtual = 0;
let acertos = 0;

// ... (seleção de elementos do DOM)

botaoIniciar.addEventListener("click", () => {
  carregarPerguntas().then(() => {
    telaApresentacao.classList.add("hidden");
    telaPerguntas.classList.remove("hidden");
    carregarPergunta();
    atualizarBarraProgresso();
  });
});

function carregarPergunta() {
  if (perguntaAtual < perguntas.length) {
    perguntaElement.textContent = perguntas[perguntaAtual].pergunta;
  } else {
    exibirTelaResultado();
  }
}

function atualizarBarraProgresso() {
  const progresso = (perguntaAtual + 1) / perguntas.length;
  barraProgresso.style.width = `${progresso * 100}%`;
}

function verificarResposta(respostaSelecionada) {
  const respostaCorreta = perguntas[perguntaAtual].resposta;
  if (respostaSelecionada === respostaCorreta) {
    acertos++;
  }
  perguntaAtual++;
}

botaoVerdadeiro.addEventListener("click", () => {
  verificarResposta(true);
  carregarPergunta();
  atualizarBarraProgresso();
});

botaoFalso.addEventListener("click", () => {
  verificarResposta(false);
  carregarPergunta();
  atualizarBarraProgresso();
});

function exibirTelaResultado() {
  telaPerguntas.classList.add("hidden");
  telaResultado.classList.remove("hidden");

  // Atualiza o feedback com o número de acertos e frase personalizada
  let feedback = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;

  // Adiciona um emoji de acordo com o desempenho
  if (acertos === perguntas.length) {
    feedback += " Parabéns! Você domina a filosofia antiga!";
  } else if (acertos > perguntas.length / 2) {
    feedback += " Você está no caminho certo! Continue estudando!";
  } else {
    feedback += " Não desanime! Revise o conteúdo e tente novamente.";
  }

  feedbackElement.textContent = feedback;
}

botaoReiniciar.addEventListener("click", () => {
  perguntaAtual = 0;
  acertos = 0;
  telaResultado.classList.add("hidden");
  telaApresentacao.classList.remove("hidden");
  atualizarBarraProgresso();
});
