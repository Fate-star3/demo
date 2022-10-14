import styled from "styled-components";

export const Wrapper = styled.div`
  .container {
    position:relative;
    width: 500px;
    height: 200px;
    margin-top: 20px;
    margin-left: 100px;
    .title {
      display:flex;
      height: 50px;
      background-color: #fafafa;
      span{
        flex:1;
        height: 50px;
        line-height:50px;
        padding-left: 10px;

      }
    }
    .item {
      display:flex;
      height: 50px;
      border-bottom: 1px solid #ccc;
      opacity: 1;
      &:hover {
        cursor: pointer;
        background-color: #fafafa;
        
      }
      span{
        flex:1;
        height: 50px;
        line-height:50px;
        padding-left: 10px;

      }
    }
  }
  .curr {
    opacity:0.8 ;
    /* position:fixed;
    top:70px;
    left:100px; */
    width: 500px;
    height: 50px;
    transition: all 0.33s cubic-bezier(0.2,0,0,1) 0s;
    /* transform:translate(0,50px) */
  }
`