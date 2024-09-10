import { Component, h, Prop } from '@stencil/core/internal';

@Component({
  tag: 'my-card',
  shadow: false,
})
export class MyCard {
  @Prop({mutable: true}) fact: string = '';

  render() {
    return (
      <div class="card shadow-sm p-3 mb-3 rounded hover-shadow">
        <div class="card-body">
          <p class="card-text mb-0">{this.fact}</p>
        </div>
      </div>
    );
  }

  disconnectedCallback() {
    console.log('disconnectedCallback called');
    alert('disconnectedCallback called from my-card');
  }
}
