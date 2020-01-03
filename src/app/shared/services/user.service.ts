import { Inject, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class UserService {
  fireApp: any;
  userUID = '';
  userObject: any = {};
  userDepartments: any;

  userObjectSubscription: Subscription;
  userDepsSubscription: Subscription;

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth, @Inject(FirebaseApp) firebaseApp: any) {
    this.fireApp = firebaseApp;
  }

  login(email, password) {
    // return new Promise(resolve => true);
    return new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(email, password).then(
        (success: any) => {
          this.userUID = success.uid;
          resolve();
        }).catch(
        (err) => {
          console.log(err);
          reject(err.message);
        });
    });
  }

  logout() {
    // Unset selected module in local storage
    localStorage.setItem('switchSelection', null);
    return this.auth.auth.signOut();
    // return new Promise(resolve => true);
  }

  isLoggedIn(): Observable<boolean> {
    return this.auth.authState.pipe(map((auth) => {
      if (auth == null) {
        return false;
      } else {
        this.userUID = auth.uid;
        return true;
      }
    }));
    // return Observable.create(true);
  }

  public get getUserId() {
    // return this.auth.auth.currentUser.uid;
    return new Promise(resolve => true);
  }

  public get observeUserId() {
    return this.auth.authState.pipe(map((auth) => {
      if (auth == null) {
        return '';
      } else {
        return auth.uid;
      }
    }));
    // return new Promise(resolve => true);
  }

  public get observeUser() {
    return this.auth.authState.pipe(map((auth) => {
      if (auth == null) {
        return Observable.create(null);
      } else {
        return this.db.object(`/users/${auth.uid}`).valueChanges().pipe(map(user => user));
      }
    }));
    // return new Promise(resolve => true);
  }

  public get getUser() {
    return new Promise((resolve, reject) => {
      if (this.auth.auth.currentUser) {
        this.db.object(`users/${this.auth.auth.currentUser.uid}`).valueChanges().toPromise().then((user: any) => {
          if (user) {
            resolve(user);
          } else {
            reject('');
          }
        });
      } else {
        reject('');
      }
    });
    // return new Promise(resolve => true);
  }

  public get getUserType() {
    return new Promise((resolve, reject) => {
      if (this.auth.auth.currentUser) {
        this.db.object(`users/${this.auth.auth.currentUser.uid}/type`).valueChanges().toPromise().then((type: any) => {
          if (type) {
            resolve(type);
          } else {
            reject('');
          }
        });
      } else {
        reject('');
      }
    });
    // return new Promise(resolve => true);
  }
}
