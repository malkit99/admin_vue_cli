<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <b-card
                        class="mb-4"
                        align-center
                    >
                    <b-card-header class="d-flex justify-content-between align-items-center">
                        <code v-if="device">{{ device.label }}</code>
                        <select v-model="camera">
                            <option>-- Select Device --</option>
                            <option
                                v-for="device in devices"
                                :key="device.deviceId"
                                :value="device.deviceId"
                            >{{ device.label }}</option>
                        </select>
                    </b-card-header>
                        <b-card-body  v-if="!captureImage">     
                            <vue-web-cam
                                ref="webcam"
                                :device-id="deviceId"
                                width="100%"
                                height="250"
                                @error="onError"
                                @cameras="onCameras"
                                @camera-change="onCameraChange"
                                :resolution="resolution"
                                />
                        </b-card-body>
                        <b-card-body  v-if="captureImage" >
                            <figure class="figure">
                                <img :src="img" class="img-responsive" />
                            </figure>
                        </b-card-body>
                        <b-card-footer>
                                <b-link v-b-tooltip.hover title="capture"  variant="primary" @click="onCapture"><i class="mdi mdi-camera-account font-size-24 ml-2"></i></b-link>
                                <b-link v-b-tooltip.hover title="stop"  variant="primary" @click="onStop"><i class="mdi mdi-camera-off font-size-24 ml-2"></i></b-link>
                                <b-link v-b-tooltip.hover title="camera"  variant="primary" @click="onStart"><i class="mdi mdi-camera font-size-24 ml-2"></i></b-link>
                                <b-link v-b-tooltip.hover title="save" @click="saveCaptureImage" variant="primary" ><i class="mdi mdi-content-save-move font-size-24 ml-2"></i></b-link>
                                <b-link v-b-tooltip.hover title="close" @click="hideWebCamModel"  variant="primary" ><i class="mdi mdi-close-box font-size-24 ml-2"></i></b-link>
                        </b-card-footer>          
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { WebCam } from "vue-web-cam";
/**
 * Starter component
 */
export default {
  
  components: { 'vue-web-cam': WebCam },
  data() {
    return {
        img: null,
        camera: null,
        deviceId: null,
        devices: [],
        captureImage: false ,
        resolution:{
            height:250,
            width:400,
        }
    };
  },

    computed: {
        device: function() {
            return this.devices.find(n => n.deviceId === this.deviceId);
        }
    },

    watch: {
        camera: function(id) {
            this.deviceId = id;
        },
        devices: function() {
            // Once we have a list select the first one
            const [first] = this.devices;
            if (first) {
                this.camera = first.deviceId;
                this.deviceId = first.deviceId;
            }
        }
    },

    methods: {
        onCapture() {
            this.img = this.$refs.webcam.capture();
            this.captureImage = true ;
        },
       
      
        onStop() {
            this.$refs.webcam.stop();
        },
        onStart() {
            this.captureImage = false ;
            this.img = null ;
            this.$refs.webcam.start();
        },
        onError(error) {
            alert("On Error Event", error);
        },
        onCameras(cameras) {
            this.devices = cameras;
        },
        onCameraChange(deviceId) {
            this.deviceId = deviceId;
            this.camera = deviceId;
        },

        hideWebCamModel(){
            this.$store.commit('avatar/WEB_CAM_MODEL' , false );
        },

        saveCaptureImage(){
            const captureImage = this.img ; 
            if(captureImage != null && captureImage != ""){
                this.$store.commit('avatar/SET_AVATAR_IMAGE' , captureImage );
                this.$store.commit('avatar/WEB_CAM_MODEL' , false );
                this.$store.commit('avatar/CROPING_IMAGE_MODEL' , true );
            }
            else{
                this.$notify({
                        group: 'foo',
                        title: 'Invalid Data',
                        type: 'error',
                        text: "Please Select Capture Image "
                });
            }
        },
    }
};
</script>
