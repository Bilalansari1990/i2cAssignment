import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {
  FormsModule,
} from '@angular/forms';

interface Registration {
  name: string;
  email: string;
  company: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    SlickCarouselModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'i2c-assesment';

  slides = [
    { img: 'assets/Microsoft logo.png' },
    { img: 'assets/Vector.png' },
    { img: 'assets/g3.png' },
    { img: 'assets/Microsoft logo.png' },
    { img: 'assets/Vector.png' },
    { img: 'assets/g3.png' },
  ];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  formSubmitted: boolean = false;
  formData: Registration = {
    name: '',
    email: '',
    company: '',
  };

  ngOnInit() { }

  checkIfFormSubmitted() {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      this.formSubmitted = true;
      this.formData = JSON.parse(storedData);
      return true;
    } else {
      return false;
    }
  }

  onSubmit(event: Event) {
    if (this.checkIfFormSubmitted()) {
      return alert('Form already submitted');
    }
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    if (this.validateForm()) {
      localStorage.setItem('formData', JSON.stringify(this.formData));
      this.formSubmitted = true;
      this.resetForm();
      alert('Data Saved Successfully');
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      company: '',
    };
  }

  validateForm(): boolean {
    const { name, email, company } = this.formData;
    if (!name || name.length < 3) {
      alert('Name is required and must be at least 3 characters long.');
      return false;
    }
    if (!email || !this.validateEmail(email)) {
      alert('A valid email is required.');
      return false;
    }
    if (!company || company.length < 3) {
      alert('Company is required and must be at least 3 characters long.');
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }
}
