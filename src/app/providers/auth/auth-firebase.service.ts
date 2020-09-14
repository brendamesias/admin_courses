import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  private user: Observable<firebase.User | null>;
  public userId: string;
  private isAuthenticated: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user = this.afAuth.authState;
    this.afAuth.onAuthStateChanged((user) => {
      this.isAuthenticated = !!user;
      this.userId = user ? user.uid : '';
    });
  }

  // Obtener el estado de autenticación
  get authenticated(): boolean {
    return this.isAuthenticated;
  }

  // Obtener el observador del usuario actual
  get currentUser(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  // Registro con email
  signUpWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }
  // Ingreso con email
  signInWithEmail(email, pass): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  // Autenticación con Facebook
  authWithFacebook(): Promise<void | firebase.auth.UserCredential> {
    const provider: firebase.auth.FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    return this.afAuth.signInWithPopup(provider)
      .then(() => {
        this.router.navigateByUrl('/home');
      });
  }
  // Autenticación con Google
  authWithGoogle(): Promise<void | firebase.auth.UserCredential> {
    const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigateByUrl('/home');
      });
  }

  // Recuperar contraseña
  resetPassword(email): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // Verificar correo
  verifyEmail(): Promise<void> {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification());
  }

  // Finalizar sesión
  signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {

    });
  }

  // Actualizar perfil firebase authentication
  updateProfile(name?, photo?): Promise<void> {
    return this.afAuth.currentUser.then(user => user.updateProfile({
      displayName:
        (name) ? name : user.displayName,
      photoURL:
        (photo) ? photo : user.photoURL
    }));
  }
}
