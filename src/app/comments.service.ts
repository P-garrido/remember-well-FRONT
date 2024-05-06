import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Comment } from './models/coments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient, private loginService: LoginService) { }


  baseUrl = "http://localhost:3000/comments"


  getAll() {
    return this.http.get(this.baseUrl)
  }

  create(com: Comment) {
    const token = this.loginService.token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, {
      text: com.text,
      stars: com.stars,
      idUser: com.userId
    }, { headers })
  }



}
