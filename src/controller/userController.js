import pool from "../configs/connectDB";

let getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM USER");

  return res.status(200).json({
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  console.log("create-user ", req.body);
  let { userName, passWord, name, avatar, email, create_Time } = req.body;

  if (!userName || !passWord || !name || !avatar || !email || !create_Time) {
    return res.status(404).json({
      message: "Wrong input data",
    });
  } else {
    function generateRandomId() {
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";

      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    let id_User = generateRandomId();
    const time_Create = new Date(create_Time);

    try {
      let result = await pool.execute(
        "INSERT INTO USER values (?, ?, ?, ?, ?, ?, ?)",
        [id_User, userName, passWord, name, avatar, email, time_Create]
      );

      if (result) {
        console.log("Create user success ", result);
        return res.status(200).json({
          message: "Create new user successfully",
        });
      } else {
        return res.status(404).json({
          message: "Create user failed",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

let updateUser = async (req, res) => {
  try {
    let { userID, userName, passWord, name, avatar, email, create_Time } = req.body;
    if (!userID || !userName || !passWord || !name || !avatar || !email || !create_Time) {
      return res.status(404).json({
        message: "Wrong input data",
      });
    }

    const time_Create = new Date(create_Time);

    const [user] = await pool.execute(
      "UPDATE USER SET USERNAME = ?, PASSWORD = ?, NAME = ?, AVATAR = ?, EMAIL = ?, CREATETIME = ? where USERID = ?",
      [userName, passWord, name, avatar, email, time_Create, userID]
    );
    return res.status(200).json({
      message: "Update user successful",
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteUser = async (req, res) => {
  try {
    let id_User = req.params.id;
    console.log("id_User: " + id_User);
    if (!id_User) {
      return res.status(404).json({
        message: "Delete user failed",
      });
    } else {
      await pool.execute("DELETE FROM USER WHERE USERID = ?", [
        id_User,
      ]);
      console.log("check: ", id_User);
      return res.status(200).json({
        message: "Delete user successful",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser
};
