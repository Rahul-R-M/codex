import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as Yup from "yup";
import {
  addUserTask,
  deleteUserTask,
  editUserTask,
} from "../../store/users/userSlice";

const UserDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.Users);
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewUser, setViewUser] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const userData = JSON.parse(localStorage.getItem("Signupdata")) || [];

  // Toggle Modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setViewModal(false);
    setIsEditMode(false);
    resetForm();
  };

  // Handle input changes
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
    status: Yup.string().required("Status is required"),
  });

  // Add or edit task
  const onSubmit = (values) => {
    if (isEditMode) {
      // Edit the task
      const updatedTasks = UserTaskList?.map((task) =>
        task.taskid === values.taskid ? values : task
      );
      const userTask = userData?.map((item) =>
        +item.id === +id ? { ...item, task: updatedTasks } : item
      );
      dispatch(editUserTask(userTask));
    } else {
      // Add new task
      const newTask = { ...values, taskid: Math.floor(Math.random() * 1000) };
      const userTask = userData?.map((item) =>
        +item.id === +id ? { ...item, task: [...item.task, newTask] } : item
      );
      dispatch(addUserTask(userTask));
    }
    resetForm();
    handleClose();
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      status: "1",
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  // View task
  const handleView = (task) => {
    setViewModal(true);
    setViewUser(task);
  };

  const UserTaskList = useMemo(() => {
    const userData = users?.filter((item) => +item.id === +id)[0]?.task;
    const userAssign = users
      ?.filter((item) => item?.name === "admin")[0]
      ?.task?.filter((task) => +task?.role === +id);
    return [...userData, ...userAssign];
  }, [id, users]);

  const handleEdit = (task) => {
    setIsEditMode(true);
    setValues(task);
    setShowModal(true);
  };

  const handleDelete = (taskid) => {
    const deleteTask = UserTaskList?.filter((item) => item.taskid !== taskid);
    const userTask = users?.map((item) =>
      +item.id === +id ? { ...item, task: deleteTask } : item
    );
    dispatch(deleteUserTask(userTask));
  };

  return (
    <div className="container mt-4">
      <h2>User Dashboard (ID: {id})</h2>

      <button className="btn btn-primary mb-3" onClick={handleShow}>
        Add Task
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {UserTaskList?.map((task) => (
            <tr key={task.taskid}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.date}</td>
              <td>
                {task.status === "1"
                  ? "Pending"
                  : task.status === "2"
                  ? "In Progress"
                  : "Completed"}
              </td>
              <td>
                <button
                  className="btn btn-info mr-2"
                  onClick={() => handleView(task)}
                >
                  <i className="fa fa-eye"></i> View
                </button>
                <button
                  className="btn btn-warning mr-2"
                  onClick={() => handleEdit(task)}
                >
                  <i className="fa fa-edit"></i> Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.taskid)}
                >
                  <i className="fa fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
          {UserTaskList?.length === 0 && (
            <tr className="text-center">
              <td colSpan="5">No tasks found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit Task */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEditMode ? "Edit Task" : "Add Task"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                  {errors.title && touched.title && (
                    <div className="text-danger">{errors.title}</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                  {errors.description && touched.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                  />
                  {errors.date && touched.date && (
                    <div className="text-danger">{errors.date}</div>
                  )}
                </div>
                <div className="form-group mt-3">
                  <label>Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value="1">Pending</option>
                    <option value="2">In Progress</option>
                    <option value="3">Completed</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  {isEditMode ? "Update Task" : "Add Task"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${viewModal ? "show" : ""}`}
        style={{ display: viewModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{"View Task"}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Title:</strong> {viewUser.title}
              </p>
              <p>
                <strong>Description:</strong> {viewUser.description}
              </p>
              <p>
                <strong>Date:</strong> {viewUser.date}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {viewUser.status === "1"
                  ? "Pending"
                  : viewUser.status === "2"
                  ? "In Progress"
                  : "Completed"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Modal */}
      {(showModal || viewModal) && (
        <div className="modal-backdrop fade show" onClick={handleClose}></div>
      )}
    </div>
  );
};

export default UserDashboard;
