import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const Response = await request;
  return Response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const Response = await request;
  return Response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const Response = await request;
  return Response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

// Määritetty objekti virheilmoitusten pois saamiseksi
const personService = { getAll, create, update, remove };
export default personService;
