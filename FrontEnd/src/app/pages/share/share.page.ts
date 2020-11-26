import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

  text: string = 'Flamenco'
  imgurl: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcVHnqybmOZV1F9RrkMo-nqDb1FL8hxmiosQ&usqp=CAU'
  link: string = 'https://link.medium.com/JA4amAHFJ5'

  constructor(
    private socialSharing: SocialSharing,
  ) { }

  ngOnInit() {
  }

  ShareGeneric(parameter) {
    const url = this.link
    const text = parameter + '\n'
    this.socialSharing.share(text, 'MEDIUM', null, url)
  }

  ShareWhatsapp() {
    this.socialSharing.shareViaWhatsApp(this.text, this.imgurl, this.link)
  }

  ShareFacebook() {
    this.socialSharing.shareViaFacebookWithPasteMessageHint(this.text, this.imgurl, null /* url */, 'Copia Pega!')
  }

  SendEmail() {
    this.socialSharing.shareViaEmail('text', 'subject', ['email@address.com'])
  }

  SendTwitter() {
    this.socialSharing.shareViaTwitter(this.text, this.imgurl, this.link)
  }

  SendInstagram() {
    this.socialSharing.shareViaInstagram(this.text, this.imgurl)
  }
  

}
