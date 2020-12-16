const rootList = document.querySelector("#root-list");
const createNextBtns = document.querySelectorAll(".create-down");
const createSubBtns = document.querySelectorAll(".create-sub");
const removeBtns = document.querySelectorAll(".remove");
const templateLi = document.querySelector("#tli").content.querySelector("li");

const createLi = () => {
   const li = document.importNode(templateLi, true);
   li.querySelector(".create-down").onclick = createNextBtnHandler;
   li.querySelector(".create-sub").onclick = createSubBtnHandler;
   li.querySelector(".remove").onclick = removeBtnHandler;
   return li;
};

const updateNumbersInList = (list = rootList, prefix = "") => {
   let i = 1;
   lis = list.children;
   for (const li of lis) {
      let index = "";
      if (prefix) index += prefix + ".";
      index += i;
      li.setAttribute("number", index);
      const innerList = li.querySelector("ol");
      if (innerList) updateNumbersInList(innerList, index);
      i++;
   }
};

const createNextBtnHandler = (event) => {
   const li = createLi();
   event.target.parentElement.after(li);
   updateNumbersInList();
};

const createSubBtnHandler = (event) => {
   const currLi = event.target.parentElement;
   let innerList = currLi.querySelector("ol");
   if (!innerList) {
      innerList = document.createElement("ol");
      currLi.appendChild(innerList);
   }
   const li = createLi();
   innerList.prepend(li);
   updateNumbersInList();
};

const removeBtnHandler = (event) => {
   event.target.parentElement.remove();
   updateNumbersInList();
};

createNextBtns.forEach((btn) => {
   btn.onclick = createNextBtnHandler;
});
createSubBtns.forEach((btn) => {
   btn.onclick = createSubBtnHandler;
});
removeBtns.forEach((btn) => {
   btn.onclick = removeBtnHandler;
});
