import styled from "styled-components";

export const NavContainer = styled.nav`
h1{
  color: yellow;
}

a{
  color: white;
  text-decoration: none;
  margin-right: 1rem;
  padding: 4px;
}

  
padding: .4rem;
background-color: var(--preciostock-color);
display:flex;
align-items:center;
justify-content: space-between;
z-index: 9999;


.cursor{
  padding: .4rem;
  cursor:pointer;
  color: white;
  align-items:center;
}
.cursor h2{
  font-size: 1rem;
  color: white;
  font-weight: 400;
  padding: 2px;
  border-radius: 5px;
  span{
    font-weight: bold;
  }
}
.cursor h2:hover{
  color: var(--preciostock-color);
  background-color:var(--border-color);
  padding: 2px;
  border-radius: 5px;
}
.links{
  position: absolute;
  top: -700px;
  left: -2000px;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  transition: all .5s ease;
  display:flex;
  flex-direction: row;
  a{
    color: white;
    font-size: 2rem;
    display: block;
  }
  @media(min-width: 768px){
    position: initial;
    margin: 0;
    a{
      font-size: 1rem;
      color: white;
      display: inline;
    }
  }
}
  
.links.active{
  width: 100%;
  display: block;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 30%;
  left: 0;
  right: 0;
  text-align: center;
  a{
    font-size: 2rem;
    margin-top: 1rem;
    color: white;
  }
}

.burguer{
  @media(min-width: 768px){
    display:none;
  }
}
`

export const BgDiv = styled.div`
  background-color: #222;
  position: absolute;
  top: -2000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all .6s ease ;
  
  &.active{
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
