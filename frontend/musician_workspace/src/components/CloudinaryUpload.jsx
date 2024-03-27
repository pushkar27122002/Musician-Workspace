import { openUploadWidget } from "../utils/CloudinaryService";
import { CloudinaryUploadPreset} from "../config"; 
import { CloudinaryCloudName } from "../config";

const CloudinaryUpload = ({setUrl, setSongName}) => {
  const uploadSongWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: CloudinaryCloudName,
        uploadPreset: CloudinaryUploadPreset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setSongName(result.info.original_filename);
        }else{
          if(error)
          console.log(error);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full mr-4 hover:bg-blue-600" onClick={uploadSongWidget}>
      Select Song
    </button>
  );
};

export default CloudinaryUpload;
