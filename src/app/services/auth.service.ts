import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {auth} from 'firebase/app';
import {User} from 'firebase';
import {Auth} from '../models/auth';

@Injectable()
export class AuthService {

    user: User;
    isLogged: boolean;

    constructor(private myAuth: AngularFireAuth, private router: Router) {
        this.isLogged = false;
        this.myAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user_firebase', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user_firebase', null);
            }
        });
    }

    isLoggedIn() {
        return JSON.parse(localStorage.getItem('user_firebase')) !== null;
    }

    login(user: Auth) {
        this.myAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then(response => {
                this.isLogged = false;
                this.router.navigate(['/items']);
            }).catch(error => {
            this.isLogged = false;
            console.log('Something went wrong:', error.message);
        });
        return this.isLogged;
    }

    logout() {
        this.myAuth.auth.signOut();
        localStorage.removeItem('user_firebase');
        this.router.navigate(['/login']);
    }

}
