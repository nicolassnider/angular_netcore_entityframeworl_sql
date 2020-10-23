import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TarjetaCredito } from '../models/tarjetaCredito';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  myAppUrl = 'https://localhost:44338/';
  myApiUrl = 'api/TarjetaCredito';
  list: TarjetaCredito[];

  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    console.log(this.myAppUrl + this.myApiUrl);
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl, tarjeta);
  };

  eliminarTarjeta(id: number): Observable<TarjetaCredito> {
    return this.http.delete<TarjetaCredito>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  obtenerTarjetas() {
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
      .then(data => {
        this.list = data as TarjetaCredito[]
      });
  };

  actualizarTarjeta(id:number, tarjeta:TarjetaCredito): Observable<TarjetaCredito>{
    return this.http.put<TarjetaCredito>(`${this.myAppUrl}${this.myApiUrl}/${id}`,tarjeta)
  }

  actualizar(tarjeta) {
    this.actualizarFormulario.next(tarjeta);
  };

  obtenerTarjeta(): Observable<TarjetaCredito>{
    return this.actualizarFormulario.asObservable();
  }
}

