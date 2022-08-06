import { Injectable } from '@angular/core';
import { default as swal, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(text:any = 'เกิดข้อผิดพลาด'): void {
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title: text
    });
  }

  errorLogin(text = 'คุณยังไม่ได้ลงทะเบียน'): void {
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title: text
    });
  }


  success(text = 'successfully'): void {
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: text
    });
  }



  async confirm(text = 'คุณต้องการดำเนินการนี้ ใช่หรือไม่?') {
    const option: SweetAlertOptions = {
      title: '',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ดำเนินการ!',
      cancelButtonText: 'ยกเลิก',
    };

    const result = await swal.fire(option);
    if (result.dismiss) return false;
    if (result.value) return true;

    return false;
  }

  // async showLoading() {
  //   const resp = await swal.fire({
  //     title: 'ประมวลผล!',
  //     html: 'กรุณารอซักครู่ระบบกำลังประมวลผล.',
  //     allowOutsideClick: false,
  //     onBeforeOpen: () => {
  //       swal.showLoading();
  //     }
  //   });
  //   if (resp.dismiss === swal.DismissReason.timer) { }

  // }

}
