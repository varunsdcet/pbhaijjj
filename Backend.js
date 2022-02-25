import firebase from "firebase";
const GLOBAL = require('./Global');
import store from '../redux/store';

class Backend {
    uid = GLOBAL.user_id;
    messagesRef = null;
    messagesRefs = null;
    messagesRefss = null;
    chatmessagesRef = null;
    // initialize Firebase Backend
    constructor() {
      firebase.initializeApp({
        apiKey: "AIzaSyAIuN5_cq9TKLL7M96qwNHTpLL-WJKUCYc",
          authDomain: "shyamdarshanbooking-3799e.firebaseapp.com",
          projectId: "shyamdarshanbooking-3799e",
          storageBucket: "shyamdarshanbooking-3799e.appspot.com",
          messagingSenderId: "57962069856",
          appId: "1:57962069856:web:11d489a54e8f8a910fe805",
          measurementId: "G-0J3BR9YCC0"
        });

    }
    setUid(value) {
        this.uid = value;
    }
    getUid() {
        return this.uid;
    }


    loadMessages(callback) {
         this.messagesRef =  firebase.database().ref().child("chat/" + "1");
         this.messagesRef.off();


         const onReceive = data => {
             const message = data.val();
             callback({
                 _id: data.key,
                 text: message.text,
                 createdAt: message.createdAt,
                 link:message.link,

             });
         };



         var d = this.getLimit();
         //  console.log(d);
         //   Generates a new Query object limited to the last specific number of children.
         //    this.messagesRef.limitToLast(10).on("child_added", onReceive);
         this.messagesRef
             .orderByChild("createdAt")
             .on("child_added", onReceive);
     }


     loadMessages1(callback) {
          this.messagesRef =  firebase.database().ref().child("chat/" + "2");
          this.messagesRef.off();


          const onReceive = data => {
              const message = data.val();
              callback({
                  _id: data.key,
                  text: message.text,
                  createdAt: message.createdAt,
                  link:message.link,

              });
          };



          var d = this.getLimit();
          //  console.log(d);
          //   Generates a new Query object limited to the last specific number of children.
          //    this.messagesRef.limitToLast(10).on("child_added", onReceive);
          this.messagesRef
              .orderByChild("createdAt")
              .on("child_added", onReceive);
      }


    sendMessage(message) {
        this.messagesRef =  firebase.database().ref().child("chat/" + "1");
            for (let i = 0; i < message.length; i++) {
                   if (message[i].text != ""){
                this.messagesRef.push({
                    text: message[i].text,
                    link: message[i].link,
                    createdAt: new Date().toISOString(),

                });
              }
            }
    //    }
    }
    sendMessage1(message) {

      this.messagesRef =  firebase.database().ref().child("chat/" + "2");
          for (let i = 0; i < message.length; i++) {
                 if (message[i].text != ""){
              this.messagesRef.push({
                  text: message[i].text,
                  link: message[i].link,
                  createdAt: new Date().toISOString(),

              });
            }
          }
    //    }
    }

    closeChat() {
        if (this.messagesRef) {
            this.messagesRef.off();
        }
    }

    getLimit() {
        var today = new Date();
        //var milliseconds = Date.parse(today);
        //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
        today.setDate(today.getDate() - 31); // last 30 Days
        //console.log(today);
        var changedISODate = new Date(today).toISOString();
        //var changedISODate = today.toISOString();
        console.log(changedISODate);
        return changedISODate;
    }
}

export default new Backend();
