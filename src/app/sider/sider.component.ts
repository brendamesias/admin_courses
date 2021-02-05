import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../providers/auth/auth-firebase.service';


@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {

  title = 'adminCourses';

  constructor(
    public authService: AuthFirebaseService
  ) { }

  ngOnInit() {
  }


}
