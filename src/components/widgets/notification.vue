<template>
<b-container v-if="notification" class="animate__animated animate__slideInRight" fluid>
    <b-row align-h="end">
        <b-col lg="4" >
            <b-alert
                :show="notification.count"
                dismissible
                :variant="notification.color"
                >
                {{ notification.message }}
            </b-alert>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    data(){
        return{
            dismissSecs: 10 ,
        }
    },

    computed:{
        ...mapGetters({
            notification:'notification/getNotification',
        }),
    },
 

}
</script>

<style>

</style>