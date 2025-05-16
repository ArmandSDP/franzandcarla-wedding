import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const navbarToggler = document.querySelector(
          '.navbar-toggler'
        ) as HTMLElement;
        const collapseElement = document.querySelector('.navbar-collapse');

        if (
          window.innerWidth < 992 &&
          collapseElement?.classList.contains('show')
        ) {
          navbarToggler?.click(); // Trigger Bootstrap's collapse animation
        }
      });
    });
  }
}
