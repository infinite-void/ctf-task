# ctf-task
Making NodeJS backend to support authentication of users and edit product databse in MongoDB

Front End html pages are shit. Never mind.<br>

This is me just writing REST API for a backend server<br> 

USES JWT token to authenticate user. JWT stored as cookie. Logout option not included in case of logging out got to erase the cookie with front end.<br>
provided api(in case of postman usage)<br>

/api/auth/register post : {name,phone,email,pwd}<br>
/api/auth/verifiy  get : {vsalt}<br>
/api/auth/signin   post : {email, pwd}<br>
/api/auth/forgotpass  post : {email, new pwd}<br>
/api/auth/resetpass get : {vsalt, new pwd}<br>

/api/util/add post : {name, quantity} <br>
/api/util/update  post : {uid, quantity}<br>
/api/util/delete  post : {uid}<br>
/api/util/findrecord get : {uid}<br>
/api/util/listall get<br>
