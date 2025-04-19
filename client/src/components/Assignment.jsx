import React from 'react';
import Table from './Table';
function Assignment(){
    const [assignments,setAssignment] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
        const getAssignments = async () => {
            try{
                setIsLoading(true)
                const response = await fetch("api/assignments")
                if(!response.ok){
            
                    setError("something went wrong cant fetch data")
                }
                const data= await response.json()
                setAssignment(data.assignmnets)
                setIsLoading(false)
            }catch(e){
                setError("something went wrong cant fetch data")
            }
        }
        getAssignments()
    },[])
    if(isLoading){
        return <p>Loading</p>
    }
    if(error){
        return <p>{error}</p>
    }

    return (
        <> 
    
            <Table data={assignments} />
        </>
        
       
    )
}

export default Assignment