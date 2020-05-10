import { connect } from "react-redux";
import Config from "../../Config";
import EmployeeAdd from "./EmployeeAdd";
import { GetDepartmentListAction, StoreEmployeeAction} from "../../services/action";
import { notification } from "antd";

const mapStateToProps = (state) => ({
  departmentList: state.departmentList,
  storeEmployeeRes: state.storeEmployee,
});

const mapDispatchToProps = (dispatch) => {
  return {

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
    StoreEmployee: (postData) => {
      
      fetch(Config.API_URL + "auth/employee-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          
          response.json().then((data) => {
            data.status = response.status;
            dispatch(StoreEmployeeAction(data));
          });
        
        })
        .catch((error) => {
          console.log("error", error);
          
        });
    }    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAdd);
