import { Component, OnInit, Input, ContentChild , AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';


@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styleUrls: []
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string
  @Input() errorMessage: string

  input: any
  

  //coloca o conteudo html numa variavel interna, no caso foi o NgModel(input)  
  @ContentChild(NgModel) model : NgModel
  //adiciona form control
  @ContentChild(FormControlName) control : FormControlName

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    //se usar control name, verificar também o control
    this.input = this.model || this.control
    if(this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
