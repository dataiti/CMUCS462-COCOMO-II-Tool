import axiosClient from "../configs/axiosConfig";

const getListConstructionProjectAPI = async ({
  userId,
  orderBy,
  sortBy,
  q = "",
  page,
}) => {
  const res = await axiosClient.get(
    `/construction/list-construction/${userId}?q=${q}&sortBy=${sortBy}&orderBy=${orderBy}&page=${page}`
  );
  if (res) {
    return res;
  }
};

const getDetailConstructionAPI = async ({ userId, constructionId }) => {
  const res = await axiosClient.get(
    `/construction/detail-construction/${userId}/${constructionId}`
  );
  if (res) {
    return res;
  }
};

const updateConstructionAPI = async ({ userId, constructionId, data }) => {
  const res = await axiosClient.put(
    `/construction/update-construction/${userId}/${constructionId}`,
    data
  );
  if (res) {
    return res;
  }
};

const deleteConstructionAPI = async ({ userId, constructionId }) => {
  const res = await axiosClient.delete(
    `/construction/delete-construction/${userId}/${constructionId}`
  );
  if (res) {
    return res;
  }
};

const saveConstructionAPI = async ({ userId, data }) => {
  const res = await axiosClient.post(
    `/construction/save-construction/${userId}`,
    data
  );
  if (res) {
    return res;
  }
};

export {
  getListConstructionProjectAPI,
  getDetailConstructionAPI,
  saveConstructionAPI,
  updateConstructionAPI,
  deleteConstructionAPI,
};
