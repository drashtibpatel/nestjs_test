#### perform following steps to run the project
- run `npm install` on root directory
- copy `.env.example` file and rename it to `.env`
- set `JWT_SECRET` in env file to create tokens for user authentications
- setup `mysql` database details in env file
- setup `mailer` details to send email in env file
- once everything is setup run `npm run start:dev` to start the application

**Folowwing is the list of APIs:**

Registration API
```
POST 
/auth/sign-up
params:
{
    name:name,
    email:email@address.com,
    password:password
}
```

Login API
```
POST 
/auth/login
params:
{
    email:email@address.com,
    password:password
}
```

Login using Facebook API
```
GET 
/auth/facebook-login

once you login using facebook use `access_token` from response to get user details.
```
Logged in user details
```
GET 
/users/me
```

