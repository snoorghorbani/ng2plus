import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  getStructure({ root }): Observable<any> {
    return this.http.get('http://localhost:4000/api/structure', { search: { root: root } })
      .map(res => res.json().data);
  }
  getFiles({ root }): Observable<any> {
    return this.http.get('http://localhost:4000/api/files', { search: { root: root } })
      .map(res => res.json().data);
  }
  getModuleDependencies({ path, name }): Observable<any> {
    return this.http.get('http://localhost:4000/api/moduleDependencies', { search: { path: path + name + '.module.ts' } })
      .map(res => res.json().data);
  }
  getComponent({ path, name }): Observable<any> {
    return this.http.get('http://localhost:4000/api/component', { search: { path: path + name + '.component.ts' } })
      .map(res => res.json().data);
  }
  getModule({ path, name }): Observable<any> {
    return this.http.get('http://localhost:4000/api/module', { search: { path: path + name + '.module.ts' } })
      .map(res => res.json().data);
  }
  getComponentDependencies({ path, name }): Observable<any> {
    return this.http.get('http://localhost:4000/api/moduleDependencies', { search: { path: path + name + '.component.ts' } })
      .map(res => res.json().data);
  }
  getModulesPath({ root }): Observable<any> {
    return this.http.get('http://localhost:4000/api/modules', { search: { root: root } })
      .map(res => res.json().data);
  }
  generateComponent({ path, name }): Observable<any> {
    return this.http.post('http://localhost:4000/api/component', { path, name })
      .map(res => res.json());
  }
  generateModule({ path, name }): Observable<any> {
    return this.http.post('http://localhost:4000/api/module', { path, name })
      .map(res => res.json());
  }

}