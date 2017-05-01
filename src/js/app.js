/**
 * Created by Edward_J_Apostol on 2017-05-01.
 */
import DefaultAlert from "./DefaultAlert";

class App extends Object {
    constructor(msg = "Edward says Hello with Gulp, SASS, Babel and ES6!"){
        super();
        this.message = msg;
        let oldPopUp = new DefaultAlert(this.message);
        oldPopUp.display();
    }

    init(){

    }

}

export default App;
