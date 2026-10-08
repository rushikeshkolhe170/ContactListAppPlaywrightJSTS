import {request, type APIRequestContext} from "@playwright/test";

type LoginResponse = {
  token: string;
  userID: string;
}

type LoginApiResponse = {
  token: string;
  user: {
    _id: string;
  };
};

export class APIutils 
{  
    private apicontext : APIRequestContext;
    private loginPayload : Record<string, string>;

  constructor(apiContext : APIRequestContext, loginPayload : Record<string, string>) 
  {
    this.apicontext = apiContext;
    this.loginPayload = loginPayload;
  }

    async getToken() : Promise<LoginResponse>
    {
      const loginResponse = await this.apicontext.post(process.env.LOGIN_URL!, {data : this.loginPayload});
      const loginResJson : LoginApiResponse = await loginResponse.json();
      const token : string = loginResJson.token;
      const userID : string = loginResJson.user._id;
      return { token, userID };
    }
}