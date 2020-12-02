import { Component, OnInit } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
// import { ToastController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';
import { PusherService } from '../../services/pusher.service';
import { AuthService } from '../../services/auth.service';

interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
  user: string;
}

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.page.html',
  styleUrls: ['./livechat.page.scss'],
})
export class LivechatPage implements OnInit {

  userAccount: String = '';

  constructor(private http: HttpClient, private pusher: PusherService, private authService: AuthService) {}

  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;
  time;
  sendMessage() {
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        user: this.userAccount,
        id: this.lastMessageId,
        text: this.message,
        timeStamp: this.time
      };

      this.http
        .post(`http://localhost:5000/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            // The message type is added to distinguish between incoming and outgoing messages. It also aids with styling of each message type
            type: 'outgoing',
          };
          console.log(message)
          this.messages = this.messages.concat(message);
          this.message = '';
        });

    }
  }

  // This method adds classes to the element based on the message type
  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind ('message', (data) => {
      if (data.id !== this.lastMessageId) {
        const message: Message = {
          ...data,
          type: 'incoming',
        };
        console.log(message.user)
        this.messages = this.messages.concat(message);
      }
    })
    this.account();
  }

  account(){
    this.authService.getUser().subscribe((data:any)=>{
      this.userAccount=data.data[0];
      console.log("account: ", this.userAccount)
    })
  }

}

