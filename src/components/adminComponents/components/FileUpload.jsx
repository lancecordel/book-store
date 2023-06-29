import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loading, notLoading } from '../../../store/loadingSlice';
import { FileUploadOutlined } from '@mui/icons-material';

const Container = {
    display:'flex',
    flexDirection:'column',
    justifyContent:'start',
    alignItems:'center',
    height:'70%',
    width:'80%',
    // border:'1px solid',

};
const uploadContainer = {
    display:'flex', 
    justifyContent:'space-between', 
    flexDirection:'column', 
    height:'150px',
    width:'350px',
    alignItems:'center',
    border:'1px solid silver',
    borderRadius:'10px',
    paddingBottom:'30px',
    boxShadow:'3px 3px 3px rgba(200, 200, 200, .5)',

};
function FileUpload(props) {
    const URL = process.env.REACT_APP_URL;

    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const [dataObject, setDataObject] = useState({});
    const [loading, setLoading] = useState(false);
    const[input, setInput] = useState({
        path: "",
    })

    const handleChange = (e) => {
        console.log(isLoading)
        const{name, value} = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    ;}

    const uploadFile = async () => {
        try{
            if(input.path !== ""){
                setLoading(true);
                // dispatch(loading());
                await axios.post(URL, dataObject)
                .then((res) => {
                    setLoading(false);
                    console.log("Here is the response: ", res);
                    // dispatch(notLoading());
                });
                setInput({
                    path: "",
                })
            }
        } catch(error){
            console.log(error)
        }
    }
  return (
        <div style={Container}>
            <div style={uploadContainer}>
                <h4 style={{color:'grey'}}>Upload file To S3 Bucket</h4>
                <span style={{fontWeight:'400', fontSize:'15px'}}>S3 Bucket URL: </span>
                <input style={{fontSize:'12px', textAlign:'center', width:'80%'}} name='path' type='text' placeholder='upload path' value={input.path} onChange={handleChange}/>
                <div style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    width:'90%'
                }}>
                    <input type="file" style={{fontSize:'15px', padding:'10px'}} onChange={(e) => {
                        // current uploaded file
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        // when file is loaded
                        reader.onload = (e) => {
                            // get base64 encoded file
                            // example: "data:text/xml;base64,ESCKkilahe1"
                            const path = e.target.result;
                            // split into ["data:text/xml", "base64,EACASETXXAAET..."]
                            const segments = path.split(';');
                            // extract "text/xml"
                            const mime = segments[0].split(':')[1];
                            // extract the base64 encoded data ONLY. 
                            // splits into ["base64", "SEACSEiXAE..."] for example
                            const data = segments[1].split(',')[1];
                            // get the file name
                            const name = file.name;
                            setDataObject({
                                mime,
                                name,
                                xml: data,
                            })
                        }
                        reader.readAsDataURL(file);
                        setInput({ path: URL })
                    }} />
                    <FileUploadOutlined onClick={uploadFile}/>
                    {/* <button onClick={uploadFile}>upload</button> */}
                </div>
        </div>
        <div style={{height:'20%'}}>
            {
            loading
            ? <h2>uploading.....</h2>
            : ""
            }
        </div>
    </div>
  );
}

export default FileUpload;
