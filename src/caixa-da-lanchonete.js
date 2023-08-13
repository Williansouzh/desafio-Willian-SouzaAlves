class CaixaDaLanchonete {
  menu = [
    { codigo: "cafe", descricao: "Café", valor: 3.0 },
    { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.5 },
    { codigo: "suco", descricao: "Suco Natural", valor: 6.2 },
    { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.5 },
    { codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2.0 },
    { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
    { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
    { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
  ];

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorFinal = 0;
    let newArrayItens = [];

    for (const item of itens) {
      const [descricao, quantidade] = item.split(",");
      const menuEntry = this.menu.find((e) => e.codigo === descricao.trim());

      if (!menuEntry) {
        return "Item inválido!";
      }

      newArrayItens.push({ ...menuEntry, quantidade: parseInt(quantidade) });
    }

    const quantidadeTotal = newArrayItens.reduce(
      (acc, item) => acc + item.quantidade,
      0
    );

    if (quantidadeTotal <= 0) {
      return "Quantidade inválida!";
    }
    //parte que eu achei mais complicada
    for (const item of newArrayItens) {
      let descricao = item.descricao;
      const start = descricao.indexOf("(");
      const end = descricao.indexOf(")");

      let descricaoExtra = descricao.substring(start + 1, end);
      descricaoExtra = descricaoExtra
        .split(" ")
        .pop()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();
      console.log(descricaoExtra);
      if (
        descricaoExtra &&
        !newArrayItens.some((e) => e.codigo === descricaoExtra)
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    valorFinal = newArrayItens.reduce(
      (acc, item) => acc + item.valor * item.quantidade,
      0
    );

    switch (metodoDePagamento) {
      case "dinheiro":
        valorFinal = (valorFinal - valorFinal * 0.05).toFixed(2);
        break;
      case "credito":
        valorFinal = (valorFinal + valorFinal * 0.03).toFixed(2);
        break;
      case "debito":
        break;
      default:
        return "Forma de pagamento inválida!";
    }

    return parseFloat(valorFinal).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}

export { CaixaDaLanchonete };
