import { Component, State, h, Element } from '@stencil/core';

@Component({
  tag: 'custom-clock'
})
export class CustomClock {

  timer: number;

  @Element() el: HTMLElement;
  private spanElement: HTMLSpanElement;

  @State() time: number = Date.now();

  

  render() {
    const time = new Date(this.time).toLocaleTimeString();

    return (
      <span ref={(el) => this.spanElement = el as HTMLSpanElement} class="d-block text-center fs-4">{ time }</span>

    );
  }

  connectedCallback() {
    console.log('connectedCallback called from Timer');
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  componentDidLoad() {
   
    console.log('componentDidLoad called from Timer');
    
    if (this.spanElement) {
      this.spanElement.style.color = 'blue';
      this.spanElement.style.fontSize = '24px';
      this.spanElement.style.fontWeight = 'bold';
      this.spanElement.classList.add('bg-light', 'p-2', 'rounded', 'shadow-sm');
    }
  }

  componentDidRender() {

    console.log('componentDidRender called from Timer');
   
    if (this.spanElement) {
      this.spanElement.style.color = 'green'; 
      this.spanElement.style.fontSize = '100px';
      this.spanElement.style.fontWeight = 'bold';
    } else {
      console.error('spanElement is not set');
    }
  }

  disconnectedCallback() {
    console.log('disconnectedCallback called from Timer');
    window.clearInterval(this.timer);
  }
}