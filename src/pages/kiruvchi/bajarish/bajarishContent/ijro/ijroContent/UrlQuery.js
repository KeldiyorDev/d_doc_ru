import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

// bajarish uchun
export const Perform = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`forDoing/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
      // Alert(setAlert, `${error.response?.data}`, "warning");
    }
  }
  getData();
}

// nazorat uchun
export const Control = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`superVisor/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// umumlashtiruvchi
export const Generalizing = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`gen/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// ma'lumot uchun
export const Information = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`forInfo/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// bajarilmagan
export const NotDone = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`notDoneDocs/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// rad etilgan
export const Rejected = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`rejectedDocs/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// bajarilgan
export const Done = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`doneDocs/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// nazoratdan olish
export const TakeControl = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`document/inProcessDoc/${params.id}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// maxsus nazorat
export const SpecialControl = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`document/inProcessDoc/${params.id}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}

// maxsus nazoratdan olish
export const SpecialTakeControl = (setData, isMounted, params) => {
  const getData = async () => {
    try {
      const res = await axiosInstance.get(`document/inProcessDoc/${params.id}`);
      if (isMounted)
        setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }
  getData();
}