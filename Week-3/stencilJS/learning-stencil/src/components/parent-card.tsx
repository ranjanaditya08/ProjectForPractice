import { Component, h, State } from '@stencil/core/internal';

@Component({
  tag: 'parent-card',
})
export class ParentCard {
  @State() catData: string[] = [];

  count = 0;

  
  getData = async () => {
    try {
      const data = await fetch('https://meowfacts.herokuapp.com/?count=5');
      const dataJson = await data.json();
      this.catData = dataJson.data;
      // console.log(this.catData);
    } catch (error) {
      console.error('Error: ',error);
    }
  };

  render() {
    return (
      <div>
        {this.catData.map(data => {
          return <my-card fact={data}></my-card>;
        })}
      </div>
    );
  }

  

  componentWillLoad() {
    console.log('componentWillLoad called from Parent', this.count++);
    this.getData();

    document.title = 'Loading Cat Facts...';
  }

  componentDidLoad() { 
    console.log('componentDidLoad called from Parent');
    document.title = 'Cat Facts Loaded';
  }

  componentWillUpdate() {
    console.log('componentWillUpdate called from Parent');
    
  }

  componentDidUpdate() {
    console.log('componentDidUpdate called from Parent');
    
  }

  

}
