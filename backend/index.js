const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const cors=require("cors")


app.use(express.json());
app.use(cors());

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    console.log(parsedPayload.error);
    res.status(411).json({
      msg: "You sent wrong inputs",
    });
    return;
  }
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: createPayload.Completed || false
  })

  res.json({
    msg:"Todo created"
  })
});

app.get("/todos", async function (req, res) {
  const todos = await todo.find({});
  res.json({
    todos:[]
  });
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "you sent wrong inputs",
    });
    return;
  }

  await todo.update({
    _id:req.body.id
  },{
    completed:True
  })
  res.json({
    msg:"Todo marked as complete"
  })
});

app.listen(3000);