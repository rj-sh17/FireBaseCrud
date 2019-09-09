import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudServiceService } from './crud-service.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('std', null) std: NgForm;
  title = 'Student Detail';
  students: any;
  closeResult: string;
  Name: string;
  Age: number;
  Address: string;
  modal = null;
  profileForm: any;
  selectedId: null;
  titleNew: any;
  constructor(private crudService: CrudServiceService, private modalService: NgbModal) {
    this.ngOnit();
    this.profileForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Age: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
    });
  }

  ngOnit() {
    this.crudService.read_Students().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Age: e.payload.doc.data()['Age'],
          Address: e.payload.doc.data()['Address'],
        };
      });
      console.log(this.students);
    });
  }

  // Create Student Detail

  CreateRecord(modalName) {
    let record = {};
    record['Name'] = this.profileForm.controls.Name.value;
    record['Age'] = this.profileForm.controls.Age.value;
    record['Address'] = this.profileForm.controls.Address.value;
    if (!this.selectedId) {
      this.crudService.create_NewStudent(record).then(resp => {
        this.Name = '';
        this.Age = null;
        this.Address = '';
        this.closeModal(modalName);
      });
    } else {
      this.UpdateRecord(record);
      this.closeModal(modalName);
    }
  }
  // close modal
  closeModal(modalName) {
    this.modal = document.getElementById(modalName);
    this.modal.style.display = 'none';
    this.modal = null;
  }

  // for Edit Details

  EditRecord(modalName, record) {
    this.selectedId = record.id;
    this.titleNew = record.Name;
    this.profileForm.controls.Name.setValue(record.Name);
    this.profileForm.controls.Address.setValue(record.Address);
    this.profileForm.controls.Age.setValue(record.Age);
    this.modal = document.getElementById(modalName);
    this.modal.style.display = 'block';
  }

  UpdateRecord(recordRow) {
    this.crudService.update_Student(this.selectedId, recordRow);
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }


}
