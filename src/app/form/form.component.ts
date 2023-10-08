import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DiagnosisService } from '../services/diagnosis.service';
import { Diagnosis } from '../models/diagnosis.model';
import { FormResponseModel } from '../models/formResponseModel';
import { Condition } from '../models/сondition.model';
import { dateNotInPast } from '../validators/dateNotInPast';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  form: FormGroup;
  diagnoses:Diagnosis[] = [];
  isDropdownOpen = false;
  isLoading = true;
  textAreaValue = ''

  constructor(private fb: FormBuilder, private diagnosisService: DiagnosisService) {
    this.form = new FormGroup({})
  }

  ngOnInit(): void {
    this.createForm()
  }

  get conditions_controls() {
    return this.form.get('conditions') as FormArray;
  }

  createForm(): void {
    this.form = this.fb.group({
      date: ['', [Validators.required, dateNotInPast]],
      conditions: this.fb.array([
        this.fb.group({
          diagnosis: new FormControl(''),
          comment: new FormControl(''),
        })
      ])
    });
  }

  generateGuid(): string {
    const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return guid;
  }

  handleSubmit(): void {
    const date = this.form.get('date')?.value;
    const conditions:Condition[] = [];
    (this.form.get('conditions')?.value).map((item:any, index:any)=>{
      if(item.diagnosis){
        conditions.push(
          {
              id: this.generateGuid(),
              context: {
                  identifier: {
                      type: {
                          coding: [
                              {
                                  system: "eHealth/resources",
                                  code: "encounter"
                              }
                          ]
                      },
                      value: item.diagnosis.id
                  }
              },
            code: {
                  coding: [
                      {
                          system: "eHealth/ICPC2/condition_codes",
                          code: item.diagnosis.code
                      }
                  ]
              },
            notes: item.comment,
            onset_date: date
          } as Condition
        )
      }
    })
    const formResponse:FormResponseModel = {
      encounter: {
        date: date
      },
      conditions: conditions
    };
    this.textAreaValue = JSON.stringify(formResponse, null, 2)
  }

  handleDropdownClick(): void {
    if (!this.isDropdownOpen && this.diagnoses?.length <= 0) {
      this.diagnosisService.getAllDiagnosis()
      .subscribe((data:Diagnosis[]) => {
        this.diagnoses = data;
        //simulate API call
        setTimeout(()=>{ this.isLoading = false;},1000)
      });
    }
    this.isDropdownOpen = true;
  }

  addDiagnosisField(): void {
    const newDiagnosisGroup = this.fb.group({
      diagnosis: new FormControl(''),
      comment: new FormControl(''),
    });
    this.conditions_controls.push(newDiagnosisGroup);
  }
}
