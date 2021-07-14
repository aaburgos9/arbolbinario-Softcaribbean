import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../Model/Cliente';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  getClientesInOrden() {
    let url = 'http://localhost:8080/api/arbol_inorden';

    return this.http.get<Cliente[]>(url);
  }

  getClientesPreOrden() {
    let url = 'http://localhost:8080/api/arbol_preorden';

    return this.http.get<Cliente[]>(url);
  }

  getClienteByDocumento(documento: string): Observable<Cliente> {
    let url = `http://localhost:8080/api/nodo_by_documento/${documento}`;

    return this.http.get<Cliente>(url);
  }

  crearCliente(cliente: Cliente) {
    let url = 'http://localhost:8080/api/add_nodo';

    return this.http.post<Cliente>(url, cliente);
  }

  actualizarCliente(cliente: Cliente) {
    let url = `http://localhost:8080/api/edit_nodo/${cliente.documento}`;

    return this.http.put<Cliente>(url, cliente);
  }
}
