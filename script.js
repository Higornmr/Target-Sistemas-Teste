// Funções relacionadas às técnicas
function calculateSoma() {
    let INDICE = 13;
    let SOMA = 0;
    let K = 0;

    while (K < INDICE) {
        K += 1;
        SOMA += K;
    }
    return `Valor final de SOMA: ${SOMA}`;
}

function isFibonacci(num) {
    let a = 0, b = 1, temp;

    if (num === 0 || num === 1) {
        return `${num} pertence à sequência de Fibonacci.`;
    }

    while (b < num) {
        temp = b;
        b = a + b;
        a = temp;
    }

    return b === num
        ? `${num} pertence à sequência de Fibonacci.`
        : `${num} não pertence à sequência de Fibonacci.`;
}

async function carregarDados() {
    try {
        const resposta = await fetch('./dados.json');
        const faturamentoMensal = await resposta.json();

        return calcularFaturamento(faturamentoMensal);
    } catch (erro) {
        return `Erro ao carregar os dados: ${erro}`;
    }
}

function calcularFaturamento(faturamento) {
    const valoresValidos = faturamento.filter(d => d.valor > 0).map(d => d.valor);

    const menorValor = Math.min(...valoresValidos);
    const maiorValor = Math.max(...valoresValidos);

    const soma = valoresValidos.reduce((acc, cur) => acc + cur, 0);
    const media = soma / valoresValidos.length;

    const diasAcimaDaMedia = valoresValidos.filter(valor => valor > media).length;

    return `
        Menor valor de faturamento: ${menorValor}
        Maior valor de faturamento: ${maiorValor}
        Número de dias acima da média: ${diasAcimaDaMedia}
    `;
}

function calcularPercentual(faturamento) {
    const total = Object.values(faturamento).reduce((acc, cur) => acc + cur, 0);
    let resultado = "";

    for (const estado in faturamento) {
        const percentual = ((faturamento[estado] / total) * 100).toFixed(2);
        resultado += `${estado}: ${percentual}%\n`;
    }
    return resultado;
}

function inverterString(str) {
    let invertida = "";
    for (let i = str.length - 1; i >= 0; i--) {
        invertida += str[i];
    }
    return `String invertida: ${invertida}`;
}

// Vinculando funções aos botões
document.querySelector('.primeira').addEventListener('click', () => {
    document.querySelector('.resultado').textContent = calculateSoma();
});

document.querySelector('.segunda').addEventListener('click', () => {
    const num = 21; // Altere aqui para testar outros números
    document.querySelector('.resultado').textContent = isFibonacci(num);
});

document.querySelector('.terceira').addEventListener('click', async () => {
    const resultado = await carregarDados();
    document.querySelector('.resultado').textContent = resultado;
});

document.querySelector('.quarta').addEventListener('click', () => {
    const faturamentoPorEstado = {
        SP: 67836.43,
        RJ: 36678.66,
        MG: 29229.88,
        ES: 27165.48,
        Outros: 19849.53
    };
    document.querySelector('.resultado').textContent = calcularPercentual(faturamentoPorEstado);
});

document.querySelector('.quinta').addEventListener('click', () => {
    const texto = "OpenAI"; // Altere aqui para testar outras strings
    document.querySelector('.resultado').textContent = inverterString(texto);
});
