/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  
  theme: {
    extend: {
       colors:{
        "dark-purple":"#081A51",
        "icon-hover":"#c3c3c3",
        "red":"red",
        "edit-purple":'rgb(136 0 255)',
        "grey":'rgb(89,88,88)',
        "icon-bck":'#445587'
       },
       width:{
        "96%":"96%",
        "100%-4.25rem":"calc(100% - 4.25rem)",
        "70%":"70%"
       },
       height:{
        "90%":"90%"
       },
       margin:{
        "35":"8.75rem",
        "50":"12.5rem",
        "65":"16.25rem"
       
       },
       inset:{
           "4.25rem":"4.25rem"
       },
       gridTemplateColumns:{
        "custom":'1fr 1.3fr repeat(3,1fr)',
        "custom-3r":"0.7fr 1.3fr 1fr",
        "custom-4r":"0.7fr 1.3fr repeat(2,1fr)",
        "custom-5r":"0.7fr 1.3fr repeat(3,1fr)"
       },
       screens:{
        "2-row":'545px',
        "3-row":'706px',
        "4-row":'820px',
        "5-row":'1011px'
       }
    },
    fontSize:{
      small:['13px' , '20px']
    }
  },
  plugins: [],
  corePlugins: { preflight: false },

}

