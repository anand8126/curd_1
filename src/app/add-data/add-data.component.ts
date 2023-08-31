import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddService } from 'src/service/add.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css'],
})
export class AddDataComponent implements OnInit {
  detail: FormGroup;
  listOfData: any;
  id: any;

  constructor(
    private service: AddService,
    private fb: FormBuilder,
    private router: ActivatedRoute
  ) {
    this.detail = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.service.getdata().subscribe((Response) => {
      this.listOfData = Response;
      console.log(this.listOfData);
    });
  }

  addData() {
    this.service.Add(this.detail.value).subscribe(() => {
      this.get();
      alert('Add Data Successfully!');
      this.detail.reset();
    });
  }

  deleteData(data: any) {
    this.service.DeletedData(data).subscribe(() => {
      alert('Deleted Data');
      this.get();
    });
  }
  getId(e: any) {
    console.log('get id', this.listOfData);
    console.log(e);
    this.detail = this.fb.group({
      name: [this.listOfData[0].name, Validators.required],
      email: [
        this.listOfData[0].email,
        [Validators.required, Validators.email],
      ],
      message: [this.listOfData[0].message, Validators.required],
    });

    this.detail.value.id = e;
  }

  onSubmit() {
    console.log(this.detail.value);

    console.log(this.listOfData);

    this.service.updated(this.id,this.detail.value).subscribe((ans) => {
      alert("data update");
    });
  }
}
