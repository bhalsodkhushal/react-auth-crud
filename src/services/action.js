export const GetEmployeeListAction = (sources) => {
    return {
        type: 'GET_EMPLOYEE_LIST',
        sources: sources
    }
};

export const GetDepartmentListAction = (sources) => {
   return {
       type: 'GET_DEPARTMENT_LIST',
       sources: sources
   }
};

export const StoreEmployeeAction = (sources) => {
   return {
       type: 'STORE_EMPLOYEE',
       sources: sources
   }
};

export function increment() {
    return {
       type: 'INCREMENT'
    }
 }

 export function decrement() {
    return {
       type: 'DECREMENT'
    }
 }