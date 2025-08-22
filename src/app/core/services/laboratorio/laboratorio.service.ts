import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {
  constructor() { }
  private http = inject(HttpClient);
  private URLbase = environment.apiURL + '/Laboratorio';

  public getPacientes() {
    return this.http.get<any[]>(`${this.URLbase}/listaPacientes`);
  }

  public getExamen() {
    return this.http.get<any[]>(`${this.URLbase}/listaExamenes`);
  }

  public getOrdenes() {
    return this.http.get<any[]>(`${this.URLbase}/listaOrdenes`);
  }

  public crearOrden(ordenData: any) {
    return this.http.post(`${this.URLbase}/crearOrden`, ordenData);
  }

}
