import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
  createTeamMember, 
  getAllTeamMembers, 
  getTeamMemberById, 
  updateTeamMember, 
  deleteTeamMember 
} from './Teamapi';

const initialState = {
  teamMembers: [],
  currentTeamMember: null,
  loading: false,
  success: false,
  error: null,
};
console.log(initialState.teamMembers);


const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    resetTeamState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.currentTeamMember = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Team Member
      .addCase(createTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        console.log(action.payload);
        
        state.teamMembers.unshift(action.payload);
      })
      .addCase(createTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get All Team Members
      .addCase(getAllTeamMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeamMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.teamMembers = action.payload;
        console.log(state.teamMembers);
        
      })
      .addCase(getAllTeamMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Single Team Member
      .addCase(getTeamMemberById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentTeamMember = null;
      })
      .addCase(getTeamMemberById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTeamMember = action.payload;
      })
      .addCase(getTeamMemberById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Team Member
      .addCase(updateTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teamMembers = state.teamMembers.map(member =>
          member._id === action.payload._id ? action.payload : member
        );
        state.currentTeamMember = action.payload;
      })
      .addCase(updateTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Team Member
      .addCase(deleteTeamMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teamMembers = state.teamMembers.filter(
          member => member._id !== action.payload
        );
      })
      .addCase(deleteTeamMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeamState } = teamSlice.actions;
export default teamSlice.reducer;