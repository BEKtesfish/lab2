function Table({ data }) {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Project Name</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(assignment => (
            <tr key={assignment._id}>
              <td>{assignment.employeeId?._id}</td>
              <td>{assignment.employeeId?.fullName}</td>
              <td>{assignment.projectId?.name}</td>
              <td>{new Date(assignment.startDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  
  export default Table