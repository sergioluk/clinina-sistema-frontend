//usado só na tabela de venda, pagina de Venda
export interface ProdutoVenda {
    id: number
    codigoDeBarras: string,
    produto: string,
    preco: number,
    imagemP: string,
    peso: string,
    quantidade: number,
    desconto: number
  }

  //usado para guardar no banco
  export interface VenderMudarDepois {
    id?: number
    produto_id: number
    quantidade: number
    precoUnitario: number
    precoTotal: number
    peso: string
    data: Date
    pagamento: string
    nome?: string
    telefone?: string
    endereco?: string
  }