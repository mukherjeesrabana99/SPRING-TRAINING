import { Form, Button, TimePicker, Input } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function UpdateTodoForm({
  handleUpdateSubmit,
  now,
  currentTodo
}) {
  const [todo, setTodo] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/todos/${currentTodo.todoId}`)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((e) => console.log(e));
  }, [currentTodo]);

  useEffect(() => {
    console.log("setting");
    console.log(todo);
    form.setFieldsValue({
      todoTitle: todo.todoTitle
    });
  }, [form, todo]);

  const handleFinish = (todoTitle) => {
    handleUpdateSubmit(
      todoTitle,
      currentTodo.todoStartTime,
      currentTodo.todoEndTime
    );
  };
  return (
    <div>
      <Form
        form={form}
        autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(values) => {
          handleFinish(values.todoTitle);
        }}
        onFinishFailed={(error) => {
          console.log({ error });
        }}
      >
        <Form.Item
          name="todoTitle"
          label="Task Name"
          rules={[
            {
              required: true,
              message: "Please enter task"
            },

            { min: 3, message: "task name cannot be so short" }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            className="btn text-white"
            style={{ backgroundColor: "#000080", marginLeft: "300px" }}
            htmlType="submit"
          >
            Update task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
