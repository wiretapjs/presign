import {injectGlobal} from 'styled-components'

const AppStyles = () => {
  injectGlobal`
    body{
        margin:0px !important;
        font: normal 15px Arial, Helvetica, sans-serif;
        color: #616265;
        height:100vh;
    }

    input::-ms-clear { display: none; }

    h1 {
        font-weight: normal;
        font-size: 20px;
        color: #616265;
        margin: 2px 0 2px 0;
    }

    h2 {
        font-weight: normal;
        font-size: 28px;
        color: #002663;
        margin: 2px 0 2px 0;
    }

    h3 {
        font-weight: normal;
        font-size: 20px;
        color: #002663;
        margin: 2px 0 2px 0;
    }
    
    p {
        line-height: 20px;
        margin: 25px 0 25px 0;
    }

    .faded{
        color: gray;
    }

    @media only screen and (max-width: 736px){
        body {
            padding: 0;
            font-size: 13px;
          }

          h1 {
            font-size: 16px;
            margin: 4px 0 4px 0;
          }

          h2 {
            font-size: 20px;
          }

          h3 {
            font-size: 16px;
          }

          p {
            line-height: 19px;
            margin: 20px 0 20px 0;
          }
    }


    `
}

export default AppStyles
