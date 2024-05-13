import { Component, Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog,} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { DatabaseService } from '../services/database.service';
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { SetTabIndexService } from '../services/set-tab-index.service';
import { SetHeaderService } from '../services/set-header.service';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, CommonModule, RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  taskData:any;
  userData:any;
  loading: boolean = false;
  constructor(public db: Firestore, public dialog: MatDialog, public database: DatabaseService, public tabIndex: SetTabIndexService, public setHeader: SetHeaderService) {}

  async ngOnInit(): Promise<void>{
    await this.getAllTasks('tasks');

  }

  async getAllTasks(tasks: string) {
    this.loading = true;
    try {
      const tasksCollectionRef = collection(this.db, tasks);
      this.getTaskDataOnSnapshot(tasksCollectionRef);
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Daten:', error);
    }
  }

  getTaskDataOnSnapshot(tasksCollectionRef: any){
    onSnapshot(
      tasksCollectionRef,
      (snapshot: { docs: any[] }) => {
        this.taskData = snapshot.docs.map( (doc) => {
          const taskData = doc.data();
          return {
            taskId: doc.id,
            status: taskData['status'],
            note: taskData['note'],
            customerId: taskData['customerId'],
            customerName: taskData['customerName']
          };
          
          
        });
        console.log(this.taskData)
        //this.filterUsers();
        this.loading = false;
      },
      (error) => {
        console.error('Fehler beim laden der User Daten:', error);
        this.loading = false;
      }
    );
  };

  async setTabIndex(index: any){
    await this.tabIndex.setTabToIndex(index);
  }

  async setNewHeader(newHeader:string){
    await this.setHeader.updateHeader(newHeader);
  }

}