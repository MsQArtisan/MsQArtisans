import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';
import { PusherService } from '../../services/pusher.service';
import { AuthService } from '../../services/auth.service';

interface Message {
  id: string;
  text: string;
  timeStamp:Date;
  type: string;
  user: String;
}

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.page.html',
  styleUrls: ['./livechat.page.scss'],
})
export class LivechatPage implements OnInit {

  constructor(
    private http: HttpClient,
    private pusher: PusherService,
    private authService: AuthService
  ) { }

  public messages;
  message: string = '';
  public time = new Date();
  public fullTime = this.time.getHours() + ":" + this.time.getMinutes() + ":" + this.time.getSeconds()
  lastMessageId;
  currentUser;
  userAccount: string = '';
  sendMessage() {
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
        timeStamp: this.fullTime,
        user: this.currentUser.name
      };

      this.http
        .post(`http://localhost:5000/messages`, data)
        .subscribe((res: Message) => {
          this.messages = res

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
    channel.bind('message', (data) => {
      this.messages = data
    })
    this.account();

  }

  account() {
    this.authService.getUser().subscribe((data: any) => {
      this.userAccount = data.data[0];
      let name = this.userAccount;
      this.currentUser = name;
      this.allRecentMessages();
    })
  }

  allRecentMessages() {
    this.authService.getAllMessages().subscribe((messages) => {
      this.messages = messages
    })
  }

}