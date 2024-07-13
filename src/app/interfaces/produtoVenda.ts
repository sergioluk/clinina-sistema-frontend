//usado só na tabela de venda, pagina de Venda
export interface ProdutoVenda {
    id: number
    codigoDeBarras: string,
    produto: string,
    preco: number,
    imagemP: string,
    peso: string,
    quantidade: number,
    desconto: number,
    precoCompra: number
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

  //Usado nos selects de formulários
  export interface ListaId {
    id?: number
    nome: string
  } 

  export interface DetalhesProduto {
    id?: number
    produto: string
    codigoDeBarras: string,
    categoria: string,
    sabor: string,
    idade: string,
    precoCompra: number
    preco: number
    desconto: number
    estoque: number
    quantidadeVendido: number
    animal: string
    peso: string
    porte: string
    fornecedor: string
    castrado: number
    imagemP: string
    valorVendaEstoque: number
    valorCustoEstoque: number
    linhaDoTempo: LinhaDoTempo[]
    valorUltimaCompra: number
  }
  //Usado no DetalhesProduto interface
  export interface LinhaDoTempo {
    id: number,
    precoVenda: number,
    quantidade: number,
    dataVenda: Date
  }
