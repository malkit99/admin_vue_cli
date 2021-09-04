export const state = {

    cropingModel: false ,
    webCamModel: false ,
    cameraImage : null,
    cropedImage : null,
    avatarImage:null,
    imageURL:null,
    imageFILE:null,
    
};

export const mutations = {
    
    WEB_CAM_MODEL(state , payload){
        state.webCamModel = payload
    },

    CROPING_IMAGE_MODEL(state , payload){
        state.cropingModel = payload
    },

    SET_AVATAR_IMAGE(state , image ){
        state.avatarImage = image ;
        state.cropingModel = true ;
    },

    SET_CROPED_IMAGE(state , image){
        state.cropedImage = image
    },

    SET_IMAGE_URL(state , payload){
        state.imageURL = payload
    },

    DELETE_IMAGE_URL(state , payload){
        state.imageURL = payload
        state.imageFILE = payload
    },

    SET_IMAGE_FILE(state , payload){
        state.imageFILE = payload
    },

    DELETE_CROPED_IMAGE(state , payload){
        state.cropedImage = payload
    }
      
};

export const getters = {
    getAvatarImage(state){
        return state.avatarImage 
    },

    getCropingModel(state){
        return state.cropingModel
    },

    getImageURL(state){
        return state.imageURL
    },

    getImageFile(state){
        return state.imageFILE
    }
}

export const actions = {
 
};
