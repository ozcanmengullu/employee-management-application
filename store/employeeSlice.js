import { createSlice } from 'https://cdn.skypack.dev/@reduxjs/toolkit';

const generateMockEmployees = (count = 15) => Array.from({ length: count }, (_, i) => ({
  id: i + 1,
  firstName: ['Ahmet', 'Mehmet', 'Ayşe', 'Fatma', 'Ali', 'Zeynep', 'Can', 'Ece'][Math.floor(Math.random() * 8)],
  lastName: ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Öztürk', 'Aydın', 'Yıldız'][Math.floor(Math.random() * 7)],
  dateOfEmployment: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  dateOfBirth: new Date(1980 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  phone: `0${Math.floor(Math.random() * 1000000000).toString().padStart(10, '5')}`,
  email: `calisan${i + 1}@sirket.com`,
  department: ['Analytics', 'Tech'][Math.floor(Math.random() * 5)],
  position: ['Junior', 'Medior', 'Senior'][Math.floor(Math.random() * 5)]
}));

const existingData = JSON.parse(localStorage.getItem('persist:root'));
const initialEmployeeData = existingData ? 
  JSON.parse(existingData.employeeData) : 
  generateMockEmployees(5);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employeeData: initialEmployeeData
  },
  reducers: {
    addEmployee: (state, action) => { 
      const maxId = Math.max(...state.employeeData.map(emp => emp.id), 0);
      state.employeeData.push({ ...action.payload, id: maxId + 1 }); 
    },
    editEmployee: (state, action) => {
      const index = state.employeeData.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) state.employeeData[index] = action.payload;
    },
    deleteEmployee: (state, action) => {
      state.employeeData = state.employeeData.filter(emp => emp.id !== action.payload.id);
    }
  }
});

export const { addEmployee, editEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
