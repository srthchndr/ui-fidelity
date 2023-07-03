import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import makeCall, { CALL_TYPE_DELETE, CALL_TYPE_GET, CALL_TYPE_POST, CALL_TYPE_PUT } from '../../utils/restful';
import { Employee, EmployeesState } from '../../types/employeesState';

export const getEmployees = createAsyncThunk(
    'employee/getEmployees', async () => {
      const response = await makeCall({method: CALL_TYPE_GET, URL: '/employees'})
      return response
    }
);

export const addEmployee = createAsyncThunk(
    'employee/addEmployee', async (details: Employee) => {
      const response = await makeCall({method: CALL_TYPE_POST, URL: '/employee', payload: {...details}})
      return response
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee', async (details: Employee, thunkApi) => {
      const response = makeCall({method: CALL_TYPE_PUT, URL: '/employee', payload: {...details}}).then((res) => {
        return res;
      }).catch((res) => {
        return thunkApi.rejectWithValue(res);
      })

      return response;
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee', async (employeeId: string) => {
      const response = await makeCall({method: CALL_TYPE_DELETE, URL: `/employee/${employeeId}`})
      return response
    }
);

const initialState: EmployeesState = {
  employees: [],
  errorMessage: ''
}

export const employeeSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateState: (state, {payload}) => {
      state.employees = [...payload];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, {payload}) => {
        state.employees = payload
    })
    builder.addCase(addEmployee.fulfilled, (state, {payload}) => {
        state.employees = [{...payload}, ...state.employees];        
    })
    builder.addCase(addEmployee.rejected, (state, {payload}: any) => {
      if(payload.clientError) {
        state.errorMessage = payload.errorMessage
      }
    })
    builder.addCase(updateEmployee.fulfilled, (state, {payload}) => {
        state = {...state, employees: state.employees.map((employee) => {
            if(employee._id === payload._id) {
                return {...payload};
            }
            return employee;
        })}
    })
    builder.addCase(updateEmployee.rejected, (state, {payload}: any) => {
      if(payload.clientError) {
        state.errorMessage = payload.errorMessage
      }
    })
    builder.addCase(deleteEmployee.fulfilled, (state, {payload}) => {
        state.employees = state.employees.filter((employee) => employee._id !== payload._id)
    })
  }
})

export const {updateState} = employeeSlice.actions;

export default employeeSlice.reducer