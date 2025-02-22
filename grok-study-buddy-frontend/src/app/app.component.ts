import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GrokService } from './grok.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prompt: string = '';
  response: string = '';
  loading: boolean = false;

  constructor(private grokService: GrokService) {
    console.log('GrokService injected:', !!this.grokService);
  }

  sendPrompt() {
    console.log('sendPrompt called with:', this.prompt); // Log when called
    if (!this.prompt.trim()) {
      console.log('Prompt empty, aborting');
      return;
    }
    this.loading = true;
    console.log('Sending request...');
    this.grokService.getResponse(this.prompt).subscribe({
      next: (data) => {
        console.log('Response received:', data);
        this.response = data.response;
        this.loading = false;
      },
      error: (err) => {
        console.error('Request error:', err);
        this.response = 'Oops, something went wrong!';
        this.loading = false;
      },
      complete: () => console.log('Request completed')
    });
  }
}