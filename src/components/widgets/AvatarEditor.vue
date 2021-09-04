<template>
<div>
    <div class="row">
        <div class="col-lg-12">
                <b-card>
                    <b-card-body>
                            <input
                                ref="input"
                                type="file"
                                name="image"
                                accept="image/*"
                                style="display:none;"
                                @change="setImage"
                            />
                            <b-dropdown dropright variant="success" class="m-2">
                                <template slot="button-content">
                                        <img
                                            :src="cropedImageUrl ? cropedImageUrl : avatarURL"
                                            alt
                                            class="rounded-circle avatar-lg"
                                        />
                                </template>
                                <b-dropdown-item-button @click="showFileChooser">Upload Image</b-dropdown-item-button>
                                <b-dropdown-item-button @click="takeCameraImage">Take Image</b-dropdown-item-button>
                                <b-dropdown-item-button @click="deleteCropedImage">Delete Image</b-dropdown-item-button>
                            </b-dropdown>
                    </b-card-body>

                </b-card>
        </div>
    </div>
    
    <b-modal
      id="croper"
      v-model="cropingModel"
      size="lg"
      title="Large modal"
      title-class="font-18"
      hide-footer
      hide-header
      :no-close-on-backdrop="true"
      >
       <div class="d-flex justify-content-between align-items-center" >
            <!-- Emulate built in modal header close button action -->
            <h5>Crope Image</h5>
            <b-link  variant="outline-danger" @click="hideCropingModel">
                <i class="mdi mdi-close font-size-24"></i>
            </b-link>
        </div>
      <croper></croper>
    </b-modal>

      <b-modal
        id="capture"
        size="md"
        v-model="captureModel"
        title="Large modal"
        title-class="font-18"
        hide-footer
        hide-header
        :no-close-on-backdrop="true"
        >
            <div class="d-flex justify-content-between align-items-center" >
            <!-- Emulate built in modal header close button action -->
            <h5>Capture Image</h5>
            <b-link  variant="outline-danger" @click="hideWebCamModel">
                <i class="mdi mdi-close font-size-24"></i>
            </b-link>
            </div>
        <capture></capture>
      </b-modal>
  </div>
</template>
<script>

import Croper from './croper.vue';
import Capture from './capture.vue';

/**
 * Starter component
 */
export default {

  components: { Croper , Capture }, 
  data() {
    return {  
      avatarURL: require("@/assets/images/users/avatar-5.jpg"),
    };
  },

  computed:{
    cropingModel(){
        return this.$store.state.avatar.cropingModel
    },

    captureModel(){
        return this.$store.state.avatar.webCamModel
    },

    cropedImageUrl(){
        return this.$store.state.avatar.cropedImage
    }
  },

  methods:{

    setImage(e) {
      const file = e.target.files[0];

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
            let imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            //this.$refs.cropper.replace(event.target.result);
            this.$store.commit('avatar/SET_AVATAR_IMAGE' , imgSrc );
            this.$store.commit('avatar/CROPING_IMAGE_MODEL' , true );
        };

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },

    showFileChooser() {
      this.$refs.input.click();
    },

    takeCameraImage(){
        this.$store.commit('avatar/WEB_CAM_MODEL' , true );
    },

    hideWebCamModel(){
        this.$store.commit('avatar/WEB_CAM_MODEL' , false );
    },
    hideCropingModel(){
        this.$store.commit('avatar/SET_AVATAR_IMAGE' , null );
        this.$store.commit('avatar/CROPING_IMAGE_MODEL' , false );
    },

    deleteCropedImage(){
        this.$store.commit('avatar/DELETE_CROPED_IMAGE' , null);
    }
  }
};
</script>
