import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { expectedusers } from './testData';

describe('UserService', () => {
  let service: UserService;
  let testingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('registers a user', () => {
    let mockUser = {
      firstName: "ken",
      lastName: "doe",
      email: "kendoe@yopmail.com",
      password: "$2b$05$iZfryQwFK6GSsgnwB8YMBOYVF1A3UJDpGHCx863Qx06MCZcu6XQIi",
      role: "customer",
      welcome: false
    }
    service.signUpUser(mockUser).subscribe((res) => {
      expect(res).toBeTruthy()
      expect(res.message).toEqual("User registered successfully")
    })

    const mockRequest = testingController.expectOne('http://localhost:4500/users/register')
    expect(mockRequest.request.method).toEqual('POST')
    expect(mockRequest.request.body).toBe(mockUser)
    mockRequest.flush({ "message": "User registered successfully" })
  })


  it('logs in a user', () => {
    let mockLogin = {
      email: "janengene12@gmail.com",
      password: '12345'
    }
    service.loginUser(mockLogin).subscribe((res: any) => {
      expect(res).toBeTruthy()
      expect(res.message).toEqual("Logged in successfully")
    })
    const mockRequest = testingController.expectOne('http://localhost:4500/users/login')
    expect(mockRequest.request.method).toEqual('POST')
    expect(mockRequest.request.body).toBe(mockLogin)
    mockRequest.flush({ "message": "Logged in successfully" })
  })

  it('gets all user', () => {
    service.getAllUsers().subscribe((users: any) => {
      expect(users).toBeTruthy()
      expect(users.length).toBe(6)
    })
    const mockRequest = testingController.expectOne('http://localhost:4500/users')
    mockRequest.flush(Object.values(expectedusers))
    expect(mockRequest.request.method).toBe('GET')
  })

  it('get one user using id', () => {
    let id = 'userID: "0040bb8e-ba81-4e9a-a338-af7091b796ee'
    service.getOneUser(id).subscribe((user: any) => {
      expect(user).toBeTruthy()
      expect(user.firstName).toBe('ken')
    })
    const mockRequest = testingController.expectOne(`http://localhost:4500/users/${id}`)
    mockRequest.flush(expectedusers[0])
    expect(mockRequest.request.method).toBe('GET')
  })

  it('deletes a user', () => {
    let id = '38567392-c3f3-4015-ba52-b1e727eec13d'
    service.deleteUser(id).subscribe((res: any) => {
      expect(res).toBeTruthy
      expect(res.message).toEqual("user deleted successfully")
    })

    const mockRequest = testingController.expectOne(`http://localhost:4500/users/delete/${id}`)
    expect(mockRequest.request.method).toBe('DELETE')
  })



  //   it('updates a user', ()=>{
  //     let id = "9u3y21o-122uje21-18212u-1223mweju3"
  //     let mockUpdatedDetails ={
  //       name: "Miss Jane",
  //       email: "janengene@gmail.com",
  //       password: "12345"
  //     }
  //     service.updateUserDetails(id,mockUpdatedDetails).subscribe((res)=>{
  //       expect(res).toBeTruthy()
  //       expect(res.message).toEqual('User details updated successfully')
  //     })

  //     const mockRequest = testingController.expectOne(`http://localhost:5000/users/update/{id}`)
  //     expect(mockRequest.request.method).toBe('PUT')
  //     expect(mockRequest.request.body).toBe(mockUpdatedDetails)
  //     mockRequest.flush({"message":"User details updated successfully"})
  //   })
});