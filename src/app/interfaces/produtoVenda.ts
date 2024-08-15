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

  //Usado no Caixa
  export interface Caixa {
    id?: number,
    abertura_data: Date | null,
    abertura_valor: number,
    despesas_caixa: number,
    entrada: number,
    fechamento_caixa_data: Date | null,
    fechamento_caixa_valor: number,
    credito_conferido: number,
    debito_conferido: number,
    dinheiro_conferido: number,
    pix_conferido: number,
    fiado_conferido: number,
    status: string
  }

  //Usado para formulario cadastro tutor
  export interface Tutor {
    id?: number,
    nome: string,
    cpf: string,
    email: string
    telefone: string,
    celular: string,
    endereco: Endereco,
    //servicos: Servicos[],
    animais: Animais[]
  }
  export interface Endereco {
    id?: number,
    cep: string,
    uf: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero: string,
    complemento: string,
  }
  export interface Animais {
    id?: number,
    nome: string,
    raca: string,
    cor: string,
    pelagem: string,
    dataDeNascimento: Date,
    peso: number,
    obs: string,
    tutor?: Tutor;
  }
