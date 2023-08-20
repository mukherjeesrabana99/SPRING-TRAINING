import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Alert, Modal, Button, Typography } from "@mui/material";
import { Radio } from "antd";

import AddTaskIcon from "@mui/icons-material/AddTask";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; //
import { useEffect, useState } from "react";
import axios from "axios";
import AddTodoForm from "./AddTodoForm";
import UpdateTodoForm from "./UpdateTodoForm";
import { CheckCircle, Pending } from "@mui/icons-material";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [now, setNow] = useState(0);
  const [currentTodo, setCurrentTodo] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedTodosDeletedAlert, setSelectedTodosDeletedAlert] =
    useState(false);
  const [radioValue, setRadioValue] = useState(null);
  const radioOnChange = (e) => {
    setRadioValue(e.target.value);
  };

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [todoCount, setTodoCount] = useState(0);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      console.log(JSON.parse(event.target.value));
      updatedList = [...checked, JSON.parse(event.target.value)];
    } else {
      updatedList.splice(checked.indexOf(JSON.parse(event.target.value)), 1);
    }
    setChecked(updatedList);
  };

  let todoIds = [];
  checked.map((c) => todoIds.push(c.todoId));

  const handleDeleteSelected = () => {
    console.log(todoIds);
    const params = new URLSearchParams();
    todoIds.forEach((id) => params.append("todoIds", id));
    if (todoIds.length === 0) {
      alert("Check some todos to proceed");
    } else {
      axios
        .delete("http://localhost:8080/todos/deleteSelectedTodos", {
          params: params
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "Selected todos deleted") {
            fetchTodos();
            setSelectedTodosDeletedAlert(true);
            setTimeout(() => setSelectedTodosDeletedAlert(false), 2000);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const handleCompleteSelected = () => {
    checked.map((c) => (c.todoCompleted = true));
    console.log(checked);
    if (checked.length === 0) {
      alert("check some todos to proceed");
    } else {
      axios
        .put("http://localhost:8080/todos/completeSelectedTodos", checked)
        .then((res) => {
          console.log(res.data);

          fetchTodos();
          setRadioValue(null);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/todos/getTodoCount")
      .then((res) => {
        console.log(res.data);
        setTodoCount(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    fetchTodos();
    let today = new Date();
    let todayHour = today.getHours();

    setNow(todayHour);
  }, [now]);

  const style1 = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "auto",
    bgcolor: "white",
    borderRadius: 2,
    padding: 2
  };

  const handleAddTodo = (todoTitle, todoStartTime, todoEndTime) => {
    console.log("adding");
    const newTodo = {
      todoTitle: todoTitle,
      todoStartTime: todoStartTime,
      todoEndTime: todoEndTime
    };
    axios
      .post("http://localhost:8080/todos", newTodo)
      .then((res) => {
        setShowAddModal(false);
        fetchTodos();
      })
      .catch((e) => console.log(e));
  };

  let addModal = (
    <>
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <AddTodoForm handleAddSubmit={handleAddTodo} now={now} />
        </Box>
      </Modal>
    </>
  );

  const handleCompleteTodo = () => {
    const completedTodo = {
      todoTitle: currentTodo.todoTitle,
      todoStartTime: currentTodo.todoStartTime,
      todoEndTime: currentTodo.todoEndTime,
      todoCompleted: true
    };
    axios
      .put(
        `http://localhost:8080/todos/completeTodo/${currentTodo.todoId}`,
        completedTodo
      )
      .then((res) => {
        console.log("ok");
        console.log(res.data);
        setShowCompleteModal(false);
        fetchTodos();
      })
      .catch((e) => console.log(e));
  };

  let completeModal = (
    <>
      <Modal
        open={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          Mark task "{currentTodo.todoTitle}" completed?
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{ margin: 1, marginTop: 2 }}
              onClick={handleCompleteTodo}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              sx={{ margin: 1, marginTop: 2 }}
              onClick={() => setShowCompleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );

  const handleUpdateTodo = (todoTitle, todoStartTime, todoEndTime) => {
    console.log("updating");
    const updatedTodo = {
      todoTitle: todoTitle,
      todoStartTime: todoStartTime,
      todoEndTime: todoEndTime
    };
    axios
      .put(`http://localhost:8080/todos/${currentTodo.todoId}`, updatedTodo)
      .then((res) => {
        console.log("ok");
        console.log(res.data);
        setShowUpdateModal(false);
        fetchTodos();
      })
      .catch((e) => console.log(e));
  };

  let updateModal = (
    <>
      <Modal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <UpdateTodoForm
            handleUpdateSubmit={handleUpdateTodo}
            now={now}
            currentTodo={currentTodo}
          />
        </Box>
      </Modal>
    </>
  );

  const fetchTodos = () => {
    axios
      .get("http://localhost:8080/todos")
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined || res.data !== []) {
          setTodos(res.data);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {selectedTodosDeletedAlert ? (
        <Alert severity="success">Selected Todos Deleted</Alert>
      ) : null}

      <h5 style={{ marginTop: "2%" }}>A Task Management Application</h5>

      <Tippy content="Add Task">
        <AddTaskIcon
          onClick={() => setShowAddModal(true)}
          style={{
            color: "#000080",
            fontSize: "30px",
            cursor: "pointer",
            marginTop: "2%"
          }}
        />
      </Tippy>
      {todos.length > 0 ? (
        <>
          <div id="container">
            <Typography>{todoCount} Todos in your list</Typography>
            {addModal}
            {updateModal}
            {completeModal}
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                boxShadow: "7"
              }}
            >
              <nav aria-label="main mailbox folders">
                <Radio.Group onChange={radioOnChange} value={radioValue}>
                  <Radio value="Complete Selected">Complete Multiple</Radio>
                  <Radio value="Delete Selected">Delete Multiple</Radio>
                </Radio.Group>
                <List>
                  {todos.map((todo) => (
                    <ListItem key={todo.todoId}>
                      <ListItemButton>
                        {todo.todoCompleted === true ? (
                          <Tippy content="task completed">
                            <CheckCircle className="text-success" />
                          </Tippy>
                        ) : (
                          <Tippy content="task pending, click to finish it">
                            <Pending
                              className="text-warning"
                              onClick={() => {
                                setCurrentTodo(todo);
                                setShowCompleteModal(true);
                              }}
                            />
                          </Tippy>
                        )}
                        {radioValue !== null ? (
                          <input
                            style={{ marginLeft: "12px" }}
                            value={JSON.stringify(todo)}
                            type="checkbox"
                            onChange={handleCheck}
                          />
                        ) : null}

                        <ListItemText
                          primary={todo.todoTitle}
                          style={{ marginLeft: "12px" }}
                          className={
                            todo.todoCompleted === true ? "strike" : null
                          }
                        />
                      </ListItemButton>

                      {todo.todoCompleted === false ? (
                        <Tippy content="Update Task">
                          <ModeEditIcon
                            onClick={() => {
                              setCurrentTodo(todo);
                              setShowUpdateModal(true);
                            }}
                            style={{
                              color: "#000080",
                              marginRight: "6px",
                              cursor: "pointer"
                            }}
                          />
                        </Tippy>
                      ) : null}

                      <Tippy content="Remove Task">
                        <DeleteIcon
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </Tippy>
                    </ListItem>
                  ))}
                </List>
                {radioValue === "Complete Selected" ? (
                  <Button onClick={handleCompleteSelected}>
                    Mark Selected Todos Completed
                  </Button>
                ) : (
                  []
                )}

                {radioValue === "Delete Selected" ? (
                  <Button
                    onClick={handleDeleteSelected}
                    style={{ color: "red" }}
                  >
                    Delete Selected Todos
                  </Button>
                ) : (
                  []
                )}
              </nav>
            </Box>
          </div>
        </>
      ) : (
        []
      )}
    </>
  );
}
