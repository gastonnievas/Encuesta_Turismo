import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthGuard } from 'src/app/utils/auth.guard';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isCollapsed = false;

  constructor(public _userService: UserService, public _authGuard: AuthGuard) { }

  ngOnInit(): void {
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }  

}
