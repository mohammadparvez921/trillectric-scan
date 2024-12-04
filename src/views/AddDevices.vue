<script>
import Scan from "./Scan.vue";
import { notify } from "@kyvg/vue3-notification";

export default {
  components: {
    Scan,
  },
  data() {
    return {
      isScanning: false,
      isSimNumber: false,
      isLoading: false,
      data: [],
      form: {
        imei: "",
        simNumber: "",
        mobileNumber: "",
        modelNumber: "",
        serial: "",
      },
      errors: {},
    };
  },
  mounted: async function () {
    if (localStorage.getItem("devices")) {
      this.data = JSON.parse(localStorage.getItem("devices"));
    }
  },
  methods: {
    handleImeiClick() {
      this.isScanning = true;
    },
    handleSimNumberClick() {
      this.isScanning = true;
      this.isSimNumber = true;
    },
    handleDetectedValue(value) {
      this.isScanning = value.isScanning;
      if (value.message) {
        Object.assign(
          this.form,
          this.isSimNumber
            ? { simNumber: value.message }
            : { imei: value.message }
        );
        console.log(this.form);
      }
    },
    validateForm() {
      this.errors = {};

      if (!this.form.imei) {
        this.errors.imei = "IMEI is required*";
      }
      if (!this.form.simNumber) {
        this.errors.simNumber = "SIM Number is required*";
      }

      // Mobile number validation for 10 digits
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!this.form.mobileNumber) {
        this.errors.mobileNumber = "Mobile Number is required*";
      } else if (!mobileRegex.test(this.form.mobileNumber)) {
        this.errors.mobileNumber = "Invalid Mobile Number*";
      }

      if (!this.form.modelNumber) {
        this.errors.modelNumber = "Model Number is required*";
      }
      if (!this.form.serial) {
        this.errors.serial = "Serial is required*";
      }

      return Object.keys(this.errors).length === 0;
    },

    handleSubmit(event) {
      event.preventDefault();
      let details = [];
      if (this.validateForm()) {
        this.isLoading=true;
        Object.keys(this.form).forEach((key) => {
          details.push(this.form[key]);
        });
        this.data.push(details);
        localStorage.setItem("devices", JSON.stringify(this.data));
         this.form= {
        imei: "",
        simNumber: "",
        mobileNumber: "",
        modelNumber: "",
        serial: "",
      },
        notify({
          type: "success",
          title: "",
          text: "✅ Added successfully",
        });
        setTimeout(() => {
          this.isLoading=false;
          this.$router.push({ name: "Devices" });
        }, 1000);
      }
    },
  },
};
</script>

<template>
  <div v-if="!isScanning" class="p-0 w-100" style="margin-top: 3rem">
    <div class="row p-0">
      <div class="col-12 p-3">
        <div class="card w-100 p-3">
          <div
            class="card-header d-flex"
            style="background: rgb(222 221 229); font-weight: 600"
          >
            <p style="font-size: 19px" class="card-title mx-auto p-1">Enter Device Details</p>
          </div>
          <form @submit="handleSubmit" class="p-1">
            <div class="row mb-3">
              <div class="col-8">
                <label for="imeiInput" class="form-label">Enter IMEI</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.imei"
                  id="imeiInput"
                />
              </div>
              <div class="col-4 align-self-end">
                <button
                  type="button"
                  class="btn btn-primary w-75"
                  style="background: #453a94; font-weight: 500 ;outline:none"
                  @click="handleImeiClick"
                >
                  <i class="fa fa-camera me-1" aria-hidden="true"></i>
                </button>
              </div>
              <small class="text-danger">{{ errors.imei }}</small>
            </div>
            <div class="row mb-3">
              <div class="col-8">
                <label for="simNumberInput" class="form-label"
                  >Enter SIM Number</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="form.simNumber"
                  id="simNumberInput"
                />
              </div>
              <div class="col-4 align-self-end">
                <button
                  type="button"
                  class="btn btn-primary w-75"
                  style="background: #453a94; font-weight: 500"
                  @click="handleSimNumberClick"
                >
                  <i class="fa fa-camera me-1" aria-hidden="true"></i>
                </button>
              </div>
              <small class="text-danger">{{ errors.simNumber }}</small>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="mobileNumberInput" class="form-label"
                  >Enter Mobile Number</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="form.mobileNumber"
                  id="mobileNumberInput"
                />
              </div>
              <small class="text-danger">{{ errors.mobileNumber }}</small>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="modelNumberInput" class="form-label"
                  >Enter Model Number</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="form.modelNumber"
                  id="modelNumberInput"
                />
              </div>
              <small class="text-danger">{{ errors.modelNumber }}</small>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="serialInput" class="form-label">Enter Serial</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="form.serial"
                  id="serialInput"
                />
              </div>
              <small class="text-danger">{{ errors.serial }}</small>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <button
                  type="submit"
                  class="btn btn-primary w-100"
                  style="background: #453a94; font-weight: 500"
                  :disabled="isLoading"
                >
                  <span v-if="!isLoading">SAVE</span>
                  <div v-else class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Scan v-else @detected-value="handleDetectedValue" />
</template>

<style scoped>
.text-danger {
  color: red;
  font-size: 0.875rem;
}
</style>
