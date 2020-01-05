
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/AuthenticationService';
import { AlertService } from '../../services/AlertService';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;
    returnUrl: string;
    username: string;
    password: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.returnUrl = '/dashboard';
    }

    public onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.authenticationService.login(this.username, this.password)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/dashboard']);
                },
                error => {
                    const message = JSON.stringify( error.error) + '\n' + error.statusText;
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
