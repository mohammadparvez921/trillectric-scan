<script>
import triLogo from "../assets/tri-logo.png";
import { Offcanvas } from 'bootstrap';
export default {
  data() {
    return {
      triLogo,
    };
  },
  mounted: async function () {
    
  },
  methods: {
    closeOffcanvas() {
      console.log("close");
      const offcanvas = document.querySelector('.offcanvas');
      const bsOffcanvas = Offcanvas.getInstance(offcanvas);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    },
  },
};
</script>

<template>
  <div >
    <nav
      class="navbar fixed-top"
      style="background-color: #453a94"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
        <router-link
        :to="{
          name: 'Devices',
        }"
      >
      <img v-bind:src="triLogo" alt="logo"
      />    </router-link>
        
      </a>
        
          <!-- <button
            class="navbar-toggler text-light"
            style="outline: none;"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
            </span>
          </button> -->
          <button class="navbar-toggler" style="outline: none;" type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          >
            <span class="" role="button" ><i class="fa fa-bars" aria-hidden="true" style="color:#e6e6ff"></i></span>
        </button>


        <div
          class="offcanvas offcanvas-end w-75"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header" >
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item mb-0">
                <a class="nav-link active" aria-current="page"  href="/"  @click="closeOffcanvas">
                  <router-link
                  :to="{
                    name: 'Devices',
                  }"
                  style="text-decoration: none;color:inherit"
                >
                <i class="fa fa-home me-1"></i>Sites
              </router-link>
                </a>

              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle disabled"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa fa-user me-1"></i> User
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Logout</a></li>
                  <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
