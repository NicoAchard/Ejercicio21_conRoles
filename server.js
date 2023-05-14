require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const { passport, passportConfig } = require("./config/passport");
const routes = require("./routes");

const flash = require("express-flash");
const authenticationMessage = require("./middlewares/authenticationMessage");
const makeUserAvailableInViews = require("./middlewares/makeUserAvailableInViews");

const session = require("express-session");

const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);

app.use(passport.session());
passportConfig();

app.use(flash());
app.use(authenticationMessage);
app.use(makeUserAvailableInViews);

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
