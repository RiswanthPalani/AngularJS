import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-organization',
  imports: [MatIconModule , RouterLink],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.css'
})
export class OrganizationComponent {

}
