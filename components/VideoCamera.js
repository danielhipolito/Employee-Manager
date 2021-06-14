import {useState, useEffect} from "react";
import RecordRTC,{MediaStreamRecorder} from 'recordrtc';

const VideoCamera = props => {
    const [video,setVideo] = useState({});
    const [capturedPhoto,setCapturedPhoto] = useState("");
    const [hasCapturedPhoto,setHasCapturedPhoto] = useState(false);

    const startRecording = async camera => {     
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        let recorder = RecordRTC(camera, {
            type: 'video'
        });
        recorder.startRecording();
        setVideo(document.querySelector('video'));
    };

    const setUpMedia = () => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function(camera) {
            startRecording(camera);
        }).catch(function(error) {
            alert('Unable to capture your camera. Please check console logs.');
            console.error(error);
        });        
    };

    useEffect(() => {
        setUpMedia();
        if(Object.keys(video).length) {
            video.play();          
        }
    } , [video]);
    function getBase64Image(img) {
        var canvass = document.createElement("canvass");
        // canvass.width = img.width;
        // canvass.height = img.height;
    
        var ctx = canvass.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        var dataURL = canvass.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
   
    const takePhoto = video => {
        let canvas = document.createElement('canvas');
        video.pause();
        canvas.width = video.videoWidth || video.clientWidth;
        canvas.height = video.videoHeight || video.clientHeight;
        let context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let image = new Image();
        image.src = canvas.toDataURL("image/png");
        setCapturedPhoto(image.src);
        setHasCapturedPhoto(true);
        let employeePhoto = document.getElementById('captured-img');
        // imgData = getBase64Image(employeePhoto);
        props.onPhotoCapture (canvas.toDataURL("image/png"),props.employee );
        // localStorage.setItem("imgData", imgData);
    };

    const getPhoto = () => {
        takePhoto(video);
    };

    function stopRecordingCallback() {
        // video.src = video.srcObject = null;
        // video.muted = false;
        // video.volume = 1;
        // video.src = URL.createObjectURL(recorder.getBlob());
        
        // recorder.camera.stop();
        // recorder.destroy();
        // recorder = null;
    }
    
    
    return <div className="row d-flex justify-content-center">
        {!hasCapturedPhoto 
            ? <> <div className ="col-lg-12">
                    <p>Sonrie a la cámara y cuando estes listo presiona Capturar</p>
                </div>
                <div id="123 p-3" className ="col-lg-12">
                    <video autoplay playsinline width="100%" height ="100%"></video>
                </div>
                <div className ="col-lg-12 mt-2 text-center">
                    <button onClick={getPhoto} className ="btn btn-employees-manager-app">
                        Capturar!
                    </button>
                </div> 
            </>
            : <>
                <div className = "col-lg-12">
                    <p>Foto capturada correctamente. Ya puedes cerrar esta ventana.</p>
                </div>
                <div className = "col-lg-10">
                    <img src={capturedPhoto} width="100%" height ="100%" id ="captured-img"/>
                </div>
            </>}
    </div>
};

export default VideoCamera;