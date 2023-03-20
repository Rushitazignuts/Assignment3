import { Component, OnInit } from '@angular/core';
import { GetdataService } from './getdata.service';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { udata } from 'src/userdata';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  add = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    website: new FormControl(''),
    id: new FormControl(''),
    username: new FormControl(''),
  });

  form!: FormGroup;
  

  icon = faEnvelope;
  icon1 = faPhone;
  icon2 = faGlobe;
  icon3 = faFilePen;
  icon4 = faTrash;
  icon5 = faHeart;
  getData: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private username: GetdataService
  ) {
    this.username.getData().subscribe((data) => {
      // console.log(data);
      this.getData = data;
    });
  }
  ngOnInit() {}

  fillColor(users: any) {
    console.log(users.isSelected);
    if (users.isSelected == true) {
      users.isSelected = false;
    } else {
      users.isSelected = true;
    }
  }

  delete(users: any) {
    this.getData.splice(
      this.getData.findIndex((item: udata) => item.id === users),
      1
    );
    this.username.delete(users).subscribe((data) => {
      console.log(users);
    });
  }

  edit(value: any) {
    // console.log(value);
    this.add.patchValue({
      name: value.name,
      email: value.email,
      phone: value.phone,
      website: value.website,
      id: value.id,
      username: value.username,
    });
  }

  onSubmit() {
    console.log(this.add.value);

    //console.log(this.getData);

    this.getData.splice(
      this.getData.findIndex(
        (item: { id: string }) => item.id === this.add.value.id
      ),
      1,
      this.add.value
    );
    // console.log(this.getData);
  }
}
