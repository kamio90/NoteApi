import App from './app';
import AuthenticationController from './authentication/auth.controller';
import ReviewController from './reviews/review.controller';


const app = new App([
  new ReviewController(),
  new AuthenticationController()
]);

app.listen();