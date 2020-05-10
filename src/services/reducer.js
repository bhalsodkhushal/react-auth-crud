const initialState = {
  employeeList: [],
  departmentList: [],
  storeEmployee:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_LIST":
      return { ...state, employeeList: action.sources };
    case "GET_DEPARTMENT_LIST":
      return { ...state, departmentList: action.sources };
    case "STORE_EMPLOYEE":
      return { ...state, storeEmployee: action.sources };

    default:
      return state;
  }
};
export default reducer;
