import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';


function App() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setRecords(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Router>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <Routes>
          <Route path="/" element={
            <div>
              <table className="w-full text-left table-auto min-w-max">
                <thead className="border-b bg-slate-100">
                  <tr className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="px-6 py-3">Id</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr
                      key={i}
                      className="even:bg-slate-50 odd:bg-white hover:bg-slate-100 transition-all"
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">{r.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{r.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{r.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{r.address.street}</td>
                      <td className="px-6 py-4 text-sm text-gray-800">{r.address.suite}</td>
                      <td>
                        <Link
                          to={`/view/${r.id}`}
                          className="flex items-center justify-center bg-teal-800 hover:bg-infoActive rounded-xl py-2.5 px-5 text-white transition duration-300"
                        >
                          <i className="fa-solid fa-circle-info"></i> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          } />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </Router>
  );
}

function View() {
  const { id } = useParams(); // Get the ID from URL params
  const [record, setRecord] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => setRecord(res.data))
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

export default App;
