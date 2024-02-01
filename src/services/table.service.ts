import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  getPersonsListBySearchRequest$ = new BehaviorSubject<string>('');

  /**
   * It Will fetch the persons records from firestore collection
   */
  getPersonList$ = this.getPersonsListBySearchRequest$.pipe(
    switchMap((request: any) => {
      return this.afs
        .collection('persons', (ref) => {
          let query = ref as any;
          if (request) {
            query = query
              .where('name', '>=', request)
              .where('name', '<=', request + '\uf8ff');
          }
          return query;
        })
        .valueChanges({ idField: 'id' });
    })
  );

  constructor(private afs: AngularFirestore) {}

  /**
   * It will set the observable with new record
   * @param personName : To filter the record from firebase
   */
  setPersonsListBySearchRequest(personName: string) {
    this.getPersonsListBySearchRequest$.next(personName);
  }
}
