export interface CadastroProduto {
    id?: number
    codigoDeBarras: string
    categoria: string
    produto: string
    imagens: string[]
    sabor: string
    idade: string
    preco: number
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
    quantidade: number
  }

  export interface Vender {
    id?: number
    produto_id: number
    quantidade: number
    precoUnitario: number
    precoTotal: number
    data: Date
  }
