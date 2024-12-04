<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
import { notify } from "@kyvg/vue3-notification";
import torch from "../assets/torch.png";

export default {
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture,
  },
  data() {
    return {
      torch,
      pauseCamera: false,
      isLoading: true,
      isFileUploaded: false,
      environment:null,
      isTorchSupported: false,
      torchActive: false,
      activeStyle:{
        backgroundColor: 'white',
        borderRadius: '50%'
      },
      inactiveStyle:{
        backgroundColor: 'inherit',
      }
    };
  },
  mounted: async function () {
    console.log("Mounted");
  },
  updated: function () {},
  methods: {
  async onReady(result) {
      //use to show loader
      this.isLoading = false;
      this.isTorchSupported=result.torch;
      notify({
        type: "success",
        title: "",
        text: "🎥 Capturing...",
      });
    },

    async onDetect(result) {
      this.pauseCamera = true;
      if(result.length>0){
        notify({
        type: "success",
        title: "",
        text: "✅ Captured successfully",
      });
        let msg = {
        isScanning: false,
        message: result.shift().rawValue,
      };
      setTimeout(() => {
        this.$emit("detected-value", msg);
      }, 1000);
      }else{
        notify({
        type: "error",
        title: "",
        text: "⚠️ Upload Qr or 1D barcode",
      });
      }
      
    },

    async onDetectFromUpload(result) {
      console.log(result);
      
      if(result.length>0){
        notify({
        type: "success",
        title: "",
        text: "✅ Scanned successfully",
      });
        let msg = {
        isScanning: false,
        message: result.shift().rawValue,
      };
      setTimeout(() => {
        this.$emit("detected-value", msg);
      }, 1000);
      }else{
        notify({
        type: "error",
        title: "",
        text: "⚠️ Upload Qr or 1D barcode",
      });
      } 
    },

    async onErrorFromUpload(result) {
      notify({
        type: "error",
        title: "",
        text: "⚠️ Something went wrong",
      });
    },

    async onError(error) {
      if (error.name === 'NotAllowedError') {
        // user denied camera access permisson
        notify({
        type: "error",
        title: "",
        text: "⚠️ Allow Ccamera permissions",
      });        
      } else if (error.name === 'NotFoundError') {
        // no suitable camera device installed
        notify({
        type: "error",
        title: "",
        text: "⚠️ Camera not found",
      }); 
      } else if (error.name === 'NotSupportedError') {
        // page is not served over HTTPS (or localhost)
        notify({
        type: "error",
        title: "",
        text: "⚠️ Connection is not secure",
      });         
      } else if (error.name === 'NotReadableError') {
        // maybe camera is already in use
        notify({
        type: "error",
        title: "",
        text: "⚠️ Camera already in use",
      });  
      } else {
        // browser might be lacking features (WebRTC, ...)
        notify({
        type: "error",
        title: "",
        text: "⚠️ Browser issue detected.",
      });  
      }
      
    },

    async handleTorchClick() {
     if(this.isTorchSupported){
         this.torchActive=!this.torchActive;
     }else{
       notify({
        type: "error",
        title: "",
        text: "⚠️ Torch not supported", 
     })
    }
    },
   

    async handleBackClick() {
      let msg = {
        isScanning: false,
        message: "",
      };
      this.$emit("detected-value", msg);
    },
  },
};
</script>

<template>
  <div class="p-0 w-100" style="margin-top: 3rem">
    <div class="row p-0">
      <div class="col-12 p-3">
        <div class="card w-100 p-3 h-100">
          <div
            class="card-header d-flex flex-row justify-content-between align-items-center"
            style="background: rgb(222 221 229); font-weight: 600"
          >
            <p style="font-size: 19px" class="card-title p-1">Scan</p>
            <div @click="handleTorchClick" class="p-1"  :style="torchActive ? activeStyle : inactiveStyle">
              <img :src="torch" alt="torch"  />
            </div>
            <i
              class="fa fa-angle-left p-2"
              style="font-size: 25px; cursor: pointer"
              @click="handleBackClick"
              aria-hidden="true"
            ></i>
          </div>
          <div class="camera-body" style="border: 2px solid #453a94;border-radius:10px">
            <qrcode-stream
              @camera-on="onReady"
              @detect="onDetect"
              :paused="pauseCamera"
              @error="onError"
              :torch="torchActive"
              :formats="[
                'code_128',
                'qr_code',
                'code_39',
                'ean_13',
                'ean_8',
                'itf',
              ]"
              v-memo="[torchActive]"
            >
              <div class="loading-indicator" v-if="isLoading">
                <div class="spinner-border align-self-center" role="status">
                  <!-- <span class="visually-hidden">Loading...</span> -->
                </div>
              </div>
            </qrcode-stream>
          </div>
       
        <div class="qrcode-wrapper p-2 mt-2 w-100 d-flex  mb-4 " style="position: relative">
          <qrcode-capture class="custom-qrcode-capture" @detect="onDetectFromUpload" @onError="onErrorFromUpload" :capture="environment" :formats="['code_128', 'qr_code', 'code_39', 'ean_13', 'ean_8', 'itf']">
          </qrcode-capture>
          <div class="btn custom-icon  w-50 d-flex align-items-center justify-content-center p-2  "  >
            <i class="fa fa-picture-o " aria-hidden="true"></i>
            <span>Upload image</span>
          </div> 
      </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.camera-body {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #453a94;
  width: 100%;
  height: 100%;
  position: absolute;
}


.custom-qrcode-capture {
  opacity: 0;
  position: absolute;
  left: 25%;
  width: 50%;
  height: auto;
}

.custom-icon {
  position: absolute;
  top: 0;
  left: 25%;
  background-color: #453a94;
  border-radius: 0.375rem;
  color: white;
  pointer-events: none;
  font-size: 14px;
  white-space: nowrap;
}

.custom-icon i {
  margin-right: 5px;
}


</style>
