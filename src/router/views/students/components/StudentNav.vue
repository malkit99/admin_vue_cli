<template>
   <div class="row">
       <div class="col-12">
            <div class="button-items mb-2">
                    <b-button :to="{path:'/student'}"  variant="primary">Students</b-button>
                    <b-button :to="{path:'/student-fee-list'}"  variant="primary">Fee List</b-button>
                    <b-button :to="{path:'/fee-payment-detail'}"  variant="primary">Pay Fee</b-button>
                    <b-button :to="{path:'/subject'}"  variant="primary">Subject</b-button>
                    <b-button :to="{path:'/topic'}" variant="primary">Topic</b-button>
            </div>
       </div>
   </div>
</template>