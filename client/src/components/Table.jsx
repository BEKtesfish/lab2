import style from './Table.module.css'
function Table({ data,setAssignment }) {
  const handleSort = async (name)=>{
    console.log("clicked")
    switch(name){
    
      case "fullName":
        setAssignment(prev=>
          [...prev].sort((a, b) =>  
            a.employeeId.fullName.localeCompare(b.employeeId.fullName)
                        )
                      );
        break
      
        case "projectName":
          setAssignment(prev=>
            [...prev].sort((a, b) =>  
              a.projectId.name.localeCompare(b.projectId.name)
                          )
                        );
          break
      case "startDate":
        setAssignment(prev =>
          [...prev].sort((a, b) =>
          new Date(a.startDate) - new Date(b.startDate)
            )
          );
      break;
      default:
        console.warn("Unknown sort key:", name);
        break;



    }

  }
    return (
      <table className={style.table}border="1">
        <thead>
          <tr>
       
            <th onClick={() => handleSort('fullName')}>Employee Name</th>
            <th onClick={() => handleSort('projectName')}>Project Name</th>
            <th onClick={() => handleSort('startDate')}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(assignment => (
            <tr key={assignment._id}>
             
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