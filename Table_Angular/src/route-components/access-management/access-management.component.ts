import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access-management',
  imports: [MatIconModule , RouterLink],
  templateUrl: './access-management.component.html',
  styleUrl: './access-management.component.css'
})
export class AccessManagementComponent {

}
