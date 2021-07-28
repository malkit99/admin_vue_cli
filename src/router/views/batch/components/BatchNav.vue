<template>
   <div class="row">
       <div class="col-12">
            <div class="button-items mb-2">
                <b-button :to="{path:'/batch'}"  variant="primary">Batches</b-button>
                <b-button :to="{path:'/standard'}"  variant="primary">Standard</b-button>
                <b-button :to="{path:'/subject'}"  variant="primary">Subject</b-button>
                <b-button :to="{path:'/topic'}" variant="primary">Topic</b-button>
            </div>
       </div>
   </div>
</template>