<template> 
      <div>
        <div class="row">
          <div class="col-xl-9">
            <div class="card">
              <div class="card-body">
                <vue-cropper ref="cropper" :src="imageUrl" alt="Source Image" preview=".preview-lg" />
                <div class="mt-2">
                    <b-link v-b-tooltip.hover title="zoom"><i class="mdi mdi-magnify-plus font-size-24 ml-2"  @click.prevent="zoom(0.2)"></i></b-link>
                    <b-link v-b-tooltip.hover title="zoom out"><i class="mdi mdi-magnify-minus font-size-24 ml-2" @click.prevent="zoom(-0.2)"></i></b-link>
                    <b-link v-b-tooltip.hover title="left"><i class="mdi mdi-arrow-left-bold font-size-24 ml-2" @click.prevent="move(-10, 0)"></i></b-link>
                    <b-link v-b-tooltip.hover title="right"><i class="mdi mdi-arrow-right-bold font-size-24 ml-2" @click.prevent="move(10, 0)"></i></b-link>
                    <b-link v-b-tooltip.hover title="up"><i class="mdi mdi-arrow-up-bold font-size-24 ml-2" @click.prevent="move(0, -10)"></i></b-link>
                    <b-link v-b-tooltip.hover title="down"><i class="mdi mdi-arrow-down-bold font-size-24 ml-2" @click.prevent="move(0, 10)"></i></b-link>
                    <b-link v-b-tooltip.hover title="rotate left"><i class="mdi mdi-rotate-left font-size-24 ml-2" @click.prevent="rotate(90)"></i></b-link>
                    <b-link v-b-tooltip.hover title="rotate right"><i class="mdi mdi-rotate-right font-size-24 ml-2" @click.prevent="rotate(-90)"></i></b-link>
                    <b-link v-b-tooltip.hover title="reset"><i class="mdi mdi-lock-reset font-size-24 ml-2" @click.prevent="reset"></i></b-link>   
                    <b-button  variant="primary" class="ml-2" @click.prevent="cropImage">Crop</b-button>
                    <b-button  variant="primary" class="ml-2" @click.prevent="saveCropedImage">Save</b-button>
                    <b-button  variant="primary" class="ml-2" @click.prevent="hideCropingModel">Cancel</b-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3">
            <h5>image preview</h5>
            <div class="preview-lg"></div>
            <h5>croped image</h5>
            <div class="cropped-image">
                    <img
                      v-if="cropImg"
                      :src="cropImg"
                      alt="Cropped Image"
                    />
              <div v-else class="crop-placeholder" />
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { mapGetters } from 'vuex';

/**
 * Cropper component
 */
export default {
  components: { VueCropper,},
  data() {
    return {
      imageUrl: require("@/assets/images/small/img-5.jpg"),
      cropImg : "",
    };
  },

  mounted(){
    if(this.$store.state.avatar.avatarImage != null ){
      let imageSrc = this.$store.state.avatar.avatarImage ;
      this.$refs.cropper.replace(imageSrc);
    }
  },

  computed:{
    ...mapGetters({
        image:'avatar/getAvatarImage',
    }),
  },


  methods: {
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    reset() {
      this.$refs.cropper.reset();
    },

    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },

    hideCropingModel(){
       this.$store.commit('avatar/CROPING_IMAGE_MODEL' , false );
    },

    saveCropedImage(){
      const cropedImage = this.cropImg ; 
      if(cropedImage != null && cropedImage != ""){
        this.$store.commit('avatar/SET_CROPED_IMAGE' , cropedImage );
        this.$store.commit('avatar/CROPING_IMAGE_MODEL' , false );
      }
      else{
        this.$notify({
                group: 'foo',
                title: 'Invalid Data',
                type: 'error',
                text: "Croping Image Not Set"
        });
      }
    },
  }
};
</script>




<style scoped>
.preview-lg {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.preview-crop {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}
.crop-placeholder {
  width: 100%;
  height: 200px;
  margin-bottom: 2px;
  background: #ccc;
}
.cropped-image img {
  max-width: 100%;
  overflow: hidden;
}
</style>