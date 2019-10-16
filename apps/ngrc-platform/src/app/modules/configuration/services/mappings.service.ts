import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { Mapping } from '../models/mapping';

@Injectable()
export class MappingsService {
  constructor(private http: HttpClient) {}

  getMappings(): Observable<Mapping[]> {
    return this.http.get<Mapping[]>(`${environment.api}/mappings`);
  }

  getMappingsByModel(id: number): Observable<Mapping[]> {
    return this.http.get<Mapping[]>(`${environment.api}/models/${id}/mappings`);
  }

  add(mapping: Mapping): Observable<Mapping> {
    return this.http.post<Mapping>(`${environment.api}/mappings`, mapping);
  }

  update(update: { id: string, changes: Partial<Mapping> }): Observable<Mapping> {
    return this.http.put<Mapping>(`${environment.api}/mappings/${update.id}`, update.changes);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/mappings/${id}`);
  }
}
