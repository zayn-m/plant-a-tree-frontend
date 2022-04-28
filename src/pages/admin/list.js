import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RemoteTable from "../../components/RemoteTable";
import axios from "../../config/axios.config";

const columns = [
  {
    field: "id",
    name: "ID",
  },
  {
    field: "name",
    name: "Name",
  },
  {
    field: "createdAt",
    name: "Created Date",
    formateDate: true,
  },
];

export default function PlantsList() {
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("/auth/authorize")
      .then((res) => {
        if (res.status !== 200) {
          history.replace("/admin/login");
        }
      })
      .catch((err) => {
        console.log(err);
        history.replace("/admin/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/plants").then((res) => {
      setPlants(res.data);
    });
  };

  return (
    <div className="mt-5">
      <RemoteTable
        title="Plants"
        columns={columns}
        data={plants.content ? plants.content : []}
        fetchData={getData}
        actions={["edit", "delete"]}
        addNew={true}
      />
    </div>
  );
}
