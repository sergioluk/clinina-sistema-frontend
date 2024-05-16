export interface CadastroProduto {
    id?: number
    codigoDeBarras: string
    categoria: string
    produto: string
    imagens: string[]
    sabor: string
    idade: string
    preco: number
    precoCompra: number
    peso: string
    desconto: number
    animal: string
    castrado: boolean
    porte: string
    informacao: string[]
    fornecedor: string
    estoque: number
    imagemP: string

    /*
    porte: string
    corante: boolean
    tipoDaRacao: string
    raca: string
    transgenico: boolean
    indicacao: string
    marca: string
    linha: string
    */
  }
  export interface Categoria {
    id?: number
    nome: string
  }

  //nao ta sendo usado
  export interface Venda {
    id: number
    codigoDeBarras: string
    produto: string
    preco: number
    imagemP: string
  }

  //usado só na tabela de venda
  export interface VendaComQtd {
    id: number
    codigoDeBarras: string,
    produto: string,
    preco: number,
    imagemP: string,
    peso: string,
    quantidade: number
  }

  //usado para guardar no banco
  export interface Vender {
    id?: number
    produto_id: number
    quantidade: number
    precoUnitario: number
    precoTotal: number
    peso: string
    data: Date
    pagamento: string
    desconto: number
    nome?: string
    telefone?: string
    endereco?: string
  }

  //salvar no banco um sabor
  export interface Sabor {
    id?: number
    nome: string
  }

  //salvar no banco um sabor
  export interface Idade {
    id?: number
    nome: string
  }

  //salvar no banco um sabor
  export interface Fornecedor {
    id?: number
    nome: string
  }

  //Para o relatório
  export interface Relatorio {
    id?: number
    imagemP: string
    produto: string
    quantidade: number
    precoUnitario: number
    precoTotal: number
    peso: string
    data: Date
  }

  //Para o relatório de fiado
  export interface RelatorioFiado {
    id?: number
    nome: string
    telefone: string
    endereco: string
    data: Date
    valorTotal: number
    itens: Itens[]
    pagou: number
  }
  //para ser usado nos itens de cada fiado
  export interface Itens {
    id: number
    produto: string,
    precoUnitario: number,
    imagemP: string,
    peso: string,
    quantidade: number,
    data: Date
    precoTotal: number
  }

  //usado para editar a situação de fiado
  export interface Fiado {
    id?: number
    pagou: number
  }
