import { Form, Button, TimePicker, Input } from "antd";
import moment from "moment";

export default function AddTodoForm({ handleAddSubmit, now }) {
  const handleFinish = (todoTitle, todoStartTime, todoEndTime) => {
    handleAddSubmit(
      todoTitle,
      moment(todoEndTime)._i.$d.getHours() +
        ":" +
        moment(todoEndTime)._i.$d.getMinutes(),
      moment(todoStartTime)._i.$d.getHours() +
        ":" +
        moment(todoStartTime)._i.$d.getMinutes()
    );
    console.log(todoTitle, moment(todoEndTime));
  };
  return (
    <div>
      <Form
        autoComplete="off"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={(values) => {
          handleFinish(
            values.todoTitle,
            values.todoStartTime,
            values.todoEndTime
          );
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
          <Input placeholder="Type your Task" />
        </Form.Item>
        <Form.Item
          name="todoStartTime"
          label="Task Start Time"
          rules={[
            {
              required: true,
              message: "Please enter start time"
            },
            {
              validator: (_, value) =>
                Number(
                  (
                    moment(value)._i.$d.getHours() +
                    ":" +
                    moment(value)._i.$d.getMinutes()
                  ).split(":")[0]
                ) > now
                  ? Promise.reject("Please enter valid time.")
                  : Promise.resolve()
            }
          ]}
          hasFeedback
        >
          {/* <input type="time" style={{ width: "100%" }}></input> */}
          <TimePicker
            style={{ width: "100%" }}
            format="HH:mm"
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
          />
        </Form.Item>
        <Form.Item
          name="todoEndTime"
          label="Task End Time"
          rules={[
            {
              required: true,
              message: "Please enter end time"
            },
            {
              validator: (_, value) =>
                Number(
                  (
                    moment(value)._i.$d.getHours() +
                    ":" +
                    moment(value)._i.$d.getMinutes()
                  ).split(":")[0]
                ) < now
                  ? Promise.reject("Please enter valid time.")
                  : Promise.resolve()
            }
          ]}
          hasFeedback
        >
          {/* <input type="time" style={{ width: "100%" }}></input> */}
          <TimePicker
            style={{ width: "100%" }}
            format="HH:mm"
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="btn text-white"
            style={{ backgroundColor: "#000080", marginLeft: "280px" }}
            htmlType="submit"
          >
            Enter task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
