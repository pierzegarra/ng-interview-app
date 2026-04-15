import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log("hello world")
    this.userService.getUserByUsername().subscribe({
      next: (user: User) => {
        this.user = user;
        console.log("user.component ",user)
      },
      error: () => {},
      complete: () => {}
    })
  }
}
