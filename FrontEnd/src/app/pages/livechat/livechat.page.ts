import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';
import { PusherService } from '../../services/pusher.service';

interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
}

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.page.html',
  styleUrls: ['./livechat.page.scss'],
})
export class LivechatPage implements OnInit {

  constructor(private http: HttpClient, private pusher: PusherService) {}

  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;
  time;
  sendMessage() {
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
        timeStamp: this.time
      };

      this.http
        .post(`http://localhost:5005/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            // The message type is added to distinguish between incoming and outgoing messages. It also aids with styling of each message type
            type: 'outgoing',
          };
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
        this.messages = this.messages.concat(message);
      }
    })
  }
}
