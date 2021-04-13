import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveAgreement(param: any) : Observable<any>
  {
    const url = `${env.backendBaseUrl}/api/customers/agreement`;
    const body = {
        customer_id       : param.customer_id,
        order_id          : param.order_id,
        meta_key          : param.meta_key,
    }
    return this.http.post(url, body, {headers: this.authService.authHeaders()});
  }

  updateCustomer(param: any) : Observable<any> 
  {
    const url = `${env.backendBaseUrl}/api/customers/` + param.id;
    const body = {
      first_name        : param.first_name,
      last_name         : param.last_name,
      email             : param.email,
      state             : param.state, 
      postcode          : param.postcode,
      city              : param.city,
    }
    return this.http.put(url, body, {headers: this.authService.authHeaders()});
  }
  
  getCustomerList() : Observable<any>
  {
    const url = `${env.backendBaseUrl}/api/customers`;
    return this.http.get(url, {headers: this.authService.authHeaders()});
  }

  getOrderListForCustomer(param: number) : Observable<any>
  {
    const url = `${env.backendBaseUrl}/api/customers/orders/` + param;
    return this.http.get(url, {headers: this.authService.authHeaders()});
  }

  getHeadImageForDocx()
  {
    const url = `${env.backendBaseUrl}/api/customers/headimage`;
    return this.http.get(url, {headers: this.authService.authHeaders()});  
  }
}
