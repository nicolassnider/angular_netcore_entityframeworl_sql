import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TarjetasComponent } from '../tarjetas.component';
import { TarjetaService } from '../../../services/tarjeta.service';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-tarjeta-credito',
	templateUrl: './tarjeta-credito.component.html',
	styleUrls: ['./tarjeta-credito.component.scss']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

	form:FormGroup;
	subscription: Subscription;
	tarjeta:TarjetaCredito;
	idTarjeta = 0;

	constructor(private formBuilder:FormBuilder, 
				private tarjetaService:TarjetaService,
				private toastrService: ToastrService) {
		this.form = this.formBuilder.group({
			id:0,
			titular: ['',[Validators.required]],
			numeroTarjeta: ['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
			fechaExpiracion:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
			cvv:['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]],
		})
	 }

	ngOnInit(): void {
		this.subscription = this.tarjetaService.obtenerTarjeta().subscribe(
			data=>{
				this.tarjeta=data;
				this.form.patchValue({
					titular: this.tarjeta.titular,
					numeroTarjeta: this.tarjeta.numeroTarjeta,
					fechaExpiracion:this.tarjeta.fechaExpiracion,
					cvv:this.tarjeta.cvv,
				});
				this.idTarjeta=this.tarjeta.id;
			}
		)
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

	guardarTarjeta(){

		this.idTarjeta===0?this.agregar():this.editar()
		
	}

	agregar(){
		const tarjeta: TarjetaCredito = {
			titular: this.form.get('titular').value,
			numeroTarjeta: this.form.get('numeroTarjeta').value,
			fechaExpiracion: this.form.get('fechaExpiracion').value,
			cvv: this.form.get('cvv').value,

		}
		this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data=>{
			this.toastrService.success('Registro con Suceso', 'Tarjeta agregada');
			this.tarjetaService.obtenerTarjetas();
			this.form.reset();
		})
	}

	editar(){
		const tarjeta: TarjetaCredito = {
			titular: this.form.get('titular').value,
			numeroTarjeta: this.form.get('numeroTarjeta').value,
			fechaExpiracion: this.form.get('fechaExpiracion').value,
			cvv: this.form.get('cvv').value,
			id:this.tarjeta.id,

		}
		this.tarjetaService.actualizarTarjeta(this.idTarjeta,tarjeta).subscribe(data=>{
			this.toastrService.info('Registro actualizado', 'Tarjeta actualizada');
			this.tarjetaService.obtenerTarjetas();
			this.form.reset();
			this.idTarjeta=0;
		})
	}

}
