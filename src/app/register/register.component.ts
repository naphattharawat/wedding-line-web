import { RegisterService } from './../register.service';
import { AlertService } from './../alert.service';
import { Component, Inject, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  site = 1;
  no: any;

  //line
  displayName: any;
  userId: any;
  pictureUrl: any;
  liffRegisterId: any;
  constructor(
    private alertService: AlertService,
    private registerService: RegisterService
  ) {
    this.liffRegisterId = '1657342863-xBvb7kQj';
  }

  async ngOnInit() {
    try {
      // Using a Promise object
      liff
        .init({
          liffId: this.liffRegisterId // Use own liffId
        })
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login({ redirectUri: `https://dev.moph.go.th:8080` });
          } else {
            // if (liff.isInClient()) {
            liff.getProfile()
              .then(async profile => {
                this.userId = profile.userId;
                this.displayName = profile.displayName;
                this.pictureUrl = profile.pictureUrl;
                // console.log(profile);
                // if (this.userId) {

              
                // }
              }).catch((err) => {
                console.log('error', err);
                this.alertService.error(err);
              });

          }

        })
        .catch((err) => {
          // Error happens during initialization
          console.log(err.code, err.message);
        });




    } catch (error) {
      this.alertService.error(error);
    }

  }

  onClickGo() {
    this.site = 2;
  }

  onClickNo(no: any) {
    this.no = no;
    this.site = 3;
  }

  async onClickConfirm(status: any) {
    if (status == 'GO') {
      await this.registerService.saveStatus({
        userId: this.userId,
        displayName: this.displayName,
        pictureUrl: this.pictureUrl,
        no: this.no,
        status: 'CONFIRM'
      })
      liff.sendMessages([{
        type: 'text',
        text: `ทั้งหมด ${this.no} ท่าน`
      },{
        type: 'text',
        text: 'แล้วเจอกันวันงานนะคะ'
      }]);
      liff.closeWindow();
    } else if (status == 'WAIT') {
      await this.registerService.saveStatus({
        userId: this.userId,
        displayName: this.displayName,
        pictureUrl: this.pictureUrl,
        no: this.no,
        status: 'UNSURE'
      })
      liff.sendMessages([{
        type: 'text',
        text: `หากมาแน่นอนแล้วหรือมาไม่ได้แล้วแวะมาบอกกันซักนิดนะคะ`
      }]);
      liff.closeWindow();
    } else if (status == 'NO') {
      await this.registerService.saveStatus({
        userId: this.userId,
        displayName: this.displayName,
        pictureUrl: this.pictureUrl,
        no: this.no,
        status: 'DONOT'
      })
      liff.sendMessages([{
        type: 'text',
        text: `หากเปลี่ยนใจแวะมาบอกกันได้นะคะ`
      }]);
      liff.closeWindow();
    }
    // line liff close
   
    
  }
}
