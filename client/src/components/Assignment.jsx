import React from 'react';
import Table from './Table';
function Assignment(){
    const [assignments,setAssignment] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
  
   const getAssignments = async () => {
    try{
   
       
        if(!isLoading){
            setIsLoading(true)
            const response = await fetch("api/assignments")
            if(!response.ok){
                setError("something went wrong cant fetch data")
            }
            const data= await response.json()
            setAssignment(data.assignmnets)
            setIsLoading(false)
        }
        
    }catch(e){
        setError("something went wrong cant fetch data")
    }
    }
 
    React.useEffect(()=>{
        getAssignments()
        
        const intervalId=setInterval(()=>{
            console.log("reloaded")
            getAssignments()
           },15000)
        return () => clearInterval(intervalId);
        
    },[])
    if(isLoading){
        return <p>Loading</p>
    }
    if(error){
        return <p>{error}</p>
    }

    return (
        <> 
    
            <Table setAssignment={setAssignment} data={assignments} />
        </>
        
       
    )
}

export default Assignment