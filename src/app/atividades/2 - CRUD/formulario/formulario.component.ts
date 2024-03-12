import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface Pessoa {
  nome: string;
  email: string;
  senha: string;
  cep: string;
  logradouro: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {  
  form = new FormGroup({
    nome: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    senha: new FormControl("", Validators.required),
    cep: new FormControl("", Validators.required),
    logradouro: new FormControl({value: "", disabled: true}, Validators.required),
  })

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<FormularioComponent>) { }

  ngOnInit(): void {
    this.form.get('cep').valueChanges.subscribe(cep => {
      if (cep.length === 8) {
        this.buscarCep(cep);
      }
    });
  }

  buscarCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    this.http.get(url).subscribe((data: any) => {
      this.form.get('logradouro').setValue(data.logradouro);
    });
  }

  salvar() {
    if (this.form.valid) {
      const novaPessoa: Pessoa = {
        nome: this.form.get('nome').value,
        email: this.form.get('email').value,
        senha: this.form.get('senha').value,
        cep: this.form.get('cep').value,
        logradouro: this.form.get('logradouro').value,
      };
      this.dialogRef.close(novaPessoa);
    } else {
      alert('Formulário inválido');
    }
  }
}


