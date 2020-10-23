import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-list-tarjeta-credito',
	templateUrl: './list-tarjeta-credito.component.html',
	styleUrls: ['./list-tarjeta-credito.component.scss']
})
export class ListTarjetaCreditoComponent implements OnInit {

	constructor(public tarjetaService: TarjetaService,
		private toastrService: ToastrService) { }

	ngOnInit(): void {
		this.tarjetaService.obtenerTarjetas();
	}

	eliminarTarjeta(id: number) {
		if (confirm('¿Esta seguro de eliminar esta tarjeta?')) {
			this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
				this.toastrService.warning('Registro eliminado', 'Tarjeta eliminada');
				this.tarjetaService.obtenerTarjetas();
			})
		}
	};

	editar(tarjeta){
		this.tarjetaService.actualizar(tarjeta);
	}

}
