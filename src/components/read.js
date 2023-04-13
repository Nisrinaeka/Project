import React from "react";
import { Table, Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Read() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState("");

  useEffect(() => {
    // window.location.reload();
    setIsAuthenticated(localStorage.getItem("isAuthenticated"));
    // console.log(isAuthenticated)
    if (!isAuthenticated) {
        // console.log('a')
        // navigate('/login');
        // window.location.reload();
    }
  }, []);
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://643663bc8205915d34f23bf5.mockapi.io/api/v1/icd_ten`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);
  const setData = (data) => {
    let {
      icd_tens_id,
      icd_tens_name_english,
      icd_tens_name_bahasa,
      icd_tens_code,
      icd_tens_type,
    } = data;
    localStorage.setItem("icd_tens_id", icd_tens_id);
    localStorage.setItem("icd_tens_name_english", icd_tens_name_english);
    localStorage.setItem("icd_tens_name_bahasa", icd_tens_name_bahasa);
    localStorage.setItem("icd_tens_code", icd_tens_code);
    localStorage.setItem("icd_tens_type", icd_tens_type);
  };

  const onDelete = async (id) => {
    await axios.delete(
      `https://643663bc8205915d34f23bf5.mockapi.io/api/v1/icd_ten/${id}`
    );
    window.location.reload();
  };
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tens ID</Table.HeaderCell>
            <Table.HeaderCell>Tens Name English</Table.HeaderCell>
            <Table.HeaderCell>Tens Name Bahasa</Table.HeaderCell>
            <Table.HeaderCell>Tens Code</Table.HeaderCell>
            <Table.HeaderCell>Tens Type</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.icd_tens_id}</Table.Cell>
                <Table.Cell>{data.icd_tens_name_english}</Table.Cell>
                <Table.Cell>{data.icd_tens_name_bahasa}</Table.Cell>
                <Table.Cell>{data.icd_tens_code}</Table.Cell>
                <Table.Cell>{data.icd_tens_type}</Table.Cell>
                <Link to="/update">
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.icd_tens_id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
