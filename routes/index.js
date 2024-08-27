const authRouter = require("./authRoutes");
const cartRouter = require("./cartRoutes");
const orderRouter = require("./orderRoutes");
const productRouter = require("./productRoutes");
const userRouter = require("./userRoutes");

module.exports = (app, passport) => {
  authRouter(app, passport);
  cartRouter(app);
  orderRouter(app);
  productRouter(app);
  userRouter(app);
};
