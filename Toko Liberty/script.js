document.addEventListener("DOMContentLoaded",()=>{
const buttons=document.querySelectorAll(".filter-btn");
const cards=document.querySelectorAll(".card");
buttons.forEach(btn=>{
btn.addEventListener("click",()=>{
buttons.forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
const cat=btn.getAttribute("data-category");
cards.forEach(c=>{c.style.display=(cat==="all"||c.classList.contains(cat))?"block":"none";});
});
});});