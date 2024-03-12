import { Component, OnInit } from '@angular/core';

class Publicacao {
  readonly titulo: string;
  readonly autor: string;
  readonly anoPublicacao: number;

  constructor(titulo: string, autor: string, anoPublicacao: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
  }

  descricao(): string {
    return `Titulo: ${this.titulo}, Autor: ${this.autor}, Ano de Publicacao: ${this.anoPublicacao}`;
  }
}

class Livro extends Publicacao {
  readonly ISBN: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISBN: string) {
    super(titulo, autor, anoPublicacao);
    this.ISBN = ISBN;
  }

  descricao(): string {
    return super.descricao() + `, ISBN: ${this.ISBN}`;
  }
}

class Periodico extends Publicacao {
  readonly ISSN: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISSN: string) {
    super(titulo, autor, anoPublicacao);
    this.ISSN = ISSN;
  }

  descricao(): string {
    return super.descricao() + `, ISSN: ${this.ISSN}`;
  }
}

@Component({
  selector: 'app-a1.5-classe',
  templateUrl: './a1.5-classe.component.html',
  styleUrls: ['./a1.5-classe.component.scss']
})
export class A15ClasseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
