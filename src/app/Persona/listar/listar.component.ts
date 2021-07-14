import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service';
import { Cliente } from '../../Model/Cliente';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  clientes: Cliente[];
  documento: string;


  constructor(private service: ServiceService, private router: Router) {
    this.clientes = [];
    this.documento = '';
  }

  ngOnInit(): void {
    this.ListarInOrden();
  }

  ListarInOrden() {
    this.service.getClientesInOrden().subscribe(data => {
      this.clientes = data;
    });
  }

  ListarPreOrden() {
    this.service.getClientesPreOrden().subscribe(data => {
      this.clientes = data;
    });
  }

  BuscarByDocumento() {
    if (!this.documento) {
      return;
    }
    this.documento = this.documento.toString().replace(/[^0-9]/g, '');

    this.service.getClienteByDocumento(this.documento).subscribe(data => {
      this.clientes = [data];
    });
  }

  Editar(cliente: Cliente) {
    localStorage.setItem('documento', cliente.documento.toString());
    this.router.navigate(['editar']);
  }
}
