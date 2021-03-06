import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  constructor() {
    var pusher = new Pusher('9d4e34bbed57dbddf921', {
      cluster: 'ap1',
    });
    this.channel = pusher.subscribe('chat');
  }
  channel;

  public init() {
    return this.channel;
  }
}
