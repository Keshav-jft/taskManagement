module.exports = {
  priority : ['Low','Medium','High'],
  status : ["Open","In Progress","Closed"],
  designationList:['CEO','CTO'],
  departmentList:['IT','SALES'],
  placeList:['Noida','Delhi'],
  getLayout: function (roles) {
    if (roles.includes('ROLE_SUPER_ADMIN')) {
      return 'layouts/adminLayout'
    } else {
      return 'layouts/userLayout'
    }
  },
  toastrMessageSuccess: function (msg) {

    let str = `<style>
  .alert-success{
    display: none !important;
    }
    </style>
    <script>
  window.addEventListener('load',function(){
    toastr.success('${msg}', 'Successfully Done !');
    }) 
  </script>`;

    return str;
  },
  toastrMessageError: function (msg) {

    let str = `<style>
  .alert-danger{
    display: none !important;
    }
    </style>
    <script>
  window.addEventListener('load',function(){
    toastr.error('${msg}', 'Error');
    }) 
  </script>`;

    return str;
  },
}
