import { connect } from "react-redux";
import Config from "../../Config";
import EmployeeList from "./EmployeeList";
import { GetEmployeeListAction, GetDepartmentListAction} from "../../services/action";
import { notification } from "antd";

const mapStateToProps = (state) => ({
  departmentList: state.departmentList,
  employeeList: state.employeeList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetEmployeeList: () => {
      fetch(Config.API_URL + "auth/employee-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {

          if (response.status === 200) {
            response.json().then((data) => {
              dispatch(GetEmployeeListAction(data));
            });
          } else {
            response.json().then((data) => {
              notification["error"]({
                message: data.message
              });
            });
          }
        })
        .catch((error) => {
          notification["error"]({
            message: "Server Issue"
          });
        });
    },
    GetDepartmentList: () => {

      fetch(Config.API_URL + "auth/department-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              dispatch(GetDepartmentListAction(data));
            });
          } else {
            response.json().then((data) => {
              notification["error"]({
                message: data.message,
                description: "Please try again later.",
              });
            });
          }
        })
        .catch((error) => {
          notification["error"]({
            message: "Server Issue",
            description: "Please try again later.",
          });
        });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
