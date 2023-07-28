import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance, axiosInstanceKadr } from '../../config'

// export const getUsers = createAsyncThunk(
//   'users/getUsers',
//   async ({oi, currentPage, size}) => {
//     const response = await axiosInstanceKadr.get(`getAll/${oi}/?page=${currentPage}&size=${size}`)
//     return response.data
//   }
// )

export const getUserByToken = createAsyncThunk(
  'users/getUserByToken',
  async () => {
    const response = await axiosInstance.post(`auth/loginOneId`)
    return response.data
  }
)

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (userId) => {
    const response = await axiosInstanceKadr.get(`byId/${userId}`)
    return response.data
  }
)

export const getRelativeData = createAsyncThunk(
  'users/getRelativeData',
  async (userId) => {
    const response = await axiosInstanceKadr.get(`relative/getByKadr/${userId}`)
    return response.data
  }
)

export const getEmpBook = createAsyncThunk(
  'users/getEmpBook',
  async (userId) => {
    const response = await axiosInstanceKadr.get(`work/book/getByUser/${userId}`)

    const arr = []
    response.data.forEach((emp) => {
      emp.isEdit = false
      arr.push(emp)
    })

    return arr
  }
)

export const getCv = createAsyncThunk(
  'users/getCv',
  async (userId) => {
    const response = await axiosInstanceKadr.get(`CV/getById/${userId}`)
    return response.data
  }
)

const initialState = {
  users: [],
  userInfo: {},
  empBook: [],
  relativeData: [],
  cvData: {},
  token: ""
}

export const kadrlar = createSlice({
  name: 'kadrlar',
  initialState,
  reducers: {
    //Users
    getUsers: (state, action) => {
      state.users = action.payload
    },

    updateImage: (state, action) => {
      const newData = state.users?.map((item) => {
        if (item.id === action.payload?.id) {
          item.avatarPath = action.payload?.avatarPath
        }
        return item
      })
      state.users = newData
    },

    deleteImage: (state, action) => {
      const newData = state.users?.map((item) => {
        if (item.id === action.payload) {
          item.avatarPath = ""
        }
        return item
      })
      state.users = newData
    },


    addUser: (state, action) => {
      state.users = [...state.users, action.payload]
    },

    deleteUser: (state, action) => {
      let arr = state.users?.filter((kadr) => kadr.id !== action.payload)
      state.users = arr
    },

    //Mehnat daftarchasi

    addEmpBook: (state, action) => {
      state.empBook = [...state.empBook, action.payload]
    },

    deleteEmpBook: (state, action) => {
      state.empBook = action.payload
    },

    editEmpBook: (state, action) => {
      console.log(action.payload);
      let newEmpBook = state.empBook?.map((item) => {
        if (item.id === action.payload.id) {
          item.orderNumber = action.payload.orderNumber
          item.companyName = action.payload.companyName
          item.startDate = action.payload.startDate
          item.endDate = action.payload.endDate
        }

        return item
      })

      console.log(newEmpBook);
      state.empBook = newEmpBook
    },

    swapFunc: (state, action) => {
      const arr = state.empBook?.map((emp) => {
        if (emp.id === action.payload) {
          emp.isEdit = !emp.isEdit
          emp.isNew = false
          console.log(emp.id, action.payload);
        }

        return emp
      })
      console.log(state.empBook);
      console.log(arr);

      state.empBook = arr
    },

    addEmpEditBook: (state, action) => {
      state.empBook.pop()
      state.empBook.push(action.payload)
    },

    //Qarindoshlar

    addRelative: (state, action) => {
      state.relativeData = [...state.relativeData, action.payload]
    },

    deleteRelative: (state, action) => {
      let arr = state.relativeData.filter((item) => item.id !== action.payload)

      state.relativeData = arr
    },

    editRelative: (state, action) => {
      let arr = state.relativeData?.map((item) => {
        if (item.id === action?.payload?.id) {
          item.kinship = action?.payload?.kinship;
          item.locus = action?.payload?.locus;
          item.workplace = action?.payload?.workplace;
          item.lastName = action?.payload?.lastName;
          item.firstName = action?.payload?.firstName;
          item.middleName = action?.payload?.middleName;
          item.birthDate = action?.payload?.birthDate;
          item.birthPlace = action?.payload?.birthPlace;
        }
        return item
      })

      state.relativeData = arr
    },

    //CV
    editCv: (state, action) => {
      state.cvData = action.payload
    },

    //UserInfo
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(getUsers.fulfilled, (state, action) => {
    //   state.users = action.payload
    // })

    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state.token = action.payload
    })

    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })

    builder.addCase(getRelativeData.fulfilled, (state, action) => {
      state.relativeData = action.payload
    })

    builder.addCase(getEmpBook.fulfilled, (state, action) => {
      state.empBook = action.payload
    })

    builder.addCase(getCv.fulfilled, (state, action) => {
      state.cvData = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { getUsers, updateImage, deleteImage, addUser, deleteUser, addEmpBook, addEmpEditBook, swapFunc, addRelative, editRelative, getUserInfo, updateUserInfo, editCv, deleteEmpBook, editEmpBook, deleteRelative } = kadrlar.actions

export default kadrlar.reducer