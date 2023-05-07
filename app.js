require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const compression = require("compression");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const RateLimit = require("express-rate-limit");

const limiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
});

const indexRouter = require("./routes/index");
const signUpRouter = require("./routes/signUp");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");

const User = require("./models/User");

const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);

const main = async () => mongoose.connect(process.env.DATABASE_URI);
main().catch((err) => console.error(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(flash());
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    // eslint-disable-next-line consistent-return
    async (username, password, done) => {
      try {
        // case insensitive search
        const user = await User.findOne({ username })
          .collation({ locale: "en", strength: 2 })
          .exec();

        if (!user) {
          return done(null, false, {
            message: `Invalid username "${username}"`,
          });
        }

        bcrypt.compare(password, user.password, (err, res) => {
          // error occurred
          if (err) return done(err);
          // passwords match, log user in
          if (res) return done(null, user);
          // passwords do not match
          return done(null, false, { message: "Incorrect password" });
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isMember = req.user && req.user.membershipStatus !== "none";
  res.locals.currentPath = req.path;
  next();
});

app.use(helmet());
app.use(limiter);
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/log-out", logoutRouter);
app.use("/message", messageRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
