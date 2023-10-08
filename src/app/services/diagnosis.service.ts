import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { Diagnosis } from "../models/diagnosis.model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class DiagnosisService {
  //for real API
  //private diagnosisUrl = 'https://global.lakmus.org/Dictionaries/icpc2?IsPublic=true&Search=Ост';

  private diagnosisUrl = '../../assets/mock/diagnosis.mock.json';

  constructor(private http: HttpClient) {}

  getAllDiagnosis() {
    return this.http.get<Diagnosis[]>(this.diagnosisUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
  }
}
