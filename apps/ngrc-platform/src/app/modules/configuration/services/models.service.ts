import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from '@ngrc/interfaces/models';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ModelsService {
  constructor(private http: HttpClient) {}

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(`${environment.api}/models`);
  }

  add(model: Model): Observable<Model> {
    const formData = new FormData();
    formData.append('img', model.img, (model.img as File).name);
    formData.append('title', model.title);
    formData.append('slots', JSON.stringify(model.slots));
    return this.http.post<Model>(`${environment.api}/models`, formData);
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
