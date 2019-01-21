import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { User } from 'app/_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAllUserByName() {
    return this.http.get<any[]>(`${environment.apiUrl}/users/getAllUserByName`);
    //return this.http.get<any[]>(`/users/getAllUserByName`);
   }
   getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
    //return this.http.get<User[]>(`/users`);
}

getById(id: number) {
      return this.http.get(`${environment.apiUrl}/users/` + id);
      //return this.http.get(`/users/` + id);
}

 register(user: User) {
      return this.http.post(`${environment.apiUrl}/users/register`, user);
      //return this.http.post(`/users/register`, user);
}

update(user: User) {
    return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
   //return this.http.put(`/users/` + user.id, user);
}

delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/` + id);
    //return this.http.delete(`/users/` + id);
}

chkUserIsExist(email: string) {
    //return this.http.get<UserOrderDetails[]>(`${environment.apiUrl}/orderdetails/` + email);
    return this.http.get<User[]>(`/users/email/` + email);
 
}
}
