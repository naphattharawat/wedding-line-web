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

  isSave = true;
  constructor(
    private alertService: AlertService,
    private registerService: RegisterService
  ) {
  }

  async ngOnInit() {
    try {
      // Using a Promise object
      await liff
        .init({
          liffId: '1657342863-BNpJANGv' // Use own liffId
        })
        .then(async () => {
          if (!liff.isLoggedIn()) {
            await liff.login({ redirectUri: `https://dev.moph.go.th:8080/hotel` });
          } else {
            const profile: any = await liff.getDecodedIDToken();
            this.userId = profile.sub;
            this.displayName = profile.name;
            this.pictureUrl = profile.picture;
            this.isSave = false;
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





  async room2() {
    this.isSave = true;
    await liff.sendMessages([{
      type: 'text',
      text: `Superior room ห้อง สำหรับ 2 ท่าน ราคาห้องละ 1100 บาทค่ะ`
    }]);

    const accessToken = await liff.getAccessToken();
    if (accessToken) {
      await this.registerService.sendMessage({
        token: accessToken,
        userId: this.userId,
        message: 'สามารถแจ้งจำนวนที่ต้องการจอง หรือหากต้องการเสริมเตียงแจ้งได้เลยนะคะ'
      })
    }

    await liff.closeWindow();
    this.isSave = false;
  }
  async room4() {
    this.isSave = true;
    await liff.sendMessages([{
      type: 'text',
      text: `Deluxe room บ้าน 2 ห้องนอน สำหรับ 4 ท่าน ราคาหลังละ 2500 บาทค่ะ`
    }]);

    const accessToken = await liff.getAccessToken();
    if (accessToken) {
      await this.registerService.sendMessage({
        token: accessToken,
        userId: this.userId,
        message: 'สามารถแจ้งจำนวนที่ต้องการจอง หรือหากต้องการเสริมเตียงแจ้งได้เลยนะคะ'
      })
    }

    await liff.closeWindow();
    this.isSave = false;
  }

}
