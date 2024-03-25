import toast, { Toaster } from "react-hot-toast";
import { openUploadWidget } from "../utils/CloudinaryService";
// import { cloudName, preset } from "../config";
const CloudinaryUpload = ({setUrl, setName}) => {
  const uploadImageWidget = () => {
    // console.log(props);
    // console.log(preset)
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "djodcayme",
        uploadPreset: "SpotifyClone_preset", 
        // resourseType: "audio",
        // restrict extensions for audio file ->
        // tags: ["myname"],
        // maxImageWidth: 600,
        // sources: ["local", "url", "camera"]
        // can i restrict the file type here? -> how? 
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
            console.log("Done! Here is the song info: ", result.info);
            console.log("res.info =>",result.info);
            setUrl(result.info.secure_url);
            setName(result.info.original_filename);
        //   props.onImageUpload(result.info.public_id);
        // toast.success('Song uploaded successfully', {
        //     duration: 5000,
        //     style: {
        //       fontWeight: 'bold',
        //     },
        //   });
        }
        else{
            if(error){
                console.log(error);
                console.log("Error in uploading song");
            toast.error('Error in uploading song', {
                style: {
                  fontWeight: 'bold',
                },
              });
            }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="greenButton text-black font-semibold text-md bg-white rounded-full px-3 py-3" 
        // onClick={uploadImageWidget}
        onClick={ () => {
            toast.loading("Please wait", {
                duration : 2500
            })
            uploadImageWidget();
        }}
    >
        <Toaster/>
    Select Track
    </button>
  );
};

export default CloudinaryUpload;
