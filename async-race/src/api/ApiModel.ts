export class ApiModel {
  
  protected url: string;

  constructor() {
    this.url = 'http://127.0.0.1:3000/garage';
  }

  async getData() {
    try {
      const response = await fetch(this.url);
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      return await response.json();
  
    } catch(error) {
      console.log(error);
    }   
  }
}