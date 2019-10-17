import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { Model } from '../models/model';

@Injectable()
export class ModelsService {
  constructor(private http: HttpClient) {}

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(`${environment.api}/models`);
  }

  add(model: Model): Observable<Model> {
    const img = model.img;
    return this.http.post<Model>(`${environment.api}/models`, model).pipe(
      switchMap(modelObj => {
        return this.appendImg({...modelObj, img});
      })
    );
  }

  appendImg(model: Model): Observable<Model> {
    const formData = new FormData();
    formData.append('img', model.img, (model.img as File).name);
    return this.http.post<Model>(`${environment.api}/models/${model.id}/img`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.api}/models/${id}`);
  }
}
