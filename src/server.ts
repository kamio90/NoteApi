import App from './app';
import AuthenticationController from './authentication/auth.controller';


const app = new App([
  new AuthenticationController()
]);

app.listen();