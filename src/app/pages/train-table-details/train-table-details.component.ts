import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-train-table-details',
  imports: [MatTableModule, MatButtonModule, MatExpansionModule],
  templateUrl: './train-table-details.component.html',
  styleUrl: './train-table-details.component.scss'
})
export class TrainTableDetailsComponent {
  @Input({ required: true }) trainInfo!: any;
  @Input({ required: true }) serchigValue = signal<any>(null);
  @Input({ required: true }) isOpenComponent = signal<string>(null);

  displayedColumns = ['fromTo', 'Parbatipur', 'Fulbari', 'BiramPur', 'Joypurhat', 'Joypurhat1', 'Joypurhat2', 'Joypurhat3', 'Akkelpur', 'Santahar', 'Ahsanganj', 'Natore', 'Muladuli', 'Ibrahimabad'];
  dataSource = [
    {
      fromTo: 'Joypurhat',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '৳65', Natore: '৳95', Muladuli: '', Ibrahimabad: ''
    },
    {
      fromTo: 'Santahar',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '৳55', Ibrahimabad: ''
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
    {
      fromTo: 'Natore',
      Parbatipur: '', Fulbari: '', BiramPur: '', Joypurhat: '', Joypurhat1: '', Joypurhat2: '', Joypurhat3: '', Akkelpur: '', Santahar: '', Ahsanganj: '', Natore: '', Muladuli: '', Ibrahimabad: '৳50'
    },
  ];

  getDisplayedColumns() {
    return this.displayedColumns.filter(col => col !== 'fromTo');
  }

}
