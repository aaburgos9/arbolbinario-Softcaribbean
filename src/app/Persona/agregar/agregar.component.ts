import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  form: any;
  constructor(private router: Router, private service: ServiceService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
    })



  }
  onSubmit() {
    this.service.crearCliente(this.form.value).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'guardado con exito!!',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/listar']);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear registro el documento es obligatorio',
        footer: '<p>' + error.message + '</p>'
      })
    }
    );
  }

}
