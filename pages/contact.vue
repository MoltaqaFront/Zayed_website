<template>
  <section class="contact">

    <div class="all_content">
      <div class="container">

        <div class="row justify-content-center">

          <div class="col-lg-10">

            <div class="box_contact">
              <div class="row">

                <div class="all_info" data-aos="fade-left">

                  <div class="head text-center">
                    <h3 class="main_head text-center">{{ $t('contact.title') }}</h3>
                  </div>

                  <ValidationObserver v-slot="{ invalid }" ref='observer'>
                    <form action="" @submit.prevent="sendData">

                      <ValidationProvider rules="required" :name="$t('contact.name')" v-slot="{ errors }">
                        <div class="form-group">
                          <input type="text" v-model="form.name" :placeholder="$t('contact.name')" />
                          <span class="validation_message">{{ errors[0] }}</span>
                        </div>

                      </ValidationProvider>
                      <ValidationProvider rules="required|email" :name="$t('contact.email')" v-slot="{ errors }">
                        <div class="form-group">
                          <input type="email" v-model="form.email" :placeholder="$t('contact.email')" />
                          <span class="validation_message">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>

                      <ValidationProvider rules="required" :name="$t('contact.mobile')" v-slot="{ errors }">
                        <div class="form-group">
                          <input type="text" v-model="form.mobile" :placeholder="$t('contact.phone')" />
                          <span class="validation_message">{{ errors[0] }}</span>
                        </div>

                      </ValidationProvider>

                      <ValidationProvider rules="required" :name="$t('contact.body')" v-slot="{ errors }">
                        <div class="form-group">
                          <textarea v-model="form.body" :placeholder="$t('contact.message')"></textarea>
                          <span class="validation_message">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>

                      <div class="form-group d-flex">
                        <button class="send_btn main--btn" :disabled="invalid" aria-label="send" title="send"
                          type="submit">{{
                            $t('contact.send') }}</button>
                      </div>

                    </form>
                  </ValidationObserver>

                </div>


              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

  </section>
</template>

<script>

import { ValidationProvider, ValidationObserver } from "vee-validate";
import Swal from 'sweetalert2';

export default {

  name: "contactPage",

  layout: 'staticContent',


  // define all properties

  components: {
    ValidationProvider,
    ValidationObserver,
    Swal
  },


  data() {
    return {

      form: {
        name: "",
        email: "",
        mobile: "",
        body: "",
        // message_title:"fdsadsf",
        type: "request"
      },


    }
  },

  created() {

  },


  computed: {
  },

  //  when component load

  mounted() {

    window.scrollTo(0, 0);
    this.$nextTick(() => {
      window.scrollTo(0, 0);
    });
  },


  // All methods and logic

  methods: {
    // send data from contact form

    async sendData() {

      try {
        await this.$axios.$post('contacts', this.form).then(response => {
          this.form.name = '';
          this.form.email = '';
          this.form.mobile = '';
          this.form.body = '';

          this.$refs.observer.reset();

          console.log(response)

          this.$swal.fire({
            position: 'center',
            type: 'success',
            text: `${response.message}`,
            showConfirmButton: false,
            timer: 3000
          })

          this.$router.push(this.localePath({ path: "/" }));


        }).catch(error => {

          this.$swal.fire({
            position: 'center',
            type: 'error',
            text: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 3000
          })

          console.log(error)

        })
      } catch (error) {
        console.log('try catch =>', error);
      }

    },

  }
}
</script>

<style lang="scss" scoped>
.validation_message {
  font-size: 13px;
  color: red;
}
</style>
