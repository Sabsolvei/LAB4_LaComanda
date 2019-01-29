import { Component } from '@angular/core';
//import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LaComanda';

  constructor() {
    let config = {
      apiKey: "AIzaSyDAVAzNO0VC2-Rh5enNGQgfnO9Fie5pY2A",
      authDomain: "lacomanda-b9c2b.firebaseapp.com",
      databaseURL: "https://lacomanda-b9c2b.firebaseio.com",
      projectId: "lacomanda-b9c2b",
      storageBucket: "lacomanda-b9c2b.appspot.com",
      messagingSenderId: "176807941599"
    };
 //   firebase.initializeApp(config);
  }

}
