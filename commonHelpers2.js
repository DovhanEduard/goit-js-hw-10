import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as l}from"./assets/vendor-77e16229.js";const r=document.querySelector(".form"),i=r.querySelector('[value="fulfilled"]'),n=r.querySelector('[value="rejected"]');r.addEventListener("submit",e=>{e.preventDefault();const{delay:{value:t},state:{value:a}}=e.target.elements;c(t,a).then(o=>{l.show({messageColor:"#fff",backgroundColor:"#59a10d",position:"topRight",message:`✅ Fulfilled promise in ${o}ms`})}).catch(o=>{l.show({messageColor:"#fff",backgroundColor:" #ef4040",position:"topRight",message:`❌ Rejected promise in ${o}ms`})}),r.reset()});function c(e,t){return new Promise((a,o)=>{const s={[i.value]:a,[n.value]:o};setTimeout(()=>{s[t]&&s[t](e)},e)})}
//# sourceMappingURL=commonHelpers2.js.map
