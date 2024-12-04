<script >
import DataTable from 'datatables.net-dt';
// import 'datatables.net-responsive-dt';
export default {

  data() {
    return {
      dataTable: null,
      data: [],
    };
  },
  mounted: async function () {
     if(localStorage.getItem("devices")){
      this.data=JSON.parse(localStorage.getItem("devices"));
     }
    if (document.getElementById("devices")) {
      this.dataTable = new DataTable("#devices", {
        data: this.data,
        responsive: true

      });
    }

  },
  updated: function () {
    this.dataTable.destroy();
    if(localStorage.getItem("devices")){
      this.data=JSON.parse(localStorage.getItem("devices"));
     }
    if (document.getElementById("devices")) {
      this.dataTable = new DataTable("#devices", {
        data: this.data,
        responsive: true
      });

    }
    
  },
}
</script>

<template>
  <div  class="p-0 w-100" style="margin-top: 3rem">
    <div class="row p-0" >
      <div class="col-12 p-3">
        <div class="card w-100 p-3" >
          <div class="card-header d-flex flex-row justify-content-between" style="background: rgb(222 221 229);font-weight:600">
            <p style="font-size: 19px" class="card-title p-1">Devices</p>
            <router-link
            :to="{
              name: 'Add Devices',
            }"
          >
          <button type="button" class="btn btn-primary" style="background: #453a94;font-weight:500;font-size: 13px;outline:none"><i class="fa fa-plus pe-1" aria-hidden="true"></i>ADD</button>
        </router-link>
            </div>
  
            <div class="table-responsive w-100 mw-100 p-3">
              <!-- <hr/> -->
              <table id="devices" class="table mt-1">
               <thead class="thead-light" >
                <tr style="font-size: 12px;font-weight: 800 ">
                  <th  scope="col">IMEI</th>
                  <th scope="col">SIM NO. </th>
                  <th  scope="col">MOBILE NO.</th>
                  <th scope="col">MODEL</th>
                  <th  scope="col">SERIAL</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
  
</template>

<style lang="scss">

#devices td {
  font-size: 14px;
  font-weight: 400;
  text-wrap: wrap;
}
 

#devices th{
  font-size: 15px;
  font-weight: 600 !important;
  background:rgb(222 221 229);
}
.dt-length{
  display: flex;
  gap: 5px;
  padding: 5px;
  label{
     font-weight: 600;
     text-transform: capitalize;
  }
  select {
    border:none;
    background-color: rgb(222, 221, 229);
    color: #333;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 600;
    box-sizing: border-box;
    
  }
  
}
.dt-search{
  display: flex;
  gap: 5px;
  padding: 5px;
  label{
    font-weight: 600;
  }
}
</style>

