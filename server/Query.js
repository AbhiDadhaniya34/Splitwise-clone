const { response } = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const insertgroup = (req, res) => {
  const { groupname } = req.body;

  pool.query(
    "INSERT INTO groups (groupname) VALUES ($1)",
    [groupname],
    (err) => {
      if (err) {
        throw err;
      }
      res.send("Record Insert");
    }
  );
};

const insertuser = (req, res) => {
  const { username } = req.body;

  pool.query("INSERT INTO users (username) VALUES ($1)", [username], (err) => {
    if (err) {
      throw err;
    }
    res.send("Record Insert");
  });
};

const alluser = (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const allgroup = (req, res) => {
  pool.query("SELECT * FROM groups", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const expenses = (req, res) => {
  const { amount, date, description, groupid } = req.body;
  pool.query(
    "INSERT INTO expense (amount,date,description,groupid) VALUES ($1,$2,$3,$4)",
    [amount, date, description, groupid],
    (err) => {
      if (err) {
        throw err;
      }
      res.send("Record insert");
    }
  );
};

const getexpense = (req, res) => {
  const id = req.params.id;

  pool.query(
    "SELECT * FROM expense WHERE groupid=$1 ORDER BY id DESC",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
};

const allexpense = (req, res) => {
  pool.query("SELECT * FROM expense ORDER BY id DESC", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const removeexpense = (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM expense WHERE id=$1", [id], (err) => {
    if (err) {
      throw err;
    }
    res.send("Delete Record");
  });
};

const expenseid = (req, res) => {
  pool.query("SELECT MAX(id) FROM expense", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const payuser = (req, res) => {
  const { expenseid, userid, amount } = req.body;
  pool.query(
    "INSERT INTO payuser (expenseid,userid,amount) VALUES ($1,$2,$3)",
    [expenseid, userid, amount],
    (err) => {
      if (err) {
        throw err;
      }
      res.send("Record Insert");
    }
  );
};

const username = (req, res) => {
  const { id } = req.params;
  pool.query("SELECT username FROM users WHERE id =$1", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const getpayuser = (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT userid,amount FROM payuser WHERE expenseid=$1",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
};

const getoweduser = (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT userid,amount FROM owed WHERE expenseid =$1",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
};

const insertowed = (req, res) => {
  const { expenseid, userid, amount } = req.body;
  pool.query(
    "INSERT INTO owed (expenseid,userid,amount) VALUES ($1,$2,$3)",
    [expenseid, userid, amount],
    (err) => {
      if (err) {
        throw err;
      }
      res.send("Record Insert");
    }
  );
};

const insertexpenseuser = (req, res) => {
  const { expenseid, userid } = req.body;

  pool.query(
    "INSERT INTO expenseusers (expenseid,userid) VALUES ($1,$2)",
    [expenseid, userid],
    (err, response) => {
      if (err) {
        throw err;
      }
      res.send(response.rows);
    }
  );
};

const backdata = (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT expense.id, expense.amount, expense.description, expense.date ,expenseusers.userid FROM expense JOIN expenseusers ON expense.id = expenseusers.expenseid WHERE expenseusers.userid = $1",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkExistingUser = await pool.query(
      "SELECT * FROM loginuser WHERE username = $1",
      [username]
    );

    if (checkExistingUser.rows.length > 0) {
      return res.json({ message: "Username already exists" });
    }

    const result = await pool.query(
      "INSERT INTO loginuser (username, passwordhash) VALUES ($1, $2) RETURNING id",
      [username, password]
    );
    res.json({
      message: "User registered successfully",
      userId: result.rows[0].id,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.json({ error: "Internal server error" });
  }
};

const loginuser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM loginuser WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.json({ message: "User not found" });
    }

    const user = result.rows[0];

    if (password === user.passwordhash) {
      return res.json({ message: "Login successful", userId: user.id });
    } else {
      return res.json({ message: "Incorrect password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.json({ message: "Internal server error" });
  }
};

const getuserpay = (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT amount FROM payuser WHERE userid=$1",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
};
const getuserowed = (req, res) => {
  const { id } = req.params;

  pool.query("SELECT amount FROM owed WHERE userid=$1", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const expensebyid = (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM expense WHERE id=$1", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const updateexpense = (req, res) => {
  const { id } = req.params;
  const { date, description, amount, groupid } = req.body;

  pool.query("UPDATE expense SET date=$1, description=$2, amount=$3, groupid=$4 WHERE id=$5",
    [date, description, amount, groupid, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Record updated successfully");
    }
  );
};

const updateexpenseuser = (req, res) => {
  const { id } = req.params;
  const { userid } = req.body;

  pool.query("UPDATE expenseusers SET userid=$1 WHERE expenseid=$2",
    [userid, id],
    (err) => {
      if (err) {
        throw err;
      }
      res.send("Update complete");
    }
  );
};

const getusers = (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM loginuser WHERE id=$1", [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
};

const insertactivity = (req, res) => {
  const { userid, type, description, date } = req.body;

  pool.query(
    "INSERT INTO activity (userid,type,description,date) VALUES ($1,$2,$3,$4)",
    [userid, type, description, date],
    (err) => {
      if (err) {
        throw err;
      }
      res.send("Record Insert");
    }
  );
};

const getactivity = (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM activity WHERE userid=$1 ORDER BY id DESC;",
    [id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
};

module.exports = {
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
};
