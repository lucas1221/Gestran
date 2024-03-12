import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormularioComponent, Pessoa } from './formulario/formulario.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  pessoas: Pessoa[] = [];
  filtro = new FormControl('');

  displayedColumns: string[] = ['actions', 'nome', 'email', 'senha', 'cep', 'logradouro'];
  dataSource = this.pessoas;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.filtro.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => this.filtrarPessoas(value));
  }

  filtrarPessoas(filtro: string) {
    this.dataSource = this.pessoas.filter(pessoa => pessoa.nome.includes(filtro));
  }

  adicionar() {
    const dialogRef = this.dialog.open(FormularioComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pessoas.push(result);
        this.dataSource = [...this.pessoas];
      }
    });
  }

  editar(pessoa: Pessoa) {
    // Abre o diálogo de formulário com os dados da pessoa a ser editada
    const dialogRef = this.dialog.open(FormularioComponent, {
      data: pessoa
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Encontra o índice da pessoa na lista de pessoas
        const index = this.pessoas.indexOf(pessoa);
        if (index >= 0) {
          // Atualiza a pessoa na lista de pessoas
          this.pessoas[index] = result;
          this.dataSource = [...this.pessoas];
        }
      }
    });
  }
  

  remover(pessoa: Pessoa) {
    const index = this.pessoas.indexOf(pessoa);
    if (index >= 0) {
      this.pessoas.splice(index, 1);
      this.dataSource = [...this.pessoas];
    }
  }
}


