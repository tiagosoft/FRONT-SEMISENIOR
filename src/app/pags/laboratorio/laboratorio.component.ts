import { Component } from '@angular/core';
import { LaboratorioService } from 'src/app/core/services/laboratorio/laboratorio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent {
  //pacientes
  pacientes: any[] = [];
  selectPaciente:any;
  //examenes
  examenes: any[] = [];
  selectExamen:any;
  //ordenes
  ordenes: any[] = [];
  fecha = new Date();
  //formulario
  ordenForm: FormGroup;
  //
  displayedColumns: string[] = ['Orden','Fecha', 'idPaciente', 'idExamen'];
  constructor(private laboratorioService: LaboratorioService, private fb: FormBuilder) {
    this.ordenForm = this.fb.group({
      nombre: ['', Validators.required],
      examen: ['', [Validators.required]],
      fecha: [this.fecha]
    });
  }

  ngOnInit(): void {
    this.getPatients();
    this.getExamns();
    this.getOrdenes();
  }
  //metodo para obtener pacientes
  getPatients() {
    this.laboratorioService.getPacientes().subscribe(resp => {
      this.pacientes = resp;
      console.log(this.pacientes);
    });
  }
  //metodo para obtener examenes
  getExamns() {
    this.laboratorioService.getExamen().subscribe(resp => {
      this.examenes = resp;
      console.log(this.examenes);
    });
  }
  //metodo para obtener ordenes
  getOrdenes() {
    this.laboratorioService.getOrdenes().subscribe(resp => {
      this.ordenes = resp;
      console.log(this.ordenes);
    });
  }
  //metodo para guardar ordenes
  guardarOrden() {
    const ordenEnviar={
      IdPaciente:this.selectPaciente,
      IdExamen:this.selectExamen,
      FechaOrden:this.fecha
    };
    console.log(ordenEnviar);

  this.laboratorioService.crearOrden(ordenEnviar).subscribe(
    response => {
      console.log('Paciente guardado:', response);
      this.getPatients();
      this.ordenForm.reset();
      //se llaman las ordenes de nuevo
      this.getOrdenes();
    },
    error => {
      console.error('Error al guardar el paciente:', error);
    }
  );
  }
  //metodo para cambio de paciente
  ChangePaciente(e: any){
    console.log(e.target.value)
    this.selectPaciente=e.target.value;
  }
  //metodo para cambio de examen
  ChangeExamen(e: any){
    console.log(e.target.value)
    this.selectExamen=e.target.value;
  }
}
