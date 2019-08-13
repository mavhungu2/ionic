import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-deploy-compose-page',
  templateUrl: './deploy-compose-page.page.html',
  styleUrls: ['./deploy-compose-page.page.scss'],
})
export class DeployComposePagePage implements OnInit {
  
  deployForm : FormGroup;
  subImages : any = [];

  constructor(private fb: FormBuilder, private storage: Storage) { }

  ngOnInit() {
    
    var form_inputs = {
      name: ['', Validators.required],
      storage: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
    }

    this.storage.get("image").then(data=>{
      
      data['image_json'].forEach(element => {
        form_inputs[element['name']] = ['', Validators.required]
        this.subImages.push(element)
      });
      
    })

    console.log(form_inputs)
    console.log(this.subImages)

    


    this.deployForm = this.fb.group(form_inputs);
  }

  deployCompose(){
    console.log(this.deployForm.value)
  }

}
