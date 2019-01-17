
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/AuthenticationService';
import { AlertService } from '../../services/AlertService';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    // loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    username: string;
    password: string;

    constructor(
        // private formBuilder: FormBuilder,
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
      console.log('Init LoginComponent...');



        /*this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });*/

        // get return url from route parameters or default to '/'
        this.returnUrl = '/dashboard';
    }

    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }

    public onSubmit() {
       console.log('logging in...');

        this.submitted = true;

        // stop here if form is invalid
        // if (this.loginForm.invalid) {
        //    return;
        // }

        this.loading = true;
        this.authenticationService.login(this.username, this.password)
//        this.authenticationService.login(this.f.username.value, this.f.password.value)
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
