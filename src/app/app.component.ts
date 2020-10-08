import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { PersonasService } from './personas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  datos: any[] = [];
  personas: any[] = [];

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    edad: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    sexo: new FormControl('Hombre', [Validators.required]),
    documento: new FormControl(''),
  });

  constructor(protected personasService: PersonasService) { }

  ngOnInit() {

    this.personasService.getPersonas()
      .subscribe((data) => {

        if (localStorage.getItem('personas')) {
          let parsedPersonas = JSON.parse(localStorage.getItem('personas'));
          this.personas = parsedPersonas
        } else {
          this.datos = data['results'][0]['personas'];
          localStorage.setItem('personas', JSON.stringify(this.datos));
          this.personas = this.datos
        }

      },
        (error) => {
          console.error(error);
        });
  }

  onSubmit() {

    if (this.formulario.invalid) {
      return;
  }

    let storagePersonas = localStorage.getItem('personas')

    let parsedPersonas = JSON.parse(storagePersonas)

    parsedPersonas.push(this.formulario.value);

    localStorage.setItem('personas', JSON.stringify(parsedPersonas));

    this.personas = parsedPersonas;
  }

  get f(){
    return this.formulario.controls;
  }

}
