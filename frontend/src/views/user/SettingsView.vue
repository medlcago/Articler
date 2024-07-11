<script setup>

import Header from "@/components/Header.vue";
import {ref} from "vue";
import {useTextareaAutosize} from "@vueuse/core";
import {useUser} from "@/hooks/user.js";

const {user} = useUser()

const {textarea, input} = useTextareaAutosize({styleProp: 'minHeight'})


const email = ref(user.value.email)
input.value = user.value.profile.status


</script>

<template>
  <Header/>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4 class="mb-0">Profile Settings</h4>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    class="form-control rounded"
                    id="email"
                    v-model="email"
                    required
                />
              </div>
              <div class="form-group">
                <label for="status">Status</label>
                <textarea
                    class="form-control resize-none rounded"
                    ref="textarea"
                    id="status"
                    rows="3"
                    v-model="input"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
  resize: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>