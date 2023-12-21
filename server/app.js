const exp = require("express");
const cors = require("cors");
const {
  insertuser,
  insertgroup,
  alluser,
  allgroup,
  expenses,
  getexpense,
  allexpense,
  removeexpense,
  expenseid,
  payuser,
  username,
  getpayuser,
  getoweduser,
  insertowed,
  friendexpense,
  expenseidsort,
  backdata,
  insertexpenseuser,
  signup,
  loginuser,
  getuserpay,
  getuserowed,
  expensebyid,
  updateexpense,
  updateexpenseuser,
  getusers,
  insertactivity,
  getactivity,
} = require("./Query");
require("dotenv").config();
const port = process.env.PORT;
const app = exp();
app.use(cors());
app.use(exp.json());

app.post("/insertuser", insertuser);
app.post("/insertgroup", insertgroup);
app.post("/insertexpense", expenses);
app.post("/payuser", payuser);
app.post("/insertowed", insertowed);
app.post("/insertexpenseuser", insertexpenseuser);
app.post("/signup",signup);
app.post("/login",loginuser);
app.post("/insertactivity",insertactivity);

app.get("/alluser", alluser);
app.get("/allgroup", allgroup);
app.get("/getexpense/:id", getexpense);
app.get("/allexpense", allexpense);
app.get("/getexpenseid", expenseid);
app.get("/username/:id", username);
app.get("/payuser/:id", getpayuser);
app.get("/oweduser/:id", getoweduser);
app.get("/back/:id", backdata);
app.get("/getuserpay/:id",getuserpay);
app.get("/getuserowed/:id",getuserowed);
app.get("/expensebyid/:id",expensebyid);
app.get("/loginuser/:id",getusers);
app.get("/getactivity/:id",getactivity);

app.delete("/removeexpense/:id", removeexpense);

app.put("/updateexpense/:id",updateexpense);
app.put("/updateexpenseuser/:id",updateexpenseuser);

app.listen(port, () => {
  console.log(port);
});
