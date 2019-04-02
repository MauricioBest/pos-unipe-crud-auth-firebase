import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Auth} from '../../models/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: Auth;
    message: string;

    constructor(private authService: AuthService, private router: Router) {
        this.user = new Auth();
    }

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/pokemons']);
        }
    }

    login() {
        this.message = '';
        if (!this.user.email || !this.user.password || !this.authService.login(this.user)) {
            this.message = 'Email ou Senha inválidos';
        }
    }

}
