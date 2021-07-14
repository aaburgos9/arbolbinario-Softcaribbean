
import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { Cliente } from '../../Model/Cliente';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  @Input() cliente: Cliente = new Cliente();


  constructor(private service: ServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.Editar();
  }

  Editar() {
    let documento = localStorage.getItem('documento') ?? '' ;
    this.service.getClienteByDocumento(documento).subscribe(data => {
      this.cliente = data;
    });
  }


  form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
  })

  ngOnChanges(){
    this.form.get('nombre')?.setValue(this.cliente.nombre);
    this.form.get('nombre')?.setValue(this.cliente.direccion);
    this.form.get('nombre')?.setValue(this.cliente.documento);
    this.form.get('nombre')?.setValue(this.cliente.correo);
  }



  Actualizar(){
    this.form.get('id')?.setValue(this.cliente.documento);
    this.service.actualizarCliente(this.form.value).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado con exito!!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/listar']);
    })

  }
}
