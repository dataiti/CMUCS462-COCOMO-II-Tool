import axiosClient from "../configs/axiosConfig";

const calculateFunctionPointsAPI = async ({ data }) => {
  try {
    const res = await axiosClient.post(`/calculate/function-points`, data);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

const calculateSourceLinesOfCodeAPI = async ({ data }) => {
  try {
    const res = await axiosClient.post(`/calculate/source-line-of-code`, data);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export { calculateFunctionPointsAPI, calculateSourceLinesOfCodeAPI };
