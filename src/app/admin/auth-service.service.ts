import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable()
export class AuthServiceService {

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) { }

  login(loginModel): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.auth.signInWithEmailAndPassword(loginModel.email, loginModel.password)
      .then((user: any) => {
        this.db.object(`/users/${user.uid}`).valueChanges()
        .subscribe( newUser => {
          resolve(newUser);
        });
      }).catch(err => {
        reject();
      });
    });
  }

  signUp(signupModel): Promise<any> {
    return new Promise((resolve, reject) =>{
      this.auth.auth.createUserWithEmailAndPassword(signupModel.email, signupModel.password)
      .then((user: any) => {
        signupModel.uid = user.uid;
        this.db.list('users').set(user.uid, {
          name: signupModel.name,
          email: signupModel.email,
          type: signupModel.type
        }).then(dbUser => {
          resolve(signupModel);
        });
      }).catch(err => {
        reject();
      });
    });
  }


  mailExistance(email: string): Promise<any> {
    return this.auth.auth.fetchProvidersForEmail(email);
  }

  isLoggedIn() {
    console.log(this.auth.auth.currentUser);
  }

  logout() {
    return this.auth.auth.signOut();
  }

}
