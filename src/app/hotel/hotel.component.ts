import { RegisterService } from './../register.service';
import { AlertService } from './../alert.service';
import { Component, Inject, OnInit } from '@angular/core';
import liff from '@line/liff';
@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {



  //line
  displayName: any;
  userId: any;
  pictureUrl: any;
  liffRegisterId: any;
  constructor(
    private alertService: AlertService,
    private registerService: RegisterService
  ) {
    this.liffRegisterId = '1657342863-BNpJANGv';
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





  room2() {
    liff.sendMessages([{
      type: 'text',
      text: `Superior room ห้อง สำหรับ 2 ท่าน ราคาห้องละ 1100 บาทค่ะ`
    }, {
      type: 'text',
      text: 'สามารถแจ้งจำนวนที่ต้องการจอง หรือหากต้องการเสริมเตียงแจ้งได้เลยนะคะ'
    }]);
    liff.closeWindow();
  }
  room4() {
    liff.sendMessages([{
      type: 'text',
      text: `Deluxe room บ้าน 2 ห้องนอน สำหรับ 4 ท่าน ราคาห้องละ 2500 บาทค่ะ`
    }, {
      type: 'text',
      text: 'สามารถแจ้งจำนวนที่ต้องการจอง หรือหากต้องการเสริมเตียงแจ้งได้เลยนะคะ'
    }]);
    liff.closeWindow();
  }

}
