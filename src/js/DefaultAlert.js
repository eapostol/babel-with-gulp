class DefaultAlert {
  constructor(message){
    this.message = message;
  }

  display(){
    alert(this.message);
  }
}

export default DefaultAlert;
