import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function View() {
  const { id } = useParams(); // Retrieve the ID from the URL
  const [record, setRecord] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        setRecord(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">User Details</h2>
      <div className="mt-4">
        <p><strong>Name:</strong> {record.name}</p>
        <p><strong>Email:</strong> {record.email}</p>
        <p><strong>Address:</strong> {record.address.street}, {record.address.city}</p>
        <p><strong>Phone:</strong> {record.phone}</p>
        <p><strong>Website:</strong> {record.website}</p>
      </div>
    </div>
  );
}

export default View;
